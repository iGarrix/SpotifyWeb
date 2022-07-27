import * as Yup from "yup";

export enum UploadActionTypes {
    INITSINGLEDATA = "INITSINGLEDATA",
    INITSINGLEFILE = "INITSINGLEFILE",
    INITALBUMDATA = "INITALBUMDATA",
    INITALBUMFILES = "INITALBUMFILES",
    UPLOAD_CLEARALL = "UPLOAD_CLEARALL",
    UPLOAD_ERROR = "UPLOAD_ERROR",
    UPLOAD_WAITING = "UPLOAD_WAITING",
}

export interface ISingleData {
    title: string,
    image: string,
}
export interface IAlbumData {

}


export interface IUploadStateState {
    singledata: ISingleData | null,
    albumdata: IAlbumData | null,
    singlefile: File | null,
    albumfiles: Array<File> | null,
    loading: boolean,
    error: string,
}


export interface UploadSingleDataAction {
    type: UploadActionTypes.INITSINGLEDATA;
    payload: ISingleData;
}
export interface UploadAlbumDataAction {
    type: UploadActionTypes.INITALBUMDATA;
    payload: IAlbumData;
}
export interface UploadSingleFileAction {
    type: UploadActionTypes.INITSINGLEFILE;
    payload: File | null;
}
export interface UploadAlbumFilesAction {
    type: UploadActionTypes.INITALBUMFILES;
    payload: Array<File> | null;
}
export interface UploadWaitingAction {
    type: UploadActionTypes.UPLOAD_WAITING;
    payload: boolean;
}
export interface UploadErrorAction {
    type: UploadActionTypes.UPLOAD_ERROR;
    payload: string;
}
export interface UploadClearAction {
    type: UploadActionTypes.UPLOAD_CLEARALL;
}

export type UploadingAction =
    | UploadSingleDataAction
    | UploadAlbumDataAction
    | UploadSingleFileAction
    | UploadAlbumFilesAction
    | UploadWaitingAction
    | UploadErrorAction
    | UploadClearAction;


export const singleDataValidate = Yup.object({
    title: Yup.string().required("Title is required").min(3, "Title too small, 3 symbols required").max(30, "Title too large"),
});

export interface ISingleCreateRequest {
    name: string,
    image: File,
    sound: File,
    creatorEmail: string,
}