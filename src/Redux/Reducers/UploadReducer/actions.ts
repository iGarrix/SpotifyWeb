import axios, { AxiosError } from "axios";
import { Dispatch } from "redux";
import http, { AuthorizateHeader } from "../../../axios_creator";
import { ISingleCreateRequest, ISingleData, UploadActionTypes, UploadingAction } from "./types";

export const initSingleFile = (file: File | null) => {
    return async (dispatch: Dispatch<UploadingAction>) => {
        dispatch({ type: UploadActionTypes.INITSINGLEFILE, payload: file });
    };
};

export const initSingleData = (data: ISingleData) => {
    return async (dispatch: Dispatch<UploadingAction>) => {
        dispatch({ type: UploadActionTypes.INITSINGLEDATA, payload: data });
    };
};

export const setUploadLoader = (isload: boolean) => {
    return async (dispatch: Dispatch<UploadingAction>) => {
        dispatch({ type: UploadActionTypes.UPLOAD_WAITING, payload: isload });
    };
};

export const setUploadError = (error: string) => {
    return async (dispatch: Dispatch<UploadingAction>) => {
        dispatch({ type: UploadActionTypes.UPLOAD_ERROR, payload: error });
    };
};


export const uploadSingleApi = (data: ISingleCreateRequest) => {
    return async (dispatch: Dispatch<UploadingAction>) => {
      try {
        dispatch({ type: UploadActionTypes.UPLOAD_WAITING, payload: true });
        const token = localStorage.getItem("token");
        const form = new FormData();
        form.append("Name", data.name);
        form.append("Image", data.image);
        form.append("Sound", data.sound);
        form.append("CreatorEmail", data.creatorEmail);
        const response = await http.post<any>(
          `api/Track/CreateSingle`, form,
          AuthorizateHeader(token)
        );
        dispatch({ type: UploadActionTypes.UPLOAD_WAITING, payload: false });
        return Promise.resolve();
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const serverError = error as AxiosError<any>;
          dispatch({
            type: UploadActionTypes.UPLOAD_ERROR,
            payload: serverError.response?.data,
          });
          if (serverError && serverError.response) {
            return Promise.reject(serverError.response.data);
          }
        }
      }
    };
  };