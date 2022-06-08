import axios, { AxiosError } from "axios";
import { Dispatch } from "react";
import { UserAction, UserActionTypes, IAuthResponse } from "./Redux/Reducers/UserReducer/types";
import { IRefreshModel } from "./types";
import http from "./axios_creator";

const PrivateLogoutUser = (dispatch: Dispatch<UserAction>) => {
    dispatch({ type: UserActionTypes.INITUSER_CLEAR, payload: true });
    localStorage.removeItem("token");
    localStorage.removeItem("refreshtoken");
    localStorage.removeItem("expiredin");
}

const RefreshTokenAPI = async (data: IRefreshModel, dispatch: Dispatch<UserAction>) => {
    try {
        const response = await http.post<IAuthResponse>(
            "api/Profile/RefreshToken", data
        );
        const { user, refreshToken, accessToken, expiredIn } = response.data;
        localStorage.setItem("token", accessToken);
        localStorage.setItem("refreshtoken", refreshToken);
        localStorage.setItem("expiredin", new Date(expiredIn).toUTCString());

        dispatch({ type: UserActionTypes.INITUSER, payload: user });

        return Promise.resolve();
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const serverError = error as AxiosError<any>;
            if (serverError.response?.status != null && serverError.response?.status >= 400) {
                PrivateLogoutUser(dispatch);
            }
            // else {
            //     dispatch({
            //         type: UserActionTypes.INITUSER_ERROR,
            //         payload: serverError.response?.data,
            //     });
            // }
            if (serverError && serverError.response) {
                return Promise.reject(serverError.response.data);
            }
        }
    }
}

const CompareTimeToken = (): boolean => {
    const token = localStorage.getItem("expiredin");
    return Date.now() >= Date.parse(token ? token : "");
}

export const RefreshToken = async (dispatch: Dispatch<UserAction>) => {
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshtoken");
    if (token != null && refreshToken != null) {
        const refreshModel: IRefreshModel = {
            accessToken: token,
            refreshToken: refreshToken,
        }
        if (CompareTimeToken()) {     
            await RefreshTokenAPI(refreshModel, dispatch);
        }
    }
}
