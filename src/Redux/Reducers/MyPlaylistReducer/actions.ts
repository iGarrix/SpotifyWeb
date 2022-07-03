import { IGetAllMyPlaylistRequest, IPagableMyPlaylistItem, MyPlaylistAction, MyPlaylistActionTypes } from "./types";
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