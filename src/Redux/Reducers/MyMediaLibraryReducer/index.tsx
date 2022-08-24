import { DefaultServerError } from "../../../types";
import { IMyMediaLibrarySingleStateState, MyMediaLibraryAction, MyMediaLibraryActionTypes } from "./types";


const inialState: IMyMediaLibrarySingleStateState = {
  singles: null,
  albums: null,
  playlists: null,
  artists: null,
  loading: false,
  error: "",
  prevPage: null,
  nextPage: null,
};

export const myMediaLibraryReducer = (
  state = inialState,
  action: MyMediaLibraryAction
): IMyMediaLibrarySingleStateState => {
  switch (action.type) {
    case MyMediaLibraryActionTypes.INITMYMEDIALIBRARYSINGLE: {
      return {
        ...state,
        singles: action.payload ? action.payload.pageables: [],
        prevPage: action.payload ? action.payload.prevPage : null,
        nextPage: action.payload ? action.payload.nextPage : null,
        loading: false,
        error: "",
      };
    }
    case MyMediaLibraryActionTypes.ADDMYMEDIALIBRARYSINGLE: {
      let arr = state.singles ? state.singles : [];
      if (action.payload && arr) {
        if (action.payload.pageables) {
          action.payload.pageables.forEach(e => {
            arr.push(e);
          })
        }
      }
      return {
        ...state,
        singles: action.payload ? arr : null,
        prevPage: action.payload ? action.payload.prevPage : null,
        nextPage: action.payload ? action.payload.nextPage : null,
        loading: false,
        error: "",
      };
    }
    case MyMediaLibraryActionTypes.INITMYMEDIALIBRARYALBUMS: {
      return {
        ...state,
        albums: action.payload && action.payload.pageables ? action.payload.pageables?.reverse() : [],
        prevPage: action.payload ? action.payload.prevPage : null,
        nextPage: action.payload ? action.payload.nextPage : null,
        loading: false,
        error: "",
      };
    }
    case MyMediaLibraryActionTypes.ADDMYMEDIALIBRARYALBUMS: {
      let arr = state.albums ? state.albums : [];
      if (action.payload && arr) {
        if (action.payload.pageables) {
          action.payload.pageables.forEach(e => {
            arr.push(e);
          })
        }
      }
      return {
        ...state,
        albums: action.payload ? arr.reverse() : null,
        prevPage: action.payload ? action.payload.prevPage : null,
        nextPage: action.payload ? action.payload.nextPage : null,
        loading: false,
        error: "",
      };
    }
    case MyMediaLibraryActionTypes.INITMYMEDIALIBRARYPLAYLISTS: {
      return {
        ...state,
        playlists: action.payload && action.payload.pageables ? action.payload.pageables?.reverse() : [],
        prevPage: action.payload ? action.payload.prevPage : null,
        nextPage: action.payload ? action.payload.nextPage : null,
        loading: false,
        error: "",
      };
    }
    case MyMediaLibraryActionTypes.ADDMYMEDIALIBRARYPLAYLISTS: {
      let arr = state.playlists ? state.playlists : [];
      if (action.payload && arr) {
        if (action.payload.pageables) {
          action.payload.pageables.forEach(e => {
            arr.push(e);
          })
        }
      }
      return {
        ...state,
        playlists: action.payload ? arr.reverse() : null,
        prevPage: action.payload ? action.payload.prevPage : null,
        nextPage: action.payload ? action.payload.nextPage : null,
        loading: false,
        error: "",
      };
    }
    case MyMediaLibraryActionTypes.INITMYMEDIALIBRARYARTISTS: {
      return {
        ...state,
        artists: action.payload && action.payload.pageables ? action.payload.pageables?.reverse() : [],
        prevPage: action.payload ? action.payload.prevPage : null,
        nextPage: action.payload ? action.payload.nextPage : null,
        loading: false,
        error: "",
      };
    }
    case MyMediaLibraryActionTypes.ADDMYMEDIALIBRARYARTISTS: {
      let arr = state.artists ? state.artists : [];
      if (action.payload && arr) {
        if (action.payload.pageables) {
          action.payload.pageables.forEach(e => {
            arr.push(e);
          })
        }
      }
      return {
        ...state,
        artists: action.payload ? arr.reverse() : null,
        prevPage: action.payload ? action.payload.prevPage : null,
        nextPage: action.payload ? action.payload.nextPage : null,
        loading: false,
        error: "",
      };
    }
    case MyMediaLibraryActionTypes.INITMYMEDIALIBRARY_WAITING: {
      return {
        ...state,
        loading: action.payload,
      };
    }
    case MyMediaLibraryActionTypes.INITMYMEDIALIBRARY_ERROR: {
      return {
        ...state,
        error:
          action.payload === undefined || action.payload === null
            ? DefaultServerError
            : action.payload,
        loading: false,
      };
    }

    case MyMediaLibraryActionTypes.INITMYMEDIALIBRARY_CLEAR: {
      return {
        ...state,
        singles: null,
        loading: false,
        error: "",
      };
    }

    default:
      return state;
  }
};
