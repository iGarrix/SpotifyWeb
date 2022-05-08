import axios, { AxiosError } from "axios";
import { Dispatch } from "redux";
import {
  IAuthResponse,
  IInitGet,
  ILoginByEmailRequest,
  ILoginByNicknameRequest,
  IRegisterRequest,
  UserAction,
  UserActionTypes,
} from "./types";

import jwt_decode from "jwt-decode";

import http from "../../../axios_creator";
import { IUser } from "../../../types";

// Not checked
export const registerUser = (data: IRegisterRequest) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      dispatch({ type: UserActionTypes.INITUSER_WAITING, payload: true });
      const response = await http.post<IAuthResponse>(
        "api/Profile/register",
        data
      );
      const { token, expiredIn, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("expiredin", new Date(expiredIn).toUTCString());

      dispatch({ type: UserActionTypes.INITUSER, payload: user });
      return Promise.resolve();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("Action problem", error);
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
      const { token, expiredIn, user } = response.data;

      localStorage.setItem("token", token);
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

// Not checked
export const loginByNicknameUser = (data: ILoginByNicknameRequest) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      dispatch({ type: UserActionTypes.INITUSER_WAITING, payload: true });
      const response = await http.post<IAuthResponse>(
        "api/Profile/LoginUserName",
        data
      );
      const { token, expiredIn, user } = response.data;

      localStorage.setItem("token", token);
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

// Not checked
export const getByUserNameUser = (username: string) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      dispatch({ type: UserActionTypes.INITUSER_WAITING, payload: true });
      const response = await http.get<IUser>(
        "api/Profile/GetByUserName?username=" + username
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
  return async (dispatch: Dispatch<UserAction>) => {
    dispatch({ type: UserActionTypes.INITUSER_CLEAR, payload: true });
    localStorage.removeItem("token");
    localStorage.removeItem("expiredin");
  };
};

export const InitUser = async (
  token: string,
  dispatch: Dispatch<UserAction>
) => {
  const data = jwt_decode(token) as IInitGet;
  try {
    dispatch({ type: UserActionTypes.INITUSER_WAITING, payload: true });
    const response = await http.get<IUser>(
      "api/Profile/GetByUserName?username=" + data.name
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
