import axios, { AxiosError } from "axios";
import { Dispatch } from "redux";
import http, { AuthorizateHeader } from "../../../axios_creator";
import { IPagableResponse, IUser } from "../../../types";
import { ITrackResponse } from "../PlayingReducer/types";
import { MainActionTypes, MainAction } from "./types";

export const getMainArtist = (page: number) => {
  return async (dispatch: Dispatch<MainAction>) => {
    try {
      dispatch({ type: MainActionTypes.MAIN_WAITING, payload: true });
      const token = localStorage.getItem("token");
      const response = await http.get<IPagableResponse<IUser>>(
        `api/Profile/GetAll?page=${page}`,
        AuthorizateHeader(token)
      );
      dispatch({ type: MainActionTypes.INITWEEKLYARTIST, payload: response.data });

      return Promise.resolve();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<any>;
        dispatch({
          type: MainActionTypes.MAIN_ERROR,
          payload: serverError.response?.data,
        });
        if (serverError && serverError.response) {
          return Promise.reject(serverError.response.data);
        }
      }
    }
  };
};


export const addMainArtist = (page: number) => {
  return async (dispatch: Dispatch<MainAction>) => {
    try {
      dispatch({ type: MainActionTypes.MAIN_WAITING, payload: true });
      const token = localStorage.getItem("token");
      const response = await http.get<IPagableResponse<IUser>>(
        `api/Profile/GetAll?page=${page}`,
        AuthorizateHeader(token)
      );
      dispatch({ type: MainActionTypes.ADDWEEKLYARTIST, payload: response.data });

      return Promise.resolve();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<any>;
        dispatch({
          type: MainActionTypes.MAIN_ERROR,
          payload: serverError.response?.data,
        });
        if (serverError && serverError.response) {
          return Promise.reject(serverError.response.data);
        }
      }
    }
  };
};

export const getMainAlbums = (page: number) => {
  return async (dispatch: Dispatch<MainAction>) => {
    try {
      dispatch({ type: MainActionTypes.MAIN_WAITING, payload: true });
      const token = localStorage.getItem("token");
      const response = await http.get<IPagableResponse>(
        `api/Albom/GetAll?page=${page}&isSingle=false`,
        AuthorizateHeader(token)
      );
      dispatch({ type: MainActionTypes.INITWEEKLYALBUM, payload: response.data });

      return Promise.resolve();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<any>;
        dispatch({
          type: MainActionTypes.MAIN_ERROR,
          payload: serverError.response?.data,
        });
        if (serverError && serverError.response) {
          return Promise.reject(serverError.response.data);
        }
      }
    }
  };
};


export const addMainAlbums = (page: number) => {
  return async (dispatch: Dispatch<MainAction>) => {
    try {
      dispatch({ type: MainActionTypes.MAIN_WAITING, payload: true });
      const token = localStorage.getItem("token");
      const response = await http.get<IPagableResponse>(
        `api/Albom/GetAll?page=${page}&isSingle=false`,
        AuthorizateHeader(token)
      );
      dispatch({ type: MainActionTypes.ADDWEEKLYALBUM, payload: response.data });

      return Promise.resolve();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<any>;
        dispatch({
          type: MainActionTypes.MAIN_ERROR,
          payload: serverError.response?.data,
        });
        if (serverError && serverError.response) {
          return Promise.reject(serverError.response.data);
        }
      }
    }
  };
};


export const getMainTracks = (albomId: any, page: number, emailClient: string) => {
  return async (dispatch: Dispatch<MainAction>) => {
    if (albomId) {
      try {
        dispatch({ type: MainActionTypes.MAIN_WAITING, payload: true });
        const token = localStorage.getItem("token");
        const response = await http.get<IPagableResponse<ITrackResponse>>(
          `api/Albom/GetTracks?albomId=${albomId}&emailClient=${emailClient}&page=${page}`,
          AuthorizateHeader(token)
        );
        dispatch({ type: MainActionTypes.INITWEEKLYSONGSALBUM, payload: response.data });

        return Promise.resolve();
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const serverError = error as AxiosError<any>;
          dispatch({
            type: MainActionTypes.MAIN_ERROR,
            payload: serverError.response?.data,
          });
          if (serverError && serverError.response) {
            return Promise.reject(serverError.response.data);
          }
        }
      }
    }
  };
};


export const addMainTracks = (albomId: any, page: number) => {
  return async (dispatch: Dispatch<MainAction>) => {
    if (albomId) {
      try {
        dispatch({ type: MainActionTypes.MAIN_WAITING, payload: true });
        const token = localStorage.getItem("token");
        const response = await http.get<IPagableResponse<ITrackResponse>>(
          `api/Albom/GetTracks?albomId=${albomId}&page=${page}`,
          AuthorizateHeader(token)
        );
        dispatch({ type: MainActionTypes.ADDWEEKLYSONGSALBUM, payload: response.data });

        return Promise.resolve();
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const serverError = error as AxiosError<any>;
          dispatch({
            type: MainActionTypes.MAIN_ERROR,
            payload: serverError.response?.data,
          });
          if (serverError && serverError.response) {
            return Promise.reject(serverError.response.data);
          }
        }
      }
    }
  };
};