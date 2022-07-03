import { DefaultServerError } from "../../../types";
import { INotificationStateState, NotificateAction, NotificationActionTypes } from "./types";

const inialState: INotificationStateState = {
  notifications: null,
  appelations: null,
  prevPage: null,
  nextPage: null,
  loading: false,
  error: "",
};

export const notificationReducer = (
  state = inialState,
  action: NotificateAction
): INotificationStateState => {
  switch (action.type) {
    case NotificationActionTypes.INITNOTIFICATION: {
      return {
        ...state,
        notifications: action.payload ? action.payload.pageables : [],
        prevPage: action.payload ? action.payload.prevPage : null,
        nextPage: action.payload ? action.payload.nextPage : null,
        loading: false,
        error: "",
      };
    }
    case NotificationActionTypes.ADDNOTIFICATION: {
      let arr = state.notifications ? state.notifications : [];
      if (action.payload && arr) {
        if (action.payload.pageables) {
          action.payload.pageables.forEach(e => {
            arr.push(e);
          })
        }
      }
      return {
        ...state,
        notifications: action.payload ? arr : null,
        prevPage: action.payload ? action.payload.prevPage : null,
        nextPage: action.payload ? action.payload.nextPage : null,
        loading: false,
        error: "",
      };
    }
    case NotificationActionTypes.INITAPPELATIONS: {
      return {
        ...state,
        appelations: action.payload ? action.payload.pageables : [],
        prevPage: action.payload ? action.payload.prevPage : null,
        nextPage: action.payload ? action.payload.nextPage : null,
        loading: false,
        error: "",
      };
    }
    case NotificationActionTypes.ADDAPPELATIONS: {
      let arr = state.appelations ? state.appelations : [];
      if (action.payload && arr) {
        if (action.payload.pageables) {
          action.payload.pageables.forEach(e => {
            arr.push(e);
          })
        }
      }
      return {
        ...state,
        appelations: action.payload ? arr : null,
        prevPage: action.payload ? action.payload.prevPage : null,
        nextPage: action.payload ? action.payload.nextPage : null,
        loading: false,
        error: "",
      };
    }
    case NotificationActionTypes.INITNOTIFICATION_WAITING: {
      return {
        ...state,
        loading: action.payload,
      };
    }
    case NotificationActionTypes.INITNOTIFICATION_ERROR: {
      return {
        ...state,
        notifications: null,
        error:
          action.payload === undefined || action.payload === null
            ? DefaultServerError
            : action.payload,
        loading: false,
      };
    }

    case NotificationActionTypes.INITNOTIFICATION_CLEAR: {
      return {
        ...state,
        notifications: null,
        appelations: null,
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
