import { DefaultServerError } from "../../../types";
import { ISearchState, SearchAction, SearchActionTypes } from "./types";


const inialState: ISearchState = {
  searchall: null,
  profiles: null,
  artists: null,
  playlists: null,
  albums: null,
  tracks: null,
  prevPage: null,
  nextPage: null,
  loading: false,
  error: ""
};

export const searchReducer = (
  state = inialState,
  action: SearchAction
): ISearchState => {
  switch (action.type) {

    case SearchActionTypes.INITSEARCHALL: {
      return {
        ...state,
        searchall: action.payload,
        loading: false,
        error: "",
      };
    }
    case SearchActionTypes.INITSEARCHPROFILE: {
      return {
        ...state,
        profiles: action.payload ? action.payload.pageables : [],
        prevPage: action.payload ? action.payload.prevPage : null,
        nextPage: action.payload ? action.payload.nextPage : null,
        loading: false,
        error: "",
      };
    }
    case SearchActionTypes.ADDSEARCHPROFILE: {
      let arr = state.profiles ? state.profiles : [];
      if (action.payload && arr) {
        if (action.payload.pageables) {
          action.payload.pageables.forEach(e => {
            arr.push(e);
          })
        }
      }
      return {
        ...state,
        profiles: action.payload ? arr : null,
        prevPage: action.payload ? action.payload.prevPage : null,
        nextPage: action.payload ? action.payload.nextPage : null,
        loading: false,
        error: "",
      };
    }
    case SearchActionTypes.INITSEARCHARTISTS: {
      return {
        ...state,
        artists: action.payload ? action.payload.pageables : [],
        prevPage: action.payload ? action.payload.prevPage : null,
        nextPage: action.payload ? action.payload.nextPage : null,
        loading: false,
        error: "",
      };
    }
    case SearchActionTypes.ADDSEARCHARTISTS: {
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
        artists: action.payload ? arr : null,
        prevPage: action.payload ? action.payload.prevPage : null,
        nextPage: action.payload ? action.payload.nextPage : null,
        loading: false,
        error: "",
      };
    }
    case SearchActionTypes.INITSEARCHPLAYLIST: {
      return {
        ...state,
        playlists: action.payload ? action.payload.pageables : [],
        prevPage: action.payload ? action.payload.prevPage : null,
        nextPage: action.payload ? action.payload.nextPage : null,
        loading: false,
        error: "",
      };
    }
    case SearchActionTypes.ADDSEARCHPLAYLIST: {
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
        playlists: action.payload ? arr : null,
        prevPage: action.payload ? action.payload.prevPage : null,
        nextPage: action.payload ? action.payload.nextPage : null,
        loading: false,
        error: "",
      };
    }
    case SearchActionTypes.INITSEARCHALBUM: {
      return {
        ...state,
        albums: action.payload ? action.payload.pageables : [],
        prevPage: action.payload ? action.payload.prevPage : null,
        nextPage: action.payload ? action.payload.nextPage : null,
        loading: false,
        error: "",
      };
    }
    case SearchActionTypes.ADDSEARCHALBUM: {
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
        albums: action.payload ? arr : null,
        prevPage: action.payload ? action.payload.prevPage : null,
        nextPage: action.payload ? action.payload.nextPage : null,
        loading: false,
        error: "",
      };
    }
    case SearchActionTypes.INITSEARCHTRACK: {
      return {
        ...state,
        tracks: action.payload ? action.payload.pageables : [],
        prevPage: action.payload ? action.payload.prevPage : null,
        nextPage: action.payload ? action.payload.nextPage : null,
        loading: false,
        error: "",
      };
    }
    case SearchActionTypes.ADDSEARCHTRACK: {
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
        tracks: action.payload ? arr : null,
        prevPage: action.payload ? action.payload.prevPage : null,
        nextPage: action.payload ? action.payload.nextPage : null,
        loading: false,
        error: "",
      };
    }
    case SearchActionTypes.SEARCH_WAITING: {
      return {
        ...state,
        loading: action.payload,
      };
    }
    case SearchActionTypes.SEARCH_ERROR: {
      return {
        ...state,
        error:
          action.payload === undefined || action.payload === null
            ? DefaultServerError
            : action.payload,
        loading: false,
      };
    }

    case SearchActionTypes.SEARCHCLEAR: {
      return {
        ...state,
        searchall: null,
        prevPage: null,
        nextPage: null,
        loading: false,
        error: "",
      };
    }

    default:
      return state;
  }
};
