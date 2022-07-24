import { Dispatch } from "redux";
import { UploadActionTypes, UploadingAction } from "./types";

export const initSingleFile = (file: File | null) => {
    return async (dispatch: Dispatch<UploadingAction>) => {
        dispatch({ type: UploadActionTypes.INITSINGLEFILE, payload: file });
    };
};

export const setUploadLoader = (isload: boolean) => {
    return async (dispatch: Dispatch<UploadingAction>) => {
        dispatch({ type: UploadActionTypes.UPLOAD_WAITING, payload: isload });
    };
};