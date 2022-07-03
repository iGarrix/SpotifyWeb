import { DefaultServerError } from "../../../types";
import { IMySingleStateState, MySingleAction, MySingleActionTypes } from "./types";


const inialState: IMySingleStateState = {
  singles: null,
  loading: false,
  error: "",
  prevPage: null,
  nextPage: null,
};

export const mySinglesReducer = (
  state = inialState,
  action: MySingleAction
): IMySingleStateState => {
  switch (action.type) {
    case MySingleActionTypes.INITMYSINGLE: {
      return {
        ...state,
        singles: action.payload ? action.payload.pageables : [],
        prevPage: action.payload ? action.payload.prevPage : null,
        nextPage: action.payload ? action.payload.nextPage : null,
        loading: false,
        error: "",
      };
    }
    case MySingleActionTypes.ADDMYSINGLE: {
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
    case MySingleActionTypes.INITMYSINGLE_WAITING: {
      return {
        ...state,
        loading: action.payload,
      };
    }
    case MySingleActionTypes.INITMYSINGLE_ERROR: {
      return {
        ...state,
        error:
          action.payload === undefined || action.payload === null
            ? DefaultServerError
            : action.payload,
        loading: false,
      };
    }

    case MySingleActionTypes.INITMYSINGLE_CLEAR: {
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
