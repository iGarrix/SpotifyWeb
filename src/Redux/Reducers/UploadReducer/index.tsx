import { IUploadStateState, UploadActionTypes, UploadingAction } from "./types";


const inialState: IUploadStateState = {
    singledata: null,
    albumdata: null,
    singlefile: null,
    albumfiles: null,
    loading: true,
    error: ""
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
        case UploadActionTypes.INITALBUMFILES: {
            return {
                ...state,
                albumfiles: action.payload,
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
                singlefile: null,
                loading: false,
                error: "",
            };
        }

        default:
            return state;
    }
};
