import { DefaultServerError } from "../../../types";
import { IMyGenreStateState, MyGenreAction, MyGenreActionTypes } from "./types";


const inialState: IMyGenreStateState = {
  genres: null,
  loading: false,
  error: "",
  prevPage: null,
  nextPage: null
};

export const myGenreReducer = (
  state = inialState,
  action: MyGenreAction
): IMyGenreStateState => {
  switch (action.type) {
    case MyGenreActionTypes.INITMYGENRE: {
      return {
        ...state,
        genres: action.payload ? action.payload.pageables : [],
        prevPage: action.payload ? action.payload.prevPage : null,
        nextPage: action.payload ? action.payload.nextPage : null,
        loading: false,
        error: "",
      };
    }
    case MyGenreActionTypes.ADDMYGENRE: {
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
    case MyGenreActionTypes.INITMYGENRE_WAITING: {
      return {
        ...state,
        loading: action.payload,
      };
    }
    case MyGenreActionTypes.INITMYGENRE_ERROR: {
      return {
        ...state,
        error:
          action.payload === undefined || action.payload === null
            ? DefaultServerError
            : action.payload,
        loading: false,
      };
    }

    case MyGenreActionTypes.INITMYGENRE_CLEAR: {
      return {
        ...state,
        genres: null,
        loading: false,
        error: "",
      };
    }

    default:
      return state;
  }
};
