import { DefaultServerError } from "../../../types";
import { IGenreStateState, MyGenreAction, MyGenreActionTypes } from "./types";


const inialState: IGenreStateState = {
  genres: null,
  playlists: null,
  loading: false,
  error: "",
  prevPage: null,
  nextPage: null
};

export const myGenreReducer = (
  state = inialState,
  action: MyGenreAction
): IGenreStateState => {
  switch (action.type) {
    case MyGenreActionTypes.INITGENRE: {
      return {
        ...state,
        genres: action.payload ? action.payload.pageables : [],
        prevPage: action.payload ? action.payload.prevPage : null,
        nextPage: action.payload ? action.payload.nextPage : null,
        loading: false,
        error: "",
      };
    }
    case MyGenreActionTypes.ADDGENRE: {
      let arr = state.genres ? state.genres : [];
      if (action.payload && arr) {
        if (action.payload.pageables) {
          action.payload.pageables.forEach(e => {
            arr.push(e);
          })
        }
      }
      return {
        ...state,
        genres: action.payload ? arr : null,
        prevPage: action.payload ? action.payload.prevPage : null,
        nextPage: action.payload ? action.payload.nextPage : null,
        loading: false,
        error: "",
      };
    }

    case MyGenreActionTypes.INITGENREPLAYLIST: {
      return {
        ...state,
        playlists: action.payload ? action.payload.pageables : [],
        prevPage: action.payload ? action.payload.prevPage : null,
        nextPage: action.payload ? action.payload.nextPage : null,
        loading: false,
        error: "",
      };
    }
    case MyGenreActionTypes.ADDGENREPLAYLIST: {
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

    case MyGenreActionTypes.INITGENRE_WAITING: {
      return {
        ...state,
        loading: action.payload,
      };
    }
    case MyGenreActionTypes.INITGENRE_ERROR: {
      return {
        ...state,
        error:
          action.payload === undefined || action.payload === null
            ? DefaultServerError
            : action.payload,
        loading: false,
      };
    }

    case MyGenreActionTypes.INITGENRE_CLEAR: {
      return {
        ...state,
        genres: null,
        playlists: null,
        loading: false,
        error: "",
        nextPage: null,
        prevPage: null,
      };
    }

    case MyGenreActionTypes.INITGENREPLAYLIST_CLEAR: {
      return {
        ...state,
        playlists: null,
        loading: false,
        error: "",
        nextPage: null,
        prevPage: null,
      };
    }

    default:
      return state;
  }
};
