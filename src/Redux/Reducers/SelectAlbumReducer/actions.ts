import { Dispatch } from "redux";
import axios, { AxiosError } from "axios";
import http, { AuthorizateHeader } from "../../../axios_creator";
import { IPagableMyAlbumItem } from "../MyAlbumReducer/types";
import { IGetTracksRequest, IGetTracksResponse, IQueue, PlayingAction, PlayingActionTypes } from "./types";
import { IHistory, IPagableResponse } from "../../../types";



export const initSelectAlbum = (data: IPagableMyAlbumItem) => {
  return async (dispatch: Dispatch<PlayingAction>) => {
    dispatch({ type: PlayingActionTypes.INITSELECTALBUM, payload: data });
    dispatch({ type: PlayingActionTypes.INITSELECTALBUMS_WAITING, payload: false });
  };
};

export const initQueue = (data: IQueue) => {
  return async (dispatch: Dispatch<PlayingAction>) => {
    dispatch({ type: PlayingActionTypes.INITQUEUE, payload: data });
  };
};

export const setPlayingTrack = (play: boolean) => {
  return async (dispatch: Dispatch<PlayingAction>) => {
    dispatch({ type: PlayingActionTypes.SETPLAYING, payload: play });
  };
};

export const initHistory = (data: IHistory) => {
  return async (dispatch: Dispatch<PlayingAction>) => {
    dispatch({ type: PlayingActionTypes.INITSELECTALBUMS_WAITING, payload: true });
    dispatch({ type: PlayingActionTypes.INITHISTORY, payload: data });
  };
};

export const clearQueue = () => {
  return async (dispatch: Dispatch<PlayingAction>) => {
    dispatch({ type: PlayingActionTypes.CLEARQUEUE });
  };
};

export const clearHistory = () => {
  return async (dispatch: Dispatch<PlayingAction>) => {
    dispatch({ type: PlayingActionTypes.CLEARHISTORY });
  };
};

export const clearTracks = () => {
  return async (dispatch: Dispatch<PlayingAction>) => {
    dispatch({ type: PlayingActionTypes.CLEARTRACKS });
  };
};

export const getTracks = (data: IGetTracksRequest) => {
  return async (dispatch: Dispatch<PlayingAction>) => {
    try {
      dispatch({ type: PlayingActionTypes.INITSELECTALBUMS_WAITING, payload: true });
      const token = localStorage.getItem("token");
      const response = await http.get<IPagableResponse<IGetTracksResponse>>(
        `api/Albom/GetTracks?albomId=${data.albomId}&page=${data.page}`,
        AuthorizateHeader(token)
      );
      dispatch({ type: PlayingActionTypes.INITSELECTALBUMTRACKS, payload: response.data });

      return Promise.resolve();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<any>;
        dispatch({
          type: PlayingActionTypes.INITSELECTALBUMS_ERROR,
          payload: serverError.response?.data,
        });
        if (serverError && serverError.response) {
          return Promise.reject(serverError.response.data);
        }
      }
    }
  };
};