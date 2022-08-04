
import { ISongData, IUploadStateState, UploadActionTypes, UploadingAction } from "./types";


const inialState: IUploadStateState = {
    singledata: null,
    albumdata: null,
    singlefile: null,
    albumfiles: null,
    uploadedAlbumId: null,
    loading: false,
    error: "",
};

export const uploadReducer = (
    state = inialState,
    action: UploadingAction
): IUploadStateState => {
    switch (action.type) {
        case UploadActionTypes.INITSINGLEDATA: {
            return {
                ...state,
                singledata: action.payload,
                loading: false,
                error: "",
            };
        }
        case UploadActionTypes.INITALBUMDATA: {
            return {
                ...state,
                albumdata: action.payload,
                loading: false,
                error: "",
            };
        }
        case UploadActionTypes.INITSINGLEFILE: {
            return {
                ...state,
                singlefile: action.payload,
                loading: false,
                error: "",
            };
        }
        case UploadActionTypes.INITALBUMID: {
            return {
                ...state,
                uploadedAlbumId: action.payload,
                loading: false,
                error: "",
            };
        }
        case UploadActionTypes.INITALBUMFILES: {
            return {
                ...state,
                albumfiles: action.payload,
                loading: false,
                error: "",
            };
        }
        case UploadActionTypes.UPLOADREMOVEALBUMFILE: {
            return {
                ...state,
                albumfiles: state.albumfiles ? state.albumfiles.filter(f => f.name !== action.payload.name) : [],
                loading: false,
                error: "",
            };
        }
        case UploadActionTypes.INITALBUMMOREFILES: {
            const tmpPayload : ISongData[]  = [];
            console.log(state.albumfiles)
            action.payload?.forEach(f => {
                if (state.albumfiles && state.albumfiles.findIndex(ff => ff.file.name === f.name) < 0) {
                    tmpPayload.push(f);
                }
            })
            const arr = state.albumfiles && tmpPayload ? [...state.albumfiles, ...tmpPayload] : [];
            return {
                ...state,
                albumfiles: arr,     
                loading: false,
                error: "",
            };
        }
        case UploadActionTypes.UPLOAD_WAITING: {
            return {
                ...state,
                loading: action.payload,
            };
        }
        case UploadActionTypes.UPLOAD_ERROR: {
            return {
                ...state,
                error:
                    action.payload === undefined || action.payload === null
                        ? "Failed upload"
                        : action.payload,
                loading: false,
            };
        }

        case UploadActionTypes.UPLOAD_CLEARALL: {
            return {
                ...state,
                singledata: null,
                albumdata: null,
                albumfiles: null,
                uploadedAlbumId: null,
                singlefile: null,
                loading: false,
                error: "",
            };
        }

        default:
            return state;
    }
};
