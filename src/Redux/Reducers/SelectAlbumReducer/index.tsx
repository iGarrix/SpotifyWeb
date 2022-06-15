import { DefaultServerError } from "../../../types";
import { ISelectAlbumStateState, SelectAlbumAction, SelectAlbumActionTypes } from "./types";

const inialState: ISelectAlbumStateState = {
  album: null,
  tracks: null,
  queue: null,
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
    case SelectAlbumActionTypes.INITSELECTALBUMTRACKS: {
      let arr = state.tracks ? state.tracks : [];
      if (action.payload && arr) {  
        if (action.payload.pageables) {  
          action.payload.pageables.forEach(e => {
            arr.push(e);
          })
        }   
      }
        return {
          ...state,
          tracks: action.payload ? arr : [],
          nextPage: action.payload? action.payload.nextPage : null,
          prevPage: action.payload? action.payload.prevPage : null,
          loading: false,
          error: "",
        };
      }
    case SelectAlbumActionTypes.INITQUEUE: {
      return {
        ...state,
        queue: action.payload,
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
        queue: null,
        tracks: null,
        loading: false,
        error: "",
      };
    }

    case SelectAlbumActionTypes.CLEARQUEUE: {
      return {
        ...state,
        queue: null,
      };
    }
    default:
      return state;
  }
};
