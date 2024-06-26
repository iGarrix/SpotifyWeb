import { DefaultServerError } from "../../../types";
import { IPlayingStateState, ITrackResponse, PlayingAction, PlayingActionTypes } from "./types";

const inialState: IPlayingStateState = {
  album: null,
  playlist: null,
  tracks: null,
  queue: null,
  loading: false,
  error: "",
  prevPage: null,
  nextPage: null,
  history: null,
};

export const playingReducer = (
  state = inialState,
  action: PlayingAction
): IPlayingStateState => {
  switch (action.type) {
    case PlayingActionTypes.INITSELECTALBUM: {
      return {
        ...state,
        album: action.payload,
        loading: false,
        error: "",
      };
    }
    case PlayingActionTypes.INITSELECTPLAYLIST: {
      return {
        ...state,
        playlist: action.payload,
        loading: false,
        error: "",
      };
    }
    case PlayingActionTypes.INITSELECTALBUMTRACKS: {
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
        tracks: action.payload ? arr.reverse() : [],
        nextPage: action.payload ? action.payload.nextPage : null,
        prevPage: action.payload ? action.payload.prevPage : null,
        loading: false,
        error: "",
      };
    }
    case PlayingActionTypes.INITEDALBUMTRACKS: {
      return {
        ...state,
        tracks: action.payload && action.payload.pageables ? action.payload.pageables?.reverse() : [],
        nextPage: action.payload ? action.payload.nextPage : null,
        prevPage: action.payload ? action.payload.prevPage : null,
        loading: false,
        error: "",
      };
    }
    case PlayingActionTypes.INITQUEUE: {
      return {
        ...state,
        queue: action.payload,
        loading: false,
        error: "",
      };
    }
    case PlayingActionTypes.INITHISTORY: {
      return {
        ...state,
        history: action.payload,
        loading: false,
        error: "",
      };
    }
    case PlayingActionTypes.INITSELECTALBUMS_WAITING: {
      return {
        ...state,
        loading: action.payload,
      };
    }
    case PlayingActionTypes.SETPLAYING: {
      let queue = state.queue;
      if (queue) {
        queue.isPlay = action.payload;
      }
      return {
        ...state,
        queue: queue,
      };
    }
    case PlayingActionTypes.INITSELECTALBUMS_ERROR: {
      return {
        ...state,
        error:
          action.payload === undefined || action.payload === null
            ? DefaultServerError
            : action.payload,
        loading: false,
      };
    }

    case PlayingActionTypes.INITSELECTALBUMS_CLEAR: {
      return {
        ...state,
        album: null,
        playlist: null,
        queue: null,
        tracks: null,
        loading: false,
        error: "",
      };
    }

    case PlayingActionTypes.CLEARQUEUE: {
      return {
        ...state,
        queue: null,
      };
    }
    case PlayingActionTypes.CLEARHISTORY: {
      return {
        ...state,
        history: null,
      };
    }

    case PlayingActionTypes.CLEARTRACKS: {
      return {
        ...state,
        tracks: null,
      };
    }
    default:
      return state;
  }
};
