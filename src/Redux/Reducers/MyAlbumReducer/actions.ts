
import axios, { AxiosError } from "axios";
import { Dispatch } from "redux";
import http, { AuthorizateHeader } from "../../../axios_creator";
import { IPagableResponse } from "../../../types";
import { IAlbum, IChangeAlbumRequest, IChangeImageAlbumRequest, IChangeTemplateImageAlbumRequest, IGetAllMyAlbumRequest, IPagableMyAlbumItem, ISubscribeAlbumRequest, IUnsubscribeAlbumRequest, MyAlbumAction, MyAlbumActionTypes } from "./types";

export const getMyAlbum = (data: IGetAllMyAlbumRequest) => {
  return async (dispatch: Dispatch<MyAlbumAction>) => {
    try {
      dispatch({ type: MyAlbumActionTypes.INITMYALBUM_WAITING, payload: true });
      const token = localStorage.getItem("token");
      const response = await http.get<IPagableResponse<IAlbum>>(
        `api/Albom/GetAllByCreator?email=${data.email}&page=${data.page}&isSingle=false`,
        AuthorizateHeader(token)
      );
      dispatch({ type: MyAlbumActionTypes.INITMYALBUM, payload: response.data });

      return Promise.resolve();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<any>;
        dispatch({
          type: MyAlbumActionTypes.INITMYALBUM_ERROR,
          payload: serverError.response?.data,
        });
        if (serverError && serverError.response) {
          return Promise.reject(serverError.response.data);
        }
      }
    }
  };
};


export const addMyAlbum = (data: IGetAllMyAlbumRequest) => {
  return async (dispatch: Dispatch<MyAlbumAction>) => {
    try {
      dispatch({ type: MyAlbumActionTypes.INITMYALBUM_WAITING, payload: true });
      const token = localStorage.getItem("token");
      const response = await http.get<IPagableResponse<IAlbum>>(
        `api/Albom/GetAllByCreator?email=${data.email}&page=${data.page}&isSingle=false`,
        AuthorizateHeader(token)
      );
      dispatch({ type: MyAlbumActionTypes.ADDMYALBUM, payload: response.data });

      return Promise.resolve();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<any>;
        dispatch({
          type: MyAlbumActionTypes.INITMYALBUM_ERROR,
          payload: serverError.response?.data,
        });
        if (serverError && serverError.response) {
          return Promise.reject(serverError.response.data);
        }
      }
    }
  };
};

export const updateAlbum = (data: IChangeAlbumRequest) => {
  return async (dispatch: Dispatch<MyAlbumAction>) => {
    try {
      dispatch({ type: MyAlbumActionTypes.INITMYALBUM_WAITING, payload: true });
      const token = localStorage.getItem("token");
      const response = await http.put<IPagableMyAlbumItem>(
        "api/Albom/Update",
        data, AuthorizateHeader(token)
      );

      return Promise.resolve();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<any>;
        dispatch({
          type: MyAlbumActionTypes.INITMYALBUM_ERROR,
          payload: serverError.response?.data,
        });
        if (serverError && serverError.response) {
          return Promise.reject(serverError.response.data);
        }
      }
    }
  };
};

export const removeAlbum = (id: string) => {
  return async (dispatch: Dispatch<MyAlbumAction>) => {
    try {
      dispatch({ type: MyAlbumActionTypes.INITMYALBUM_WAITING, payload: true });
      const token = localStorage.getItem("token");
      await http.delete<String>(
        "api/Albom/Remove?returnId=" + id, {
        headers: AuthorizateHeader(token).headers
      }
      );
      return Promise.resolve();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<any>;
        dispatch({
          type: MyAlbumActionTypes.INITMYALBUM_ERROR,
          payload: serverError.response?.data,
        });
        if (serverError && serverError.response) {
          return Promise.reject(serverError.response.data);
        }
      }
    }
  };
};

export const updateImageAlbum = (data: IChangeImageAlbumRequest) => {
  return async (dispatch: Dispatch<MyAlbumAction>) => {
    try {
      dispatch({ type: MyAlbumActionTypes.INITMYALBUM_WAITING, payload: true });
      const token = localStorage.getItem("token");
      const form = new FormData();
      form.append("FindReturnId", data.findReturnId);
      form.append("NewImage", data.newImage);
      const response = await http.put<IPagableMyAlbumItem>(
        "api/Albom/UpdateImage",
        form, AuthorizateHeader(token)
      );

      return Promise.resolve();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<any>;
        dispatch({
          type: MyAlbumActionTypes.INITMYALBUM_ERROR,
          payload: serverError.response?.data,
        });
        if (serverError && serverError.response) {
          return Promise.reject(serverError.response.data);
        }
      }
    }
  };
};

export const updateTemplateImageAlbum = (data: IChangeTemplateImageAlbumRequest) => {
  return async (dispatch: Dispatch<MyAlbumAction>) => {
    try {
      dispatch({ type: MyAlbumActionTypes.INITMYALBUM_WAITING, payload: true });
      const token = localStorage.getItem("token");
      const form = new FormData();
      form.append("FindReturnId", data.findReturnId);
      form.append("NewTemplateimage", data.newTemplateimage);
      const response = await http.put<IPagableMyAlbumItem>(
        "api/Albom/UpdateTemplateImage",
        form, AuthorizateHeader(token)
      );

      return Promise.resolve();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<any>;
        dispatch({
          type: MyAlbumActionTypes.INITMYALBUM_ERROR,
          payload: serverError.response?.data,
        });
        if (serverError && serverError.response) {
          return Promise.reject(serverError.response.data);
        }
      }
    }
  };
};

export const subscribeAlbum = (data: ISubscribeAlbumRequest) => {
  return async (dispatch: Dispatch<MyAlbumAction>) => {
    try {
     // dispatch({ type: MyAlbumActionTypes.INITMYALBUM_WAITING, payload: true });
      const token = localStorage.getItem("token");
      await http.post<any>(
        "api/Albom/SaveAlbom",
        data, AuthorizateHeader(token)
      );

      //dispatch({ type: MyAlbumActionTypes.INITMYALBUM_WAITING, payload: false });

      return Promise.resolve();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<any>;
        dispatch({
          type: MyAlbumActionTypes.INITMYALBUM_ERROR,
          payload: serverError.response?.data,
        });
        if (serverError && serverError.response) {
          return Promise.reject(serverError.response.data);
        }
      }
    }
  };
};

export const unsubscribeAlbum = (data: IUnsubscribeAlbumRequest) => {
  return async (dispatch: Dispatch<MyAlbumAction>) => {
    try {
      //dispatch({ type: MyAlbumActionTypes.INITMYALBUM_WAITING, payload: true });
      const token = localStorage.getItem("token");
      await http.delete<any>(
        "api/Albom/RemoveSaveAlbom",
        {
          headers: AuthorizateHeader(token).headers,
          data: data
        }
      );
      //dispatch({ type: MyAlbumActionTypes.INITMYALBUM_WAITING, payload: false });

      return Promise.resolve();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<any>;
        dispatch({
          type: MyAlbumActionTypes.INITMYALBUM_ERROR,
          payload: serverError.response?.data,
        });
        if (serverError && serverError.response) {
          return Promise.reject(serverError.response.data);
        }
      }
    }
  };
};