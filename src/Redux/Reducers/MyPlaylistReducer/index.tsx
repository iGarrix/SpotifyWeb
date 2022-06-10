import { IMyPlaylistStateState, MyPlaylistAction, MyPlaylistActionTypes } from "./types";


const inialState: IMyPlaylistStateState = {
  playlists: null,
  loading: false,
  error: "",
  prevPage: null,
  nextPage: null
};

export const myPlaylistReducer = (
  state = inialState,
  action: MyPlaylistAction
): IMyPlaylistStateState => {
  switch (action.type) {
    case MyPlaylistActionTypes.INITMYPLAYLIST: {
      return {
        ...state,
        playlists: action.payload ? action.payload.pageables : [],
        prevPage: action.payload ? action.payload.prevPage : null,
        nextPage: action.payload ? action.payload.nextPage : null,
        loading: false,
        error: "",
      };
    }
    case MyPlaylistActionTypes.ADDMYPLAYLIST: {
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
    case MyPlaylistActionTypes.INITMYPLAYLIST_WAITING: {
      return {
        ...state,
        loading: action.payload,
      };
    }
    case MyPlaylistActionTypes.INITMYPLAYLIST_ERROR: {
      return {
        ...state,
        error:
          action.payload === undefined || action.payload === null
            ? "Server error"
            : action.payload,
        loading: false,
      };
    }

    case MyPlaylistActionTypes.INITMYPLAYLIST_CLEAR: {
      return {
        ...state,
        playlists: null,
        loading: false,
        error: "",
      };
    }

    default:
      return state;
  }
};
