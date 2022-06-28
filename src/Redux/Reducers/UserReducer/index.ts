import { DefaultServerError } from "../../../types";
import { IUserState, UserAction, UserActionTypes } from "./types";

const inialState: IUserState = {
  profile: null,
  overviewer: null,
  loading: false,
  error: "",
};

export const userReducer = (
  state = inialState,
  action: UserAction
): IUserState => {
  switch (action.type) {
    case UserActionTypes.INITUSER: {
      return {
        ...state,
        profile: action.payload,
        loading: false,
        error: "",
      };
    }
    case UserActionTypes.INITOVERWIEVER: {
      return {
        ...state,
        overviewer: action.payload,
        loading: false,
        error: "",
      };
    }
    case UserActionTypes.INITUSER_WAITING: {
      return {
        ...state,
        loading: action.payload,
      };
    }
    case UserActionTypes.INITUSER_ERROR: {
      return {
        ...state,
        error:
          action.payload === undefined || action.payload === null
            ? DefaultServerError
            : action.payload,
        loading: false,
      };
    }

    case UserActionTypes.INITUSER_CLEAR: {
      return {
        ...state,
        profile: null,
        loading: false,
        error: "",
      };
    }

    default:
      return state;
  }
};
