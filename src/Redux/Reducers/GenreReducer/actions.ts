import { IGenre, IGetAllGenreRequest, IPagableMyGenreItem, MyGenreAction, MyGenreActionTypes } from "./types";
import axios, { AxiosError } from "axios";
import { Dispatch } from "redux";
import http, { AuthorizateHeader } from "../../../axios_creator";
import { IPagableResponse } from "../../../types";
import { IPagableMyPlaylistItem } from "../MyPlaylistReducer/types";

export const getAllGenre = (data: IGetAllGenreRequest) => {
  return async (dispatch: Dispatch<MyGenreAction>) => {
    try {
      dispatch({ type: MyGenreActionTypes.INITGENRE_WAITING, payload: true });
      const token = localStorage.getItem("token");
      const response = await http.get<IPagableResponse<IPagableMyGenreItem>>(
        `api/Genre/GetAll?&page=${data.page}`,
        AuthorizateHeader(token)
      );
      dispatch({ type: MyGenreActionTypes.INITGENRE, payload: response.data });

      return Promise.resolve();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<any>;
        dispatch({
          type: MyGenreActionTypes.INITGENRE_ERROR,
          payload: serverError.response?.data,
        });
        if (serverError && serverError.response) {
          return Promise.reject(serverError.response.data);
        }
      }
    }
  };
};

export const addGenre = (data: IGetAllGenreRequest) => {
  return async (dispatch: Dispatch<MyGenreAction>) => {
    try {
      dispatch({ type: MyGenreActionTypes.INITGENRE_WAITING, payload: true });
      const token = localStorage.getItem("token");
      const response = await http.get<IPagableResponse<IGenre>>(
        `api/Genre/GetAll?&page=${data.page}`,
        AuthorizateHeader(token)
      );
      dispatch({ type: MyGenreActionTypes.ADDGENRE, payload: response.data });

      return Promise.resolve();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<any>;
        dispatch({
          type: MyGenreActionTypes.INITGENRE_ERROR,
          payload: serverError.response?.data,
        });
        if (serverError && serverError.response) {
          return Promise.reject(serverError.response.data);
        }
      }
    }
  };
};

export const getAllGenrePlaylist = (genreName: string, page: number) => {
  return async (dispatch: Dispatch<MyGenreAction>) => {
    try {
      dispatch({ type: MyGenreActionTypes.INITGENRE_WAITING, payload: true });
      const token = localStorage.getItem("token");
      const response = await http.get<IPagableResponse<IPagableMyPlaylistItem>>(
        `api/Playlist/GetAllByGenre?&genreName=${genreName}&page=${page}`,
        AuthorizateHeader(token)
      );
      dispatch({ type: MyGenreActionTypes.INITGENREPLAYLIST, payload: response.data });

      return Promise.resolve();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<any>;
        dispatch({
          type: MyGenreActionTypes.INITGENRE_ERROR,
          payload: serverError.response?.data,
        });
        if (serverError && serverError.response) {
          return Promise.reject(serverError.response.data);
        }
      }
    }
  };
};

export const addGenrePlaylist = (genreName: string, page: number) => {
  return async (dispatch: Dispatch<MyGenreAction>) => {
    try {
      dispatch({ type: MyGenreActionTypes.INITGENRE_WAITING, payload: true });
      const token = localStorage.getItem("token");
      const response = await http.get<IPagableResponse<IPagableMyPlaylistItem>>(
        `api/Playlist/GetAllByGenre?&genreName=${genreName}&page=${page}`,
        AuthorizateHeader(token)
      );
      dispatch({ type: MyGenreActionTypes.ADDGENREPLAYLIST, payload: response.data });

      return Promise.resolve();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<any>;
        dispatch({
          type: MyGenreActionTypes.INITGENRE_ERROR,
          payload: serverError.response?.data,
        });
        if (serverError && serverError.response) {
          return Promise.reject(serverError.response.data);
        }
      }
    }
  };
};

export const clearGenrePlaylist = () => {
  return (dispatch: Dispatch<MyGenreAction>) => {
    dispatch({ type: MyGenreActionTypes.INITGENREPLAYLIST_CLEAR });
  };
};