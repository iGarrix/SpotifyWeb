import { DefaultServerError } from "../../../types";
import { ISelectAlbumStateState, SelectAlbumAction, SelectAlbumActionTypes } from "./types";

const inialState: ISelectAlbumStateState = {
    album: null,
    tracks: null,
    loading: false,
    error: "",
    prevPage: null,
    nextPage: null,
};

export const selectedAlbumReducer = (
  state = inialState,
  action: SelectAlbumAction
): ISelectAlbumStateState => {
  switch (action.type) {
    case SelectAlbumActionTypes.INITSELECTALBUM: {
      return {
        ...state,
        album: action.payload,
        loading: false,
        error: "",
      };
    }
    case SelectAlbumActionTypes.INITSELECTTRACKS: {
        return {
          ...state,
          tracks: action.payload ? action.payload.pageables : [],
          loading: false,
          error: "",
        };
      }
    case SelectAlbumActionTypes.INITSELECTALBUMS_WAITING: {
      return {
        ...state,
        loading: action.payload,
      };
    }
    case SelectAlbumActionTypes.INITSELECTALBUMS_ERROR: {
      return {
        ...state,
        error:
          action.payload === undefined || action.payload === null
            ? DefaultServerError
            : action.payload,
        loading: false,
      };
    }

    case SelectAlbumActionTypes.INITSELECTALBUMS_CLEAR: {
      return {
        ...state,
        album: null,
        tracks: null,
        loading: false,
        error: "",
      };
    }

    default:
      return state;
  }
};
