import axios, { AxiosError } from "axios";
import { Dispatch } from "redux";
import http, { AuthorizateHeader } from "../../../axios_creator";
import { IAlbum, IPagableMyAlbumItem } from "../MyAlbumReducer/types";
import { IAddInviteRequest, IAddTrackToAlbumRequest, IAlbumCreateRequest, IAlbumData, ISingleCreateRequest, ISingleData, ISongData, UploadActionTypes, UploadingAction } from "./types";

export const initSingleFile = (file: File | null) => {
  return async (dispatch: Dispatch<UploadingAction>) => {
    dispatch({ type: UploadActionTypes.INITSINGLEFILE, payload: file });
  };
};

export const initSingleData = (data: ISingleData) => {
  return (dispatch: Dispatch<UploadingAction>) => {
    dispatch({ type: UploadActionTypes.INITSINGLEDATA, payload: data });
  };
};

export const initAlbumFiles = (file: ISongData[] | null) => {
  return (dispatch: Dispatch<UploadingAction>) => {
    dispatch({ type: UploadActionTypes.INITALBUMFILES, payload: file });
  };
};

export const initAlbumMoreFiles = (file: ISongData[] | null) => {
  return (dispatch: Dispatch<UploadingAction>) => {
    dispatch({ type: UploadActionTypes.INITALBUMMOREFILES, payload: file });
  };
};

export const removeAlbumFile = (file: ISongData | null) => {
  return (dispatch: Dispatch<UploadingAction>) => {
    if (file) {
      dispatch({ type: UploadActionTypes.UPLOADREMOVEALBUMFILE, payload: file });
    }
  };
};

export const initAlbumData = (data: IAlbumData) => {
  return (dispatch: Dispatch<UploadingAction>) => {
    dispatch({ type: UploadActionTypes.INITALBUMDATA, payload: data });
  };
};

export const setUploadLoader = (isload: boolean) => {
  return (dispatch: Dispatch<UploadingAction>) => {
    dispatch({ type: UploadActionTypes.UPLOAD_WAITING, payload: isload });
  };
};

export const setUploadError = (error: string) => {
  return (dispatch: Dispatch<UploadingAction>) => {
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
      console.log(error)
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

export const uploadAlbumApi = (data: IAlbumCreateRequest) => {
  return async (dispatch: Dispatch<UploadingAction>) => {
    try {
      dispatch({ type: UploadActionTypes.UPLOAD_WAITING, payload: true });
      const token = localStorage.getItem("token");
      const form = new FormData();
      data.userCreatorEmails.forEach(f => {
        form.append("UserCreatorEmails", f);
      })
      // form.append("UserCreatorEmails", JSON.stringify(data.userCreatorEmails));
      form.append("Name", data.name);
      form.append("Releasealbom", data.releasealbom? data.releasealbom.toDateString() : "");
      form.append("Image", data.image);
      form.append("Templateimage", data.templateimage);
      form.append("Description", data.description);
      form.append("isSingle", "false  ");
      const response = await http.post<IPagableMyAlbumItem>(
        `api/Albom/Create`, form,
        AuthorizateHeader(token)
      );
      if (response.data.albomDto) {
        dispatch({ type: UploadActionTypes.INITALBUMID, payload: response.data.albomDto.returnId })
      }
      //dispatch({ type: UploadActionTypes.UPLOAD_WAITING, payload: false });
      return Promise.resolve();
    } catch (error) {
      console.log(error)
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

export const addTrackToAlbumApi = (data: IAddTrackToAlbumRequest) => {
  return async (dispatch: Dispatch<UploadingAction>) => {
    try {
      //dispatch({ type: UploadActionTypes.UPLOAD_WAITING, payload: true });
      const token = localStorage.getItem("token");
      const form = new FormData();

      form.append("AlbomId", data.id);
      form.append("TrackRequest.Name", data.name);
      form.append("TrackRequest.Image", data.image);
      form.append("TrackRequest.Sound", data.sound);
      data.userCreatorEmails.forEach(f => {
        form.append("TrackRequest.CreatorsEmail", f);
      })
      await http.post<any>(
        `api/Track/AddTrackToAlbom`, form,
        AuthorizateHeader(token)
      );
      //dispatch({ type: UploadActionTypes.UPLOAD_WAITING, payload: false });
      return Promise.resolve();
    } catch (error) {
      console.log(error)
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


export const sendInviteApi = (data: IAddInviteRequest) => {
  return async (dispatch: Dispatch<UploadingAction>) => {
    try {
      dispatch({ type: UploadActionTypes.UPLOAD_WAITING, payload: true });
      const token = localStorage.getItem("token");
      await http.post<any>(
        `api/Invite/AddInvite`, data,
        AuthorizateHeader(token)
      );
      //dispatch({ type: UploadActionTypes.UPLOAD_WAITING, payload: false });
      return Promise.resolve();
    } catch (error) {
      console.log(error)
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