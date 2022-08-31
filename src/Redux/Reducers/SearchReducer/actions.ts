import axios, { AxiosError } from "axios";
import { Dispatch } from "redux";
import http from "../../../axios_creator";
import { IPagableResponse } from "../../../types";
import { ITrackResponse } from "../PlayingReducer/types";
import { IAlbumSearch, IPlaylistSearch, ISearchAllModel, IUserSearch, SearchAction, SearchActionTypes } from "./types";

export const SearchAllXHR = (searchQuery: string, emailClient: string) => {
  return async (dispatch: Dispatch<SearchAction>) => {
    try {
      dispatch({ type: SearchActionTypes.SEARCH_WAITING, payload: true });
      const response = await http.get<ISearchAllModel>(
        `api/Search/SearchAll?searchQuery=${searchQuery}&emailClient=${emailClient}`
      );
      dispatch({ type: SearchActionTypes.INITSEARCHALL, payload: response.data });

      return Promise.resolve();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<any>;
        dispatch({
          type: SearchActionTypes.SEARCH_ERROR,
          payload: serverError.response?.data,
        });
        if (serverError && serverError.response) {
          return Promise.reject(serverError.response.data);
        }
      }
    }
  };
};

export const SearchAllWithoutBestResultXHR = () => {
  return async (dispatch: Dispatch<SearchAction>) => {
    try {
      dispatch({ type: SearchActionTypes.SEARCH_WAITING, payload: true });
      const response = await http.get<ISearchAllModel>(
        `api/Search/SearchAllWithoutBestResult`
      );
      dispatch({ type: SearchActionTypes.INITSEARCHALL, payload: response.data });

      return Promise.resolve();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<any>;
        dispatch({
          type: SearchActionTypes.SEARCH_ERROR,
          payload: serverError.response?.data,
        });
        if (serverError && serverError.response) {
          return Promise.reject(serverError.response.data);
        }
      }
    }
  };
};


export const ClearSearchXHR = () => {
  return (dispatch: Dispatch<SearchAction>) => {
    dispatch({ type: SearchActionTypes.SEARCHCLEAR });
  };
}

export const getAllSearchProfile = (searchQuery: string, page: number) => {
  return async (dispatch: Dispatch<SearchAction>) => {
    try {
      dispatch({ type: SearchActionTypes.SEARCH_WAITING, payload: true });
      const response = await http.get<IPagableResponse<IUserSearch>>(
        `api/Search/SearchFilterProfile?searchQuery=${searchQuery}&page=${page}`
      );
      dispatch({ type: SearchActionTypes.INITSEARCHPROFILE, payload: response.data });

      return Promise.resolve();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<any>;
        dispatch({
          type: SearchActionTypes.SEARCH_ERROR,
          payload: serverError.response?.data,
        });
        if (serverError && serverError.response) {
          return Promise.reject(serverError.response.data);
        }
      }
    }
  };
};

export const addAllSearchProfile = (searchQuery: string, page: number) => {
  return async (dispatch: Dispatch<SearchAction>) => {
    try {
      dispatch({ type: SearchActionTypes.SEARCH_WAITING, payload: true });
      const response = await http.get<IPagableResponse<IUserSearch>>(
        `api/Search/SearchFilterProfile?searchQuery=${searchQuery}&page=${page}`
      );
      dispatch({ type: SearchActionTypes.ADDSEARCHPROFILE, payload: response.data });

      return Promise.resolve();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<any>;
        dispatch({
          type: SearchActionTypes.SEARCH_ERROR,
          payload: serverError.response?.data,
        });
        if (serverError && serverError.response) {
          return Promise.reject(serverError.response.data);
        }
      }
    }
  };
};

export const getAllSearchArtists = (searchQuery: string, page: number) => {
  return async (dispatch: Dispatch<SearchAction>) => {
    try {
      dispatch({ type: SearchActionTypes.SEARCH_WAITING, payload: true });
      const response = await http.get<IPagableResponse<IUserSearch>>(
        `api/Search/SearchFilterCreator?searchQuery=${searchQuery}&page=${page}`
      );
      dispatch({ type: SearchActionTypes.INITSEARCHARTISTS, payload: response.data });

      return Promise.resolve();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<any>;
        dispatch({
          type: SearchActionTypes.SEARCH_ERROR,
          payload: serverError.response?.data,
        });
        if (serverError && serverError.response) {
          return Promise.reject(serverError.response.data);
        }
      }
    }
  };
};

export const addAllSearchArtists = (searchQuery: string, page: number) => {
  return async (dispatch: Dispatch<SearchAction>) => {
    try {
      dispatch({ type: SearchActionTypes.SEARCH_WAITING, payload: true });
      const response = await http.get<IPagableResponse<IUserSearch>>(
        `api/Search/SearchFilterCreator?searchQuery=${searchQuery}&page=${page}`
      );
      dispatch({ type: SearchActionTypes.ADDSEARCHARTISTS, payload: response.data });

      return Promise.resolve();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<any>;
        dispatch({
          type: SearchActionTypes.SEARCH_ERROR,
          payload: serverError.response?.data,
        });
        if (serverError && serverError.response) {
          return Promise.reject(serverError.response.data);
        }
      }
    }
  };
};

export const getAllSearchPlaylist = (searchQuery: string, page: number) => {
  return async (dispatch: Dispatch<SearchAction>) => {
    try {
      dispatch({ type: SearchActionTypes.SEARCH_WAITING, payload: true });
      const response = await http.get<IPagableResponse<IPlaylistSearch>>(
        `api/Search/SearchFilterPlaylist?searchQuery=${searchQuery}&page=${page}`
      );
      dispatch({ type: SearchActionTypes.INITSEARCHPLAYLIST, payload: response.data });

      return Promise.resolve();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<any>;
        dispatch({
          type: SearchActionTypes.SEARCH_ERROR,
          payload: serverError.response?.data,
        });
        if (serverError && serverError.response) {
          return Promise.reject(serverError.response.data);
        }
      }
    }
  };
};

export const addAllSearchPlaylist = (searchQuery: string, page: number) => {
  return async (dispatch: Dispatch<SearchAction>) => {
    try {
      dispatch({ type: SearchActionTypes.SEARCH_WAITING, payload: true });
      const response = await http.get<IPagableResponse<IPlaylistSearch>>(
        `api/Search/SearchFilterPlaylist?searchQuery=${searchQuery}&page=${page}`
      );
      dispatch({ type: SearchActionTypes.ADDSEARCHPLAYLIST, payload: response.data });

      return Promise.resolve();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<any>;
        dispatch({
          type: SearchActionTypes.SEARCH_ERROR,
          payload: serverError.response?.data,
        });
        if (serverError && serverError.response) {
          return Promise.reject(serverError.response.data);
        }
      }
    }
  };
};

export const getAllSearchAlbum = (searchQuery: string, page: number) => {
  return async (dispatch: Dispatch<SearchAction>) => {
    try {
      dispatch({ type: SearchActionTypes.SEARCH_WAITING, payload: true });
      const response = await http.get<IPagableResponse<IAlbumSearch>>(
        `api/Search/SearchFilterAlbum?searchQuery=${searchQuery}&page=${page}`
      );
      dispatch({ type: SearchActionTypes.INITSEARCHALBUM, payload: response.data });

      return Promise.resolve();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<any>;
        dispatch({
          type: SearchActionTypes.SEARCH_ERROR,
          payload: serverError.response?.data,
        });
        if (serverError && serverError.response) {
          return Promise.reject(serverError.response.data);
        }
      }
    }
  };
};

export const addAllSearchAlbum = (searchQuery: string, page: number) => {
  return async (dispatch: Dispatch<SearchAction>) => {
    try {
      dispatch({ type: SearchActionTypes.SEARCH_WAITING, payload: true });
      const response = await http.get<IPagableResponse<IAlbumSearch>>(
        `api/Search/SearchFilterAlbum?searchQuery=${searchQuery}&page=${page}`
      );
      dispatch({ type: SearchActionTypes.ADDSEARCHALBUM, payload: response.data });

      return Promise.resolve();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<any>;
        dispatch({
          type: SearchActionTypes.SEARCH_ERROR,
          payload: serverError.response?.data,
        });
        if (serverError && serverError.response) {
          return Promise.reject(serverError.response.data);
        }
      }
    }
  };
};

export const getAllSearchTrack = (searchQuery: string, emailClient: string, page: number) => {
  return async (dispatch: Dispatch<SearchAction>) => {
    try {
      dispatch({ type: SearchActionTypes.SEARCH_WAITING, payload: true });
      const response = await http.get<IPagableResponse<ITrackResponse>>(
        `api/Search/SearchFilterTrack?searchQuery=${searchQuery}&emailClient=${emailClient}&page=${page}`
      );
      dispatch({ type: SearchActionTypes.INITSEARCHTRACK, payload: response.data });

      return Promise.resolve();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<any>;
        dispatch({
          type: SearchActionTypes.SEARCH_ERROR,
          payload: serverError.response?.data,
        });
        if (serverError && serverError.response) {
          return Promise.reject(serverError.response.data);
        }
      }
    }
  };
};

export const addAllSearchTrack = (searchQuery: string, page: number) => {
  return async (dispatch: Dispatch<SearchAction>) => {
    try {
      dispatch({ type: SearchActionTypes.SEARCH_WAITING, payload: true });
      const response = await http.get<IPagableResponse<ITrackResponse>>(
        `api/Search/SearchFilterTrack?searchQuery=${searchQuery}&page=${page}`
      );
      dispatch({ type: SearchActionTypes.ADDSEARCHTRACK, payload: response.data });

      return Promise.resolve();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<any>;
        dispatch({
          type: SearchActionTypes.SEARCH_ERROR,
          payload: serverError.response?.data,
        });
        if (serverError && serverError.response) {
          return Promise.reject(serverError.response.data);
        }
      }
    }
  };
};