import { ICreatePlaylistRequest, IGetAllMyPlaylistRequest, IPagableMyPlaylistItem, ISubscribePlaylistRequest, IUnsubscribePlaylistRequest, MyPlaylistAction, MyPlaylistActionTypes } from "./types";
import axios, { AxiosError } from "axios";
import { Dispatch } from "redux";
import http, { AuthorizateHeader } from "../../../axios_creator";
import { IPagableResponse } from "../../../types";

export const getMyPlaylists = (data: IGetAllMyPlaylistRequest) => {
  return async (dispatch: Dispatch<MyPlaylistAction>) => {
    try {
      dispatch({ type: MyPlaylistActionTypes.INITMYPLAYLIST_WAITING, payload: true });
      const token = localStorage.getItem("token");
      const response = await http.get<IPagableResponse<IPagableMyPlaylistItem>>(
        `api/Playlist/GetAllByCreator?email=${data.email}&page=${data.page}`,
        AuthorizateHeader(token)
      );
      dispatch({ type: MyPlaylistActionTypes.INITMYPLAYLIST, payload: response.data });

      return Promise.resolve();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<any>;
        dispatch({
          type: MyPlaylistActionTypes.INITMYPLAYLIST_ERROR,
          payload: serverError.response?.data,
        });
        if (serverError && serverError.response) {
          return Promise.reject(serverError.response.data);
        }
      }
    }
  };
};


export const addMyPlaylists = (data: IGetAllMyPlaylistRequest) => {
  return async (dispatch: Dispatch<MyPlaylistAction>) => {
    try {
      dispatch({ type: MyPlaylistActionTypes.INITMYPLAYLIST_WAITING, payload: true });
      const token = localStorage.getItem("token");
      const response = await http.get<IPagableResponse<IPagableMyPlaylistItem>>(
        `api/Playlist/GetAllByCreator?email=${data.email}&page=${data.page}`,
        AuthorizateHeader(token)
      );
      dispatch({ type: MyPlaylistActionTypes.ADDMYPLAYLIST, payload: response.data });

      return Promise.resolve();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<any>;
        dispatch({
          type: MyPlaylistActionTypes.INITMYPLAYLIST_ERROR,
          payload: serverError.response?.data,
        });
        if (serverError && serverError.response) {
          return Promise.reject(serverError.response.data);
        }
      }
    }
  };
};

export const createPlaylist = (data: ICreatePlaylistRequest) => {
  return async (dispatch: Dispatch<MyPlaylistAction>) => {
    try {
      dispatch({ type: MyPlaylistActionTypes.INITMYPLAYLIST_WAITING, payload: true });
      const token = localStorage.getItem("token");
      const form = new FormData();
      form.append("UserEmail", data.userEmail);
      form.append("Name", data.name);
      form.append("Image", data.image);
      form.append("AccessStatus", data.accessStatus);
      await http.post<IPagableMyPlaylistItem>(
        "api/Playlist/CreatePlaylist",
        form, AuthorizateHeader(token)
      );

      return Promise.resolve();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<any>;
        dispatch({
          type: MyPlaylistActionTypes.INITMYPLAYLIST_ERROR,
          payload: serverError.response?.data,
        });
        if (serverError && serverError.response) {
          return Promise.reject(serverError.response.data);
        }
      }
    }
  };
};


export const searchMyPlaylists = (query: string) => {
  return async (dispatch: Dispatch<MyPlaylistAction>) => {
    try {
      dispatch({ type: MyPlaylistActionTypes.INITMYPLAYLIST_WAITING, payload: true });
      const token = localStorage.getItem("token");
      const response = await http.get<Array<IPagableMyPlaylistItem>>(
        `api/Playlist/SearchPlaylist?query=${query}`,
        AuthorizateHeader(token)
      );
      dispatch({ type: MyPlaylistActionTypes.INITMYSEARCHPLAYLIST, payload: response.data });

      return Promise.resolve();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<any>;
        dispatch({
          type: MyPlaylistActionTypes.INITMYPLAYLIST_ERROR,
          payload: serverError.response?.data,
        });
        if (serverError && serverError.response) {
          return Promise.reject(serverError.response.data);
        }
      }
    }
  };
};

export const subscribePlaylist = (data: ISubscribePlaylistRequest) => {
  return async (dispatch: Dispatch<MyPlaylistAction>) => {
    try {
      const token = localStorage.getItem("token");
      await http.post<any>(
        "api/Playlist/AddSubscriber",
        data, AuthorizateHeader(token)
      );
      return Promise.resolve();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<any>;
        dispatch({
          type: MyPlaylistActionTypes.INITMYPLAYLIST_ERROR,
          payload: serverError.response?.data,
        });
        if (serverError && serverError.response) {
          return Promise.reject(serverError.response.data);
        }
      }
    }
  };
};

export const unsubscribePlaylist = (data: IUnsubscribePlaylistRequest) => {
  return async (dispatch: Dispatch<MyPlaylistAction>) => {
    try {
      const token = localStorage.getItem("token");
      await http.delete<any>(
        "api/Playlist/RemoveUser",
        {
          headers: AuthorizateHeader(token).headers,
          data: data
        }
      );
      return Promise.resolve();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<any>;
        dispatch({
          type: MyPlaylistActionTypes.INITMYPLAYLIST_ERROR,
          payload: serverError.response?.data,
        });
        if (serverError && serverError.response) {
          return Promise.reject(serverError.response.data);
        }
      }
    }
  };
};