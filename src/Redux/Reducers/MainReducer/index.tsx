import { DefaultServerError } from "../../../types";
import { IMainState, MainActionTypes, MainAction } from "./types";


const inialState: IMainState = {
  albums: null,
  artists: null,
  tracks: null,
  prevPage: null,
  nextPage: null,
  loading: false,
  error: "",
};

export const mainReducer = (
  state = inialState,
  action: MainAction
): IMainState => {
  switch (action.type) {
    case MainActionTypes.INITWEEKLYARTIST: {
      return {
        ...state,
        artists: action.payload ? action.payload.pageables : [],
        prevPage: action.payload ? action.payload.prevPage : null,
        nextPage: action.payload ? action.payload.nextPage : null,
        loading: false,
        error: "",
      };
    }
    case MainActionTypes.ADDWEEKLYARTIST: {
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

    case MainActionTypes.INITWEEKLYALBUM: {
      return {
        ...state,
        albums: action.payload ? action.payload.pageables : [],
        prevPage: action.payload ? action.payload.prevPage : null,
        nextPage: action.payload ? action.payload.nextPage : null,
        loading: false,
        error: "",
      };
    }
    case MainActionTypes.ADDWEEKLYALBUM: {
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

    case MainActionTypes.INITWEEKLYSONGSALBUM: {
      return {
        ...state,
        tracks: action.payload ? action.payload.pageables : [],
        prevPage: action.payload ? action.payload.prevPage : null,
        nextPage: action.payload ? action.payload.nextPage : null,
        loading: false,
        error: "",
      };
    }
    case MainActionTypes.ADDWEEKLYSONGSALBUM: {
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

    case MainActionTypes.MAIN_WAITING: {
      return {
        ...state,
        loading: action.payload,
      };
    }
    case MainActionTypes.MAIN_ERROR: {
      return {
        ...state,
        error:
          action.payload === undefined || action.payload === null
            ? DefaultServerError
            : action.payload,
        loading: false,
      };
    }

    case MainActionTypes.MAINCLEAR: {
      return {
        ...state,
        artists: null,
        tracks: null,
        loading: false,
        error: "",
      };
    }

    default:
      return state;
  }
};
