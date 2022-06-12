import { IPagableResponse } from "../../../types";
import { IAlbum, IPagableMyAlbumItem } from "../MyAlbumReducer/types";

export enum SelectAlbumActionTypes {
    INITSELECTALBUM = "INITSELECTALBUM",
    INITSELECTTRACKS = "INITSELECTTRACKS",
    INITSELECTALBUMS_WAITING = "INITSELECTALBUMS_WAITING",
    INITSELECTALBUMS_ERROR = "INITSELECTALBUMS_ERROR",
    INITSELECTALBUMS_CLEAR = "INITSELECTALBUMS_CLEAR",
}

export interface ITrack {
    returnId: string,
    name: string,
    duration: string,
    image: string,
    tracknameid: string,
}

export interface ITrackResponse {
    track: ITrack | null,
    trackCreators: string[] | null,
}

export interface ISelectAlbumStateState {
    album: IPagableMyAlbumItem | null;
    tracks: ITrackResponse[] | null
    prevPage: number | null,
    nextPage: number | null,
    loading: boolean;
    error: string;
}

export interface InitSelectAlbumAction {
    type: SelectAlbumActionTypes.INITSELECTALBUM;
    payload: IPagableMyAlbumItem | null;
}
export interface InitSelectTrackAction {
    type: SelectAlbumActionTypes.INITSELECTTRACKS;
    payload: IPagableResponse | null;
}
export interface InitSelectAlbumWaitAction {
    type: SelectAlbumActionTypes.INITSELECTALBUMS_WAITING;
    payload: boolean;
}
export interface InitSelectAlbumErrorAction {
    type: SelectAlbumActionTypes.INITSELECTALBUMS_ERROR;
    payload: string;
}
export interface InitSelectAlbumClearAction {
    type: SelectAlbumActionTypes.INITSELECTALBUMS_CLEAR;
}

export type SelectAlbumAction =
InitSelectAlbumAction |
InitSelectTrackAction |
InitSelectAlbumWaitAction |
InitSelectAlbumErrorAction |
InitSelectAlbumClearAction;