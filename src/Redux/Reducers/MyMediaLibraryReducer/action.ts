import axios, { AxiosError } from "axios";
import { Dispatch } from "redux";
import http, { AuthorizateHeader } from "../../../axios_creator";
import { IPagableResponse, IUser } from "../../../types";
import { IGetAllMyAlbumRequest } from "../MyAlbumReducer/types";
import { IGetAllMyPlaylistRequest } from "../MyPlaylistReducer/types";
import { IGetAllMySingleRequest } from "../MySingleReducer/types";
import { ITrackResponse } from "../SelectAlbumReducer/types";
import { MyMediaLibraryAction, MyMediaLibraryActionTypes } from "./types";

export const getMyMediaLibrarySingle = (data: IGetAllMySingleRequest) => {
    return async (dispatch: Dispatch<MyMediaLibraryAction>) => {
      try {
        dispatch({ type: MyMediaLibraryActionTypes.INITMYMEDIALIBRARY_WAITING, payload: true });
        const token = localStorage.getItem("token");
        const response = await http.get<IPagableResponse<ITrackResponse>>(
          `api/Track/GetSaveAll?subscriberEmail=${data.email}&page=${data.page}`,
          AuthorizateHeader(token)
        );
        dispatch({ type: MyMediaLibraryActionTypes.INITMYMEDIALIBRARYSINGLE, payload: response.data });
        return Promise.resolve();
      } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error)) {
          const serverError = error as AxiosError<any>;
          dispatch({
            type: MyMediaLibraryActionTypes.INITMYMEDIALIBRARY_ERROR,
            payload: serverError.response?.data,
          });
          if (serverError && serverError.response) {
            return Promise.reject(serverError.response.data);
          }
        }
      }
    };
  };
  
  
  export const addMyMediaLibrarySingle = (data: IGetAllMySingleRequest) => {
    return async (dispatch: Dispatch<MyMediaLibraryAction>) => {
      try {
        dispatch({ type: MyMediaLibraryActionTypes.INITMYMEDIALIBRARY_WAITING, payload: true });
        const token = localStorage.getItem("token");
        const response = await http.get<IPagableResponse<ITrackResponse>>(
          `api/Track/GetSaveAll?subscriberEmail=${data.email}&page=${data.page}`,
          AuthorizateHeader(token)
        );
        dispatch({ type: MyMediaLibraryActionTypes.ADDMYMEDIALIBRARYSINGLE, payload: response.data });
  
        return Promise.resolve();
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const serverError = error as AxiosError<any>;
          dispatch({
            type: MyMediaLibraryActionTypes.INITMYMEDIALIBRARY_ERROR,
            payload: serverError.response?.data,
          });
          if (serverError && serverError.response) {
            return Promise.reject(serverError.response.data);
          }
        }
      }
    };
  };

  export const getMyMediaLibraryAlbums = (data: IGetAllMyAlbumRequest) => {
    return async (dispatch: Dispatch<MyMediaLibraryAction>) => {
      try {
        dispatch({ type: MyMediaLibraryActionTypes.INITMYMEDIALIBRARY_WAITING, payload: true });
        const token = localStorage.getItem("token");
        const response = await http.get<IPagableResponse>(
          `api/Albom/GetAllSaves?email=${data.email}&page=${data.page}&isSingle=false`,
          AuthorizateHeader(token)
        );
        dispatch({ type: MyMediaLibraryActionTypes.INITMYMEDIALIBRARYALBUMS, payload: response.data });
  
        return Promise.resolve();
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const serverError = error as AxiosError<any>;
          dispatch({
            type: MyMediaLibraryActionTypes.INITMYMEDIALIBRARY_ERROR,
            payload: serverError.response?.data,
          });
          if (serverError && serverError.response) {
            return Promise.reject(serverError.response.data);
          }
        }
      }
    };
  };
  
  
  export const addMyMediaLibraryAlbums = (data: IGetAllMyAlbumRequest) => {
    return async (dispatch: Dispatch<MyMediaLibraryAction>) => {
      try {
        dispatch({ type: MyMediaLibraryActionTypes.INITMYMEDIALIBRARY_WAITING, payload: true });
        const token = localStorage.getItem("token");
        const response = await http.get<IPagableResponse>(
          `api/Albom/GetAllSaves?email=${data.email}&page=${data.page}&isSingle=false`,
          AuthorizateHeader(token)
        );
        dispatch({ type: MyMediaLibraryActionTypes.ADDMYMEDIALIBRARYALBUMS, payload: response.data });
  
        return Promise.resolve();
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const serverError = error as AxiosError<any>; 
          dispatch({
            type: MyMediaLibraryActionTypes.INITMYMEDIALIBRARY_ERROR,
            payload: serverError.response?.data,
          });
          if (serverError && serverError.response) {
            return Promise.reject(serverError.response.data);
          }
        }
      }
    };
  };


  export const getMyMediaLibraryPlaylists = (data: IGetAllMyPlaylistRequest) => {
    return async (dispatch: Dispatch<MyMediaLibraryAction>) => {
      try {
        dispatch({ type: MyMediaLibraryActionTypes.INITMYMEDIALIBRARY_WAITING, payload: true });
        const token = localStorage.getItem("token");
        const response = await http.get<IPagableResponse>(
          `api/PLaylist/FindBySubscriber?email=${data.email}&page=${data.page}`,
          AuthorizateHeader(token)
        );
        dispatch({ type: MyMediaLibraryActionTypes.INITMYMEDIALIBRARYPLAYLISTS, payload: response.data });
  
        return Promise.resolve();
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const serverError = error as AxiosError<any>;
          dispatch({
            type: MyMediaLibraryActionTypes.INITMYMEDIALIBRARY_ERROR,
            payload: serverError.response?.data,
          });
          if (serverError && serverError.response) {
            return Promise.reject(serverError.response.data);
          }
        }
      }
    };
  };
  
  
  export const addMyMediaLibraryPlaylists = (data: IGetAllMyPlaylistRequest) => {
    return async (dispatch: Dispatch<MyMediaLibraryAction>) => {
      try {
        dispatch({ type: MyMediaLibraryActionTypes.INITMYMEDIALIBRARY_WAITING, payload: true });
        const token = localStorage.getItem("token");
        const response = await http.get<IPagableResponse>(
          `api/PLaylist/FindBySubscriber?email=${data.email}&page=${data.page}`,
          AuthorizateHeader(token)
        );
        dispatch({ type: MyMediaLibraryActionTypes.ADDMYMEDIALIBRARYPLAYLISTS, payload: response.data });
  
        return Promise.resolve();
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const serverError = error as AxiosError<any>; 
          dispatch({
            type: MyMediaLibraryActionTypes.INITMYMEDIALIBRARY_ERROR,
            payload: serverError.response?.data,
          });
          if (serverError && serverError.response) {
            return Promise.reject(serverError.response.data);
          }
        }
      }
    };
  };

  export const getMyMediaLibraryArtists = (page: number, email: string) => {
    return async (dispatch: Dispatch<MyMediaLibraryAction>) => {
      try {
        dispatch({ type: MyMediaLibraryActionTypes.INITMYMEDIALIBRARY_WAITING, payload: true });
        const token = localStorage.getItem("token");
        const response = await http.get<IPagableResponse<IUser>>(
          `api/Subscribe/FindIam?page=${page}&email=${email}`,
          AuthorizateHeader(token)
        );
        dispatch({ type: MyMediaLibraryActionTypes.INITMYMEDIALIBRARYARTISTS, payload: response.data });
  
        return Promise.resolve();
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const serverError = error as AxiosError<any>;
          dispatch({
            type: MyMediaLibraryActionTypes.INITMYMEDIALIBRARY_ERROR,
            payload: serverError.response?.data,
          });
          if (serverError && serverError.response) {
            return Promise.reject(serverError.response.data);
          }
        }
      }
    };
  };
  
  
  export const addMyMediaLibraryArtists = (page: number, email: string) => {
    return async (dispatch: Dispatch<MyMediaLibraryAction>) => {
      try {
        dispatch({ type: MyMediaLibraryActionTypes.INITMYMEDIALIBRARY_WAITING, payload: true });
        const token = localStorage.getItem("token");
        const response = await http.get<IPagableResponse<IUser>>(
          `api/Subscribe/FindIam?page=${page}&email=${email}`,
          AuthorizateHeader(token)
        );
        dispatch({ type: MyMediaLibraryActionTypes.ADDMYMEDIALIBRARYARTISTS, payload: response.data });
  
        return Promise.resolve();
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const serverError = error as AxiosError<any>;
          dispatch({
            type: MyMediaLibraryActionTypes.INITMYMEDIALIBRARY_ERROR,
            payload: serverError.response?.data,
          });
          if (serverError && serverError.response) {
            return Promise.reject(serverError.response.data);
          }
        }
      }
    };
  };