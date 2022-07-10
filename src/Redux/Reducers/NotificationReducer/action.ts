import axios, { AxiosError } from "axios";
import { Dispatch } from "redux";
import http, { AuthorizateHeader } from "../../../axios_creator";
import { IPagableResponse } from "../../../types";
import { IGetAppelationRequest, IGetNotificationsRequest, IGetStatusUserRequest, INotification, IUserStatusResponse, NotificateAction, NotificationActionTypes } from "./types";

export const getLogins = (data: IGetNotificationsRequest) => {
    return async (dispatch: Dispatch<NotificateAction>) => {
        try {
            dispatch({ type: NotificationActionTypes.INITNOTIFICATION_WAITING, payload: true });
            const token = localStorage.getItem("token");
            const response = await http.get<IPagableResponse<INotification>>(
                `api/Notification/GetLogins?findEmail=${data.findEmail}&page=${data.page}`,
                AuthorizateHeader(token)
            );
            dispatch({ type: NotificationActionTypes.INITNOTIFICATION, payload: response.data });

            return Promise.resolve();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const serverError = error as AxiosError<any>;
                dispatch({
                    type: NotificationActionTypes.INITNOTIFICATION_ERROR,
                    payload: serverError.response?.data,
                });
                if (serverError && serverError.response) {
                    return Promise.reject(serverError.response.data);
                }
            }
        }
    };
};

export const addLogins = (data: IGetNotificationsRequest) => {
    return async (dispatch: Dispatch<NotificateAction>) => {
        try {
            dispatch({ type: NotificationActionTypes.INITNOTIFICATION_WAITING, payload: true });
            const token = localStorage.getItem("token");
            const response = await http.get<IPagableResponse<INotification>>(
                `api/Notification/GetLogins?findEmail=${data.findEmail}&page=${data.page}`,
                AuthorizateHeader(token)
            );
            dispatch({ type: NotificationActionTypes.ADDNOTIFICATION, payload: response.data });

            return Promise.resolve();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const serverError = error as AxiosError<any>;
                dispatch({
                    type: NotificationActionTypes.INITNOTIFICATION_ERROR,
                    payload: serverError.response?.data,
                });
                if (serverError && serverError.response) {
                    return Promise.reject(serverError.response.data);
                }
            }
        }
    };
};

export const getActions = (data: IGetNotificationsRequest) => {
    return async (dispatch: Dispatch<NotificateAction>) => {
        try {
            dispatch({ type: NotificationActionTypes.INITNOTIFICATION_WAITING, payload: true });
            const token = localStorage.getItem("token");
            const response = await http.get<IPagableResponse<INotification>>(
                `api/Notification/GetActions?findEmail=${data.findEmail}&page=${data.page}`,
                AuthorizateHeader(token)
            );
            dispatch({ type: NotificationActionTypes.INITNOTIFICATION, payload: response.data });

            return Promise.resolve();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const serverError = error as AxiosError<any>;
                dispatch({
                    type: NotificationActionTypes.INITNOTIFICATION_ERROR,
                    payload: serverError.response?.data,
                });
                if (serverError && serverError.response) {
                    return Promise.reject(serverError.response.data);
                }
            }
        }
    };
};

export const addActions = (data: IGetNotificationsRequest) => {
    return async (dispatch: Dispatch<NotificateAction>) => {
        try {
            dispatch({ type: NotificationActionTypes.INITNOTIFICATION_WAITING, payload: true });
            const token = localStorage.getItem("token");
            const response = await http.get<IPagableResponse<INotification>>(
                `api/Notification/GetActions?findEmail=${data.findEmail}&page=${data.page}`,
                AuthorizateHeader(token)
            );
            dispatch({ type: NotificationActionTypes.ADDNOTIFICATION, payload: response.data });

            return Promise.resolve();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const serverError = error as AxiosError<any>;
                dispatch({
                    type: NotificationActionTypes.INITNOTIFICATION_ERROR,
                    payload: serverError.response?.data,
                });
                if (serverError && serverError.response) {
                    return Promise.reject(serverError.response.data);
                }
            }
        }
    };
};

export const getAppelations = (data: IGetAppelationRequest) => {
    return async (dispatch: Dispatch<NotificateAction>) => {
        try {
            dispatch({ type: NotificationActionTypes.INITNOTIFICATION_WAITING, payload: true });
            const token = localStorage.getItem("token");
            const response = await http.get<IPagableResponse<INotification>>(
                `api/Appelation/GetAll?email=${data.email}&page=${data.page}`,
                AuthorizateHeader(token)
            );
            dispatch({ type: NotificationActionTypes.INITAPPELATIONS, payload: response.data });

            return Promise.resolve();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const serverError = error as AxiosError<any>;
                dispatch({
                    type: NotificationActionTypes.INITNOTIFICATION_ERROR,
                    payload: serverError.response?.data,
                });
                if (serverError && serverError.response) {
                    return Promise.reject(serverError.response.data);
                }
            }
        }
    };
};

export const addAppelations = (data: IGetAppelationRequest) => {
    return async (dispatch: Dispatch<NotificateAction>) => {
        try {
            dispatch({ type: NotificationActionTypes.INITNOTIFICATION_WAITING, payload: true });
            const token = localStorage.getItem("token");
            const response = await http.get<IPagableResponse<INotification>>(
                `api/Appelation/GetAll?email=${data.email}&page=${data.page}`,
                AuthorizateHeader(token)
            );
            dispatch({ type: NotificationActionTypes.ADDAPPELATIONS, payload: response.data });

            return Promise.resolve();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const serverError = error as AxiosError<any>;
                dispatch({
                    type: NotificationActionTypes.INITNOTIFICATION_ERROR,
                    payload: serverError.response?.data,
                });
                if (serverError && serverError.response) {
                    return Promise.reject(serverError.response.data);
                }
            }
        }
    };
};

export const getStatuses = (data: IGetStatusUserRequest) => {
    return async (dispatch: Dispatch<NotificateAction>) => {
        try {
            dispatch({ type: NotificationActionTypes.INITNOTIFICATION_WAITING, payload: true });
            const token = localStorage.getItem("token");
            const response = await http.get<IPagableResponse<IUserStatusResponse>>(
                `api/UserStatus/FindByUser?email=${data.email}&isadmin=${data.isadmin}&page=${data.page}`,
                AuthorizateHeader(token)
            );
            dispatch({ type: NotificationActionTypes.INITSTATUSES, payload: response.data });

            return Promise.resolve();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const serverError = error as AxiosError<any>;
                dispatch({
                    type: NotificationActionTypes.INITNOTIFICATION_ERROR,
                    payload: serverError.response?.data,
                });
                if (serverError && serverError.response) {
                    return Promise.reject(serverError.response.data);
                }
            }
        }
    };
};

export const addStatuses = (data: IGetStatusUserRequest) => {
    return async (dispatch: Dispatch<NotificateAction>) => {
        try {
            dispatch({ type: NotificationActionTypes.INITNOTIFICATION_WAITING, payload: true });
            const token = localStorage.getItem("token");
            const response = await http.get<IPagableResponse<IUserStatusResponse>>(
                `api/UserStatus/FindByUser?email=${data.email}&isadmin=${data.isadmin}&page=${data.page}`,
                AuthorizateHeader(token)
            );
            dispatch({ type: NotificationActionTypes.ADDSTATUSES, payload: response.data });

            return Promise.resolve();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const serverError = error as AxiosError<any>;
                dispatch({
                    type: NotificationActionTypes.INITNOTIFICATION_ERROR,
                    payload: serverError.response?.data,
                });
                if (serverError && serverError.response) {
                    return Promise.reject(serverError.response.data);
                }
            }
        }
    };
};

export const setSelectStatus = (data: IUserStatusResponse) => {
    return (dispatch: Dispatch<NotificateAction>) => {
        dispatch({ type: NotificationActionTypes.INITSELECTSTATUS, payload: data });
    };
};