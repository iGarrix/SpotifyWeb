import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import axiosInstance from "./axios_creator";
import { useActions } from "./Hooks/useActions";
import { LogoutUser } from "./Redux/Reducers/UserReducer/actions";
import { IAuthResponse, UserActionTypes } from "./Redux/Reducers/UserReducer/types";
import { store } from "./Redux/store";
import { IRefreshModel } from "./types";

const setup = () => {
    const { dispatch } = store;
    axiosInstance.interceptors.response.use(
        (res) => {
            return res;
        },
        async (err) => {
            const originalConfig = err.config;
            if (err.response && err.config) {
                if (err.response.status === 401 && !originalConfig._retry) {
                    originalConfig._retry = true;

                    try {
                        const lsToken = localStorage.getItem("token");
                        const lsRefreshToken = localStorage.getItem("refreshtoken");
                        if (lsToken && lsRefreshToken) {
                            const data: IRefreshModel = {
                                accessToken: lsToken,
                                refreshToken: lsRefreshToken
                            }
                            const rs = await axiosInstance.post<IAuthResponse>("api/Profile/RefreshToken", data);
                            const { user, refreshToken, accessToken, expiredIn } = rs.data;
                            localStorage.setItem("token", accessToken);
                            localStorage.setItem("refreshtoken", refreshToken);
                            localStorage.setItem("expiredin", new Date(expiredIn).toUTCString());
                            console.log(rs);
                            dispatch({ type: UserActionTypes.INITUSER, payload: user });
                            originalConfig.headers['Authorization'] = `Bearer ${accessToken}`;
                            return axiosInstance(originalConfig);
                        }
                    } catch (_error) {
                        console.log("Errors");
                        if (axios.isAxiosError(_error)) {
                            const serverError = _error as AxiosError<any>;
                            if (serverError) {     
                                localStorage.removeItem("token");
                                localStorage.removeItem("refreshtoken");
                                localStorage.removeItem("expiredin");
                                dispatch({ type: UserActionTypes.INITUSER_CLEAR });
                            }
                            dispatch({ type: UserActionTypes.INITUSER_WAITING, payload: false });
                            if (serverError && serverError.response) {
                                return Promise.reject(serverError.response.statusText);
                            }
                        }
                        return Promise.reject(_error);
                    }
                }
            }
            return Promise.reject(err);
        }
    );
};
export default setup;