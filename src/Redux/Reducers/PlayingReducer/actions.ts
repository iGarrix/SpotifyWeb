import { Dispatch } from "redux";
import axios, { AxiosError } from "axios";
import http, { AuthorizateHeader } from "../../../axios_creator";
import { IPagableMyAlbumItem } from "../MyAlbumReducer/types";
import { IAddTrackToPlaylistRequest, IGetPlaylistTracksRequest, IGetTracksRequest, IGetTracksResponse, IQueue, PlayingAction, PlayingActionTypes } from "./types";
import { IHistory, IPagableResponse } from "../../../types";
import { IChangePlaylistImageRequest, IChangePlaylistRequest, IPagableMyPlaylistItem, IPlaylistFindRequest, IRemoveTrackPlaylistRequest } from "../MyPlaylistReducer/types";


export const initSelectAlbum = (data: IPagableMyAlbumItem | null) => {
  return async (dispatch: Dispatch<PlayingAction>) => {
    dispatch({ type: PlayingActionTypes.INITSELECTALBUM, payload: data });
    dispatch({ type: PlayingActionTypes.INITSELECTALBUMS_WAITING, payload: false });
  };
};

export const initSelectPlaylist = (data: IPagableMyPlaylistItem | null) => {
  return async (dispatch: Dispatch<PlayingAction>) => {
    dispatch({ type: PlayingActionTypes.INITSELECTPLAYLIST, payload: data });
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

export const getPlaylistTracks = (data: IGetPlaylistTracksRequest) => {
  return async (dispatch: Dispatch<PlayingAction>) => {
    try {
      dispatch({ type: PlayingActionTypes.INITSELECTALBUMS_WAITING, payload: true });
      const token = localStorage.getItem("token");
      const response = await http.get<IPagableResponse<IGetTracksResponse>>(
        `api/Playlist/GetAllTracks?returnId=${data.returnId}&page=${data.page}`,
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

export const findAlbum = (id: string) => {
  return async (dispatch: Dispatch<PlayingAction>) => {
    try {
      dispatch({ type: PlayingActionTypes.INITSELECTALBUMS_WAITING, payload: true });
      const token = localStorage.getItem("token");
      const response = await http.get<IPagableMyAlbumItem>(
        `api/Albom/Find?returnId=${id}`,
        AuthorizateHeader(token)
      );
      dispatch({ type: PlayingActionTypes.INITSELECTALBUM, payload: response.data });

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

export const findPlaylist = (id: string, clientEmail: string, isMe: boolean = false) => {
  return async (dispatch: Dispatch<PlayingAction>) => {
    try {
      dispatch({ type: PlayingActionTypes.INITSELECTALBUMS_WAITING, payload: true });
      const token = localStorage.getItem("token");
      const response = await http.get<IPagableMyPlaylistItem>(
        `api/Playlist/Find?returnId=${id}&clientEmail=${clientEmail}&isMe=${isMe}`,
        AuthorizateHeader(token)
      );
      dispatch({ type: PlayingActionTypes.INITSELECTPLAYLIST, payload: response.data });

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

export const updatePlaylist = (data: IChangePlaylistRequest) => {
  return async (dispatch: Dispatch<PlayingAction>) => {
    try {
      dispatch({ type: PlayingActionTypes.INITSELECTALBUMS_WAITING, payload: true });
      const token = localStorage.getItem("token");
      const response = await http.put<IPagableMyPlaylistItem>(
        "api/Playlist/Update",
        data, AuthorizateHeader(token)
      );
      dispatch({ type: PlayingActionTypes.INITSELECTPLAYLIST, payload: response.data });

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

export const updateImagePlaylist = (data: IChangePlaylistImageRequest) => {
  return async (dispatch: Dispatch<PlayingAction>) => {
    try {
      dispatch({ type: PlayingActionTypes.INITSELECTALBUMS_WAITING, payload: true });
      const token = localStorage.getItem("token");
      const form = new FormData();
      form.append("Response.FindPlaylistName", data.response.findPlaylistName);
      form.append("Response.FindPlaylistCreatorEmail", data.response.findPlaylistCreatorEmail);
      form.append("Image", data.image);
      form.append("Image", data.image);
      const response = await http.put<IPagableMyPlaylistItem>(
        "api/Playlist/UpdateImage",
        form, AuthorizateHeader(token)
      );
      dispatch({ type: PlayingActionTypes.INITSELECTPLAYLIST, payload: response.data });

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

export const removePlaylist = (data: IPlaylistFindRequest) => {
  return async (dispatch: Dispatch<PlayingAction>) => {
    try {
      dispatch({ type: PlayingActionTypes.INITSELECTALBUMS_WAITING, payload: true });
      const token = localStorage.getItem("token");
      await http.delete<String>(
        "api/Playlist/Remove", {
        headers: AuthorizateHeader(token).headers,
        data: data
      }
      );
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

export const removeTrackByPlaylist = (data: IRemoveTrackPlaylistRequest) => {
  return async (dispatch: Dispatch<PlayingAction>) => {
    try {
      dispatch({ type: PlayingActionTypes.INITSELECTALBUMS_WAITING, payload: true });
      const token = localStorage.getItem("token");
      await http.delete<string>(
        "api/Playlist/RemoveTrack", {
        headers: AuthorizateHeader(token).headers,
        data: data
      }
      );
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


export const addTrackToPlaylist = (data: IAddTrackToPlaylistRequest, isAddingError?: boolean) => {
  return async (dispatch: Dispatch<PlayingAction>) => {
    try {
      dispatch({ type: PlayingActionTypes.INITSELECTALBUMS_WAITING, payload: true });
      const token = localStorage.getItem("token");
      await http.post<IPagableResponse<IGetTracksResponse>>(
        `api/Playlist/AddTrack`, data,
        AuthorizateHeader(token)
      );

      return Promise.resolve();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<any>;
        if (!isAddingError) {       
          dispatch({
            type: PlayingActionTypes.INITSELECTALBUMS_ERROR,
            payload: serverError.response?.data,
          });
        }
        if (serverError && serverError.response) {
          return Promise.reject(serverError.response.data);
        }
      }
    }
  };
};