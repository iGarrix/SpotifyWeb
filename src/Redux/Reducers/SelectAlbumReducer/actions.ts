import { Dispatch } from "redux";
import axios, { AxiosError } from "axios";
import http, { AuthorizateHeader } from "../../../axios_creator";
import { IPagableMyAlbumItem } from "../MyAlbumReducer/types";
import {IGetTracksRequest, IGetTracksResponse, ITrackResponse, SelectAlbumAction, SelectAlbumActionTypes } from "./types";
import { IPagableResponse } from "../../../types";



export const initSelectAlbum = (data: IPagableMyAlbumItem) => {
    return async (dispatch: Dispatch<SelectAlbumAction>) => {
        dispatch({ type: SelectAlbumActionTypes.INITSELECTALBUM, payload: data });
        dispatch({ type: SelectAlbumActionTypes.INITSELECTALBUMS_WAITING, payload: false });
    };
};

export const initSelectTrack = (data: ITrackResponse) => {
    return async (dispatch: Dispatch<SelectAlbumAction>) => {
        dispatch({ type: SelectAlbumActionTypes.INITSELECTTRACKS, payload: data });
        dispatch({ type: SelectAlbumActionTypes.INITSELECTALBUMS_WAITING, payload: false });
    };
};

export const clearSelectTrack = () => {
  return async (dispatch: Dispatch<SelectAlbumAction>) => {
      dispatch({ type: SelectAlbumActionTypes.CLEARSELECTTRACK });
  };
};

export const getTracks = (data: IGetTracksRequest) => {
    return async (dispatch: Dispatch<SelectAlbumAction>) => {
      try {
        dispatch({ type: SelectAlbumActionTypes.INITSELECTALBUMS_WAITING, payload: true });
        const token = localStorage.getItem("token");
        const response = await http.get<IPagableResponse<IGetTracksResponse>>(
          `api/Albom/GetTracks?albomId=${data.albomId}&page=${data.page}`,
          AuthorizateHeader(token)
        );
        dispatch({ type: SelectAlbumActionTypes.INITSELECTALBUMTRACKS, payload: response.data});
  
        return Promise.resolve();
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const serverError = error as AxiosError<any>;
          dispatch({
            type: SelectAlbumActionTypes.INITSELECTALBUMS_ERROR,
            payload: serverError.response?.data,
          });
          if (serverError && serverError.response) {
            return Promise.reject(serverError.response.data);
          }
        }
      }
    };
  };