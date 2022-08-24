import * as Yup from "yup";

export enum UploadActionTypes {
    INITSINGLEDATA = "INITSINGLEDATA",
    INITSINGLEFILE = "INITSINGLEFILE",
    INITALBUMDATA = "INITALBUMDATA",
    INITALBUMFILES = "INITALBUMFILES",
    INITALBUMMOREFILES = "INITALBUMMOREFILES",
    UPLOADREMOVEALBUMFILE = "UPLOADREMOVEALBUMFILE",
    INITALBUMID = "INITALBUMID",
    UPLOAD_CLEARALL = "UPLOAD_CLEARALL",
    UPLOAD_ERROR = "UPLOAD_ERROR",
    UPLOAD_WAITING = "UPLOAD_WAITING",
}

export interface ISingleData {
    title: string,
    image: string,
}
export interface IAlbumData {
    title: string,
    image: string,
    description: string,
}

export interface ISongData {
    file: File,
    name: string,
}

export interface IUploadStateState {
    singledata: ISingleData | null,
    albumdata: IAlbumData | null,
    singlefile: File | null,
    albumfiles: Array<ISongData> | null,
    uploadedAlbumId: string | null,
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
    payload: Array<ISongData> | null;
}
export interface UploadAlbumMoreFilesAction {
    type: UploadActionTypes.INITALBUMMOREFILES;
    payload: Array<ISongData> | null;
}
export interface UploadRemoveAlbumFileAction {
    type: UploadActionTypes.UPLOADREMOVEALBUMFILE;
    payload: ISongData;
}
export interface InitAlbumIdAction {
    type: UploadActionTypes.INITALBUMID;
    payload: string;
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
    | UploadAlbumMoreFilesAction
    | UploadRemoveAlbumFileAction
    | InitAlbumIdAction
    | UploadWaitingAction
    | UploadErrorAction
    | UploadClearAction;


export const creatoremailValidate = Yup.object({
    email: Yup.string().email("Email is invalid").required("Email is required"),
});
export const singleDataValidate = Yup.object({
    title: Yup.string().required("Title is required").min(3, "Title too small, 3 symbols required").max(30, "Title too large"),
});
export const albumDataValidate = Yup.object({
    title: Yup.string().required("Title is required").min(3, "Title too small, 3 symbols required").max(30, "Title too large"),
    description: Yup.string().required("Description is required").min(10, "Description too small, 10 symbols required").max(50, "Description too large"),
});

export interface ISingleCreateRequest {
    name: string,
    image: File,
    sound: File,
    creatorEmail: string,
}
export interface IAlbumCreateRequest {
    userCreatorEmails: Array<string>,
    name: string,
    releasealbom: Date | null,
    image: File,
    templateimage: File,
    description: string,
    isSingle: boolean,
}

export interface IAddTrackToAlbumRequest {
    id: string,
    name: string,
    image: File,
    sound: File,
    userCreatorEmails: Array<string>
}

export interface IAddInviteRequest {
    receiverUsername: string,
    albumId: string,
}