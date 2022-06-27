import axios, { AxiosError } from "axios";
import { Dispatch } from "redux";
import {
  IAuthResponse,
  IChangeAvatarRequest,
  IExternalRequest,
  IInitGet,
  ILoginByEmailRequest,
  ILoginByNicknameRequest,
  IRegisterRequest,
  IUpdatePersonalData,
  UserAction,
  UserActionTypes,
} from "./types";

import jwt_decode from "jwt-decode";

import http, { AuthorizateHeader } from "../../../axios_creator";
import {DeviceType, IUser } from "../../../types";
import { ClearRedux } from "../../GlobalReduxFunc";

export const registerUser = (data: IRegisterRequest) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      dispatch({ type: UserActionTypes.INITUSER_WAITING, payload: true });
      const response = await http.post<IAuthResponse>(
        "api/Profile/register",
        data
      );
      const { accessToken, refreshToken, expiredIn, user } = response.data;

      localStorage.setItem("token", accessToken);
      localStorage.setItem("refreshtoken", refreshToken);
      localStorage.setItem("expiredin", new Date(expiredIn).toUTCString());

      dispatch({ type: UserActionTypes.INITUSER, payload: user });
      return Promise.resolve();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<any>;
        dispatch({
          type: UserActionTypes.INITUSER_ERROR,
          payload: serverError.response?.data,
        });
        if (serverError && serverError.response) {
          return Promise.reject(serverError.response.data);
        }
      }
    }
  };
};

export const loginByEmailUser = (data: ILoginByEmailRequest) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      dispatch({ type: UserActionTypes.INITUSER_WAITING, payload: true });
      const response = await http.post<IAuthResponse>(
        "api/Profile/LoginEmail",
        data
      );
      const { accessToken, refreshToken, expiredIn, user } = response.data;

      localStorage.setItem("token", accessToken);
      localStorage.setItem("refreshtoken", refreshToken);
      localStorage.setItem("expiredin", new Date(expiredIn).toUTCString());

      dispatch({ type: UserActionTypes.INITUSER, payload: user });

      return Promise.resolve();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<any>;
        dispatch({
          type: UserActionTypes.INITUSER_ERROR,
          payload: serverError.response?.data,
        });
        if (serverError && serverError.response) {
          return Promise.reject(serverError.response.data);
        }
      }
    }
  };
};

export const loginByNicknameUser = (data: ILoginByNicknameRequest) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      dispatch({ type: UserActionTypes.INITUSER_WAITING, payload: true });
      const response = await http.post<IAuthResponse>(
        "api/Profile/LoginUserName",
        data
      );
      const { accessToken, refreshToken, expiredIn, user } = response.data;

      localStorage.setItem("token", accessToken);
      localStorage.setItem("refreshtoken", refreshToken);
      localStorage.setItem("expiredin", new Date(expiredIn).toUTCString());

      dispatch({ type: UserActionTypes.INITUSER, payload: user });

      return Promise.resolve();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<any>;
        dispatch({
          type: UserActionTypes.INITUSER_ERROR,
          payload: serverError.response?.data,
        });
        if (serverError && serverError.response) {
          return Promise.reject(serverError.response.data);
        }
      }
    }
  };
};


export const externalLoginlUser = (data: IExternalRequest) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      dispatch({ type: UserActionTypes.INITUSER_WAITING, payload: true });
      const response = await http.post<IAuthResponse>(
        "api/Profile/ExternalGoogleLogin",
        data
      );
      const { user, accessToken, refreshToken, expiredIn } = response.data;
      localStorage.setItem("token", accessToken);
      localStorage.setItem("refreshtoken", refreshToken);
      localStorage.setItem("expiredin", new Date(expiredIn).toUTCString());

      dispatch({ type: UserActionTypes.INITUSER, payload: user });

      return Promise.resolve();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<any>;
        dispatch({
          type: UserActionTypes.INITUSER_ERROR,
          payload: serverError.response?.data,
        });
        if (serverError && serverError.response) {
          return Promise.reject(serverError.response.data);
        }
      }
    }
  };
};

export const getByUserEmail = (email: string) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      dispatch({ type: UserActionTypes.INITUSER_WAITING, payload: true });
      const response = await http.get<IUser>(
        "api/Profile/getByUserEmail?email=" + email
      );
      dispatch({ type: UserActionTypes.INITUSER, payload: response.data });

      return Promise.resolve();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<any>;
        dispatch({
          type: UserActionTypes.INITUSER_ERROR,
          payload: serverError.response?.data,
        });
        if (serverError && serverError.response) {
          return Promise.reject(serverError.response.data);
        }
      }
    }
  };
};

export const getOverwiever = (nickname: string) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      dispatch({ type: UserActionTypes.INITUSER_WAITING, payload: true });
      const token = localStorage.getItem("token");
      const response = await http.get<IUser>(
        "api/Profile/GetByUserName?username=" + nickname, AuthorizateHeader(token)
      );
      dispatch({ type: UserActionTypes.INITOVERWIEVER, payload: response.data });

      return Promise.resolve();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<any>;
        dispatch({
          type: UserActionTypes.INITUSER_ERROR,
          payload: serverError.response?.data,
        });
        if (serverError && serverError.response) {
          return Promise.reject(serverError.response.data);
        }
      }
    }
  };
};

export const updatePDUser = (data: IUpdatePersonalData) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      dispatch({ type: UserActionTypes.INITUSER_WAITING, payload: true });
      const token = localStorage.getItem("token");
      const response = await http.put<IUser>(
        "api/Profile/UpdatePersonalData",
        data, AuthorizateHeader(token)
      );

      dispatch({ type: UserActionTypes.INITUSER, payload: response.data });

      return Promise.resolve();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<any>;
        dispatch({
          type: UserActionTypes.INITUSER_ERROR,
          payload: serverError.response?.data,
        });
        if (serverError && serverError.response) {
          return Promise.reject(serverError.response.data);
        }
      }
    }
  };
};

export const updateAvatarUser = (data: IChangeAvatarRequest) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      dispatch({ type: UserActionTypes.INITUSER_WAITING, payload: true });
      const token = localStorage.getItem("token");
      const form = new FormData();
      form.append("FindEmail", data.findEmail);
      form.append("NewAvatar", data.newAvatar);
      form.append("Device", DeviceType.desktop);
      console.log(form);
      const response = await http.put<IUser>(
        "api/Profile/UpdateAvatar",
        form, AuthorizateHeader(token)
      );
      dispatch({ type: UserActionTypes.INITUSER, payload: response.data });

      return Promise.resolve();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<any>;
        dispatch({
          type: UserActionTypes.INITUSER_ERROR,
          payload: serverError.response?.data,
        });
        if (serverError && serverError.response) {
          return Promise.reject(serverError.response.data);
        }
      }
    }
  };
};

export const updateBackgroundUser = (data: IChangeAvatarRequest) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      dispatch({ type: UserActionTypes.INITUSER_WAITING, payload: true });
      const token = localStorage.getItem("token");
      const form = new FormData();
      form.append("FindEmail", data.findEmail);
      form.append("NewAvatar", data.newAvatar);
      form.append("Device", DeviceType.desktop);
      console.log(form);
      const response = await http.put<IUser>(
        "api/Profile/BackgroundUpdate",
        form, AuthorizateHeader(token)
      );
      dispatch({ type: UserActionTypes.INITUSER, payload: response.data });

      return Promise.resolve();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<any>;
        dispatch({
          type: UserActionTypes.INITUSER_ERROR,
          payload: serverError.response?.data,
        });
        if (serverError && serverError.response) {
          return Promise.reject(serverError.response.data);
        }
      }
    }
  };
};

export const LogoutUser = () => {
  return async (dispatch: Dispatch<any>) => {
    ClearRedux(dispatch);
  };
};

export const InitUser = async (
  dispatch: Dispatch<UserAction>
) => {
  const token = localStorage.getItem("token");
  if (token) {    
    const data = jwt_decode(token) as IInitGet;
    try {
      dispatch({ type: UserActionTypes.INITUSER_WAITING, payload: true });
      const response = await http.get<IUser>(
        "api/Profile/GetByEmail?email=" + data.email, AuthorizateHeader(token)
        );
      dispatch({ type: UserActionTypes.INITUSER, payload: response.data });
  
      return Promise.resolve();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<any>;
        dispatch({ type: UserActionTypes.INITUSER_WAITING, payload: false });
        if (serverError && serverError.response) {
          return Promise.reject(serverError.response.data);
        }
      }
    }
  }
};
