import { DefaultServerError } from "../../../types";
import { INotificationStateState, NotificateAction, NotificationActionTypes } from "./types";

const inialState: INotificationStateState = {
  notifications: null,
  appelations: null,
  statuses: null,
  selectedStatus: null,
  invites: null,
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
    case NotificationActionTypes.INITSTATUSES: {
      return {
        ...state,
        statuses: action.payload ? action.payload.pageables : [],
        prevPage: action.payload ? action.payload.prevPage : null,
        nextPage: action.payload ? action.payload.nextPage : null,
        loading: false,
        error: "",
      };
    }
    case NotificationActionTypes.ADDSTATUSES: {
      let arr = state.statuses ? state.statuses : [];
      if (action.payload && arr) {
        if (action.payload.pageables) {
          action.payload.pageables.forEach(e => {
            arr.push(e);
          })
        }
      }
      return {
        ...state,
        statuses: action.payload ? arr : null,
        prevPage: action.payload ? action.payload.prevPage : null,
        nextPage: action.payload ? action.payload.nextPage : null,
        loading: false,
        error: "",
      };
    }
    case NotificationActionTypes.INITINVITE: {
      return {
        ...state,
        invites: action.payload ? action.payload.pageables : [],
        prevPage: action.payload ? action.payload.prevPage : null,
        nextPage: action.payload ? action.payload.nextPage : null,
        loading: false,
        error: "",
      };
    }
    case NotificationActionTypes.ADDINVITE: {
      let arr = state.invites ? state.invites : [];
      if (action.payload && arr) {
        if (action.payload.pageables) {
          action.payload.pageables.forEach(e => {
            arr.push(e);
          })
        }
      }
      return {
        ...state,
        invites: action.payload ? arr : null,
        prevPage: action.payload ? action.payload.prevPage : null,
        nextPage: action.payload ? action.payload.nextPage : null,
        loading: false,
        error: "Invite not found",
      };
    }
    case NotificationActionTypes.REJECTINVITE: {
      const arr = state.invites?.filter(f => f.id !== action.payload);
      return {
        ...state,
        invites: arr ? arr : [],
        loading: false,
        error: "Invite not found",
      };
    }
    case NotificationActionTypes.INITSELECTSTATUS: {
      return {
        ...state,
        selectedStatus: action.payload,
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
        statuses: null,
        selectedStatus: null,
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
