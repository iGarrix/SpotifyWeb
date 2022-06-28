import axios, { AxiosError } from "axios";
import { Dispatch } from "redux";
import {
  IAuthResponse,
  IChangeAvatarRequest,
  IChangeDataAccountRequest,
  IChangeEmailAccountRequest,
  IChangeEmojieRequest,
  IChangePasswordAccountRequest,
  IChangePhoneAccountRequest,
  IExternalRequest,
  IForgotNewPasswordRequest,
  IInitGet,
  ILoginByEmailRequest,
  ILoginByNicknameRequest,
  IRegisterRequest,
  ISendVerifyCodeByForgotRequest,
  IUpdatePersonalData,
  IVerifiedAccountRequest,
  IVerifyCodeByForgotRequest,
  UserAction,
  UserActionTypes,
} from "./types";

import jwt_decode from "jwt-decode";

import http, { AuthorizateHeader } from "../../../axios_creator";
import {DeviceType, IUser, StorageVariables } from "../../../types";
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
        "api/Profile/getByEmail?email=" + email
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

export const CheckUserByEmail = (email: string) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      dispatch({ type: UserActionTypes.INITUSER_WAITING, payload: true });
      const response = await http.get<IUser>(
        "api/Profile/getByEmail?email=" + email
      );
      dispatch({ type: UserActionTypes.INITUSER_WAITING, payload: false });
      dispatch({ type: UserActionTypes.INITUSER_ERROR, payload: "" });
      localStorage.setItem(StorageVariables.ForgotUser, response.data.email);
      return Promise.resolve();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<any>;
        dispatch({ type: UserActionTypes.INITUSER_WAITING, payload: false });
        dispatch({
          type: UserActionTypes.INITUSER_ERROR,
          payload: serverError.response?.data,
        });
        localStorage.setItem(StorageVariables.ForgotUser, serverError.response?.data);
        if (serverError && serverError.response) {
          return Promise.reject(serverError.response.data);
        }
      }
    }
  };
};

export const VerifyCodeForgot = (data: IVerifyCodeByForgotRequest) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      dispatch({ type: UserActionTypes.INITUSER_WAITING, payload: true });
      const response = await http.post<boolean>(
        "api/Profile/VerifySendForgotCode", data
      );
      dispatch({ type: UserActionTypes.INITUSER_WAITING, payload: false });
      dispatch({ type: UserActionTypes.INITUSER_ERROR, payload: "" });
      if(response.data){
        localStorage.setItem(StorageVariables.VerifyResponse, "true");
      }
      else{
        localStorage.setItem(StorageVariables.VerifyResponse, "false");
      }
      return Promise.resolve();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<any>;
        dispatch({ type: UserActionTypes.INITUSER_WAITING, payload: false });
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

export const SendCodeForgot = (data: ISendVerifyCodeByForgotRequest) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      const response = await http.post<boolean>(
        "api/Profile/ForgotPassword", data
      );
      return Promise.resolve();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<any>;
        if (serverError && serverError.response) {
          return Promise.reject(serverError.response.data);
        }
      }
    }
  };
};

export const updateRecoveryPasswordUser = (data: IForgotNewPasswordRequest) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      dispatch({ type: UserActionTypes.INITUSER_WAITING, payload: true });
      const token = localStorage.getItem("token");
      const response = await http.put<IUser>(
        "api/Profile/RecoveryNewPassword",
        data, AuthorizateHeader(token)
      );
      dispatch({ type: UserActionTypes.INITUSER_WAITING, payload: false });

      return Promise.resolve();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<any>;
        dispatch({ type: UserActionTypes.INITUSER_WAITING, payload: false });
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
      const response = await http.get<IUser>(
        "api/Profile/GetByUserName?username=" + nickname
      );
      dispatch({ type: UserActionTypes.INITOVERWIEVER, payload: response.data });

      return Promise.resolve();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<any>;
        dispatch({ type: UserActionTypes.INITUSER_WAITING, payload: false });
        dispatch({
          type: UserActionTypes.INITUSER_ERROR,
          payload: serverError.response?.data,
        });
        if (serverError && serverError.response) {
          return Promise.reject(serverError.response.data);
        }
      }
    }
  }
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

export const updateEmojieUser = (data: IChangeEmojieRequest) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      dispatch({ type: UserActionTypes.INITUSER_WAITING, payload: true });
      const token = localStorage.getItem("token");
      const response = await http.put<IUser>(
        "api/Profile/UpdateEmojie",
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

export const updateNicknameUser = (data: IChangeDataAccountRequest) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      dispatch({ type: UserActionTypes.INITUSER_WAITING, payload: true });
      const token = localStorage.getItem("token");
      const response = await http.put<IUser>(
        "api/Profile/UpdateUsername",
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

export const updatePhoneUser = (data: IChangePhoneAccountRequest) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      dispatch({ type: UserActionTypes.INITUSER_WAITING, payload: true });
      const token = localStorage.getItem("token");
      const response = await http.put<IUser>(
        "api/Profile/UpdatePhone",
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

export const updateEmailUser = (data: IChangeEmailAccountRequest) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      dispatch({ type: UserActionTypes.INITUSER_WAITING, payload: true });
      const token = localStorage.getItem("token");
      const response = await http.put<IUser>(
        "api/Profile/UpdateEmail",
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

export const updatePasswordUser = (data: IChangePasswordAccountRequest) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      dispatch({ type: UserActionTypes.INITUSER_WAITING, payload: true });
      const token = localStorage.getItem("token");
      const response = await http.put<IUser>(
        "api/Profile/UpdatePassword",
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

export const verifiedUser = (data: IVerifiedAccountRequest) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      dispatch({ type: UserActionTypes.INITUSER_WAITING, payload: true });
      const token = localStorage.getItem("token");
      const response = await http.put<IUser>(
        "api/Profile/VerifyProfile",
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
