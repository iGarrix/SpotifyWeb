import { IMyAlbumStateState, MyAlbumAction, MyAlbumActionTypes } from "./types";

const inialState: IMyAlbumStateState = {
  albums: null,
  loading: false,
  error: "",
  prevPage: null,
  nextPage: null,
};

export const myAlbumsReducer = (
  state = inialState,
  action: MyAlbumAction
): IMyAlbumStateState => {
  switch (action.type) {
    case MyAlbumActionTypes.INITMYALBUM: {
      return {
        ...state,
        albums: action.payload ? action.payload.pageables : [],
        prevPage: action.payload ? action.payload.prevPage : null,
        nextPage: action.payload ? action.payload.nextPage : null,
        loading: false,
        error: "",
      };
    }
    case MyAlbumActionTypes.ADDMYALBUM: {
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
    case MyAlbumActionTypes.INITMYALBUM_WAITING: {
      return {
        ...state,
        loading: action.payload,
      };
    }
    case MyAlbumActionTypes.INITMYALBUM_ERROR: {
      return {
        ...state,
        error:
          action.payload === undefined || action.payload === null
            ? "Server error"
            : action.payload,
        loading: false,
      };
    }

    case MyAlbumActionTypes.INITMYALBUM_CLEAR: {
      return {
        ...state,
        albums: null,
        loading: false,
        error: "",
      };
    }

    default:
      return state;
  }
};
