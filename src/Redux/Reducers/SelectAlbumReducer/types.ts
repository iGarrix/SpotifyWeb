import { IPagableResponse } from "../../../types";
import { IAlbum, IPagableMyAlbumItem } from "../MyAlbumReducer/types";

export enum SelectAlbumActionTypes {
    INITSELECTALBUM = "INITSELECTALBUM",
    INITSELECTALBUMTRACKS = "INITSELECTALBUMTRACKS",
    INITSELECTTRACKS = "INITSELECTTRACKS",
    INITSELECTALBUMS_WAITING = "INITSELECTALBUMS_WAITING",
    INITSELECTALBUMS_ERROR = "INITSELECTALBUMS_ERROR",
    INITSELECTALBUMS_CLEAR = "INITSELECTALBUMS_CLEAR",
    CLEARSELECTTRACK = "CLEARSELECTTRACK",
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
    tracks: ITrackResponse[] | null,
    selectTrack: ITrackResponse | null,
    prevPage: number | null,
    nextPage: number | null,
    loading: boolean;
    error: string;
}

export interface IGetTracksRequest {
    albomId: string,
    page: number,
}

export interface IGetTracksResponse {
    track: ITrack | null,
    trackCreators: string | null;
}

export interface InitSelectAlbumAction {
    type: SelectAlbumActionTypes.INITSELECTALBUM;
    payload: IPagableMyAlbumItem | null;
}
export interface InitSelectAlbumTrackAction {
    type: SelectAlbumActionTypes.INITSELECTALBUMTRACKS;
    payload: IPagableResponse | null;
}
export interface InitSelectTrackAction {
    type: SelectAlbumActionTypes.INITSELECTTRACKS;
    payload: ITrackResponse | null;
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
export interface ClearSelectTrackAction {
    type: SelectAlbumActionTypes.CLEARSELECTTRACK;
}

export type SelectAlbumAction =
InitSelectAlbumAction |
InitSelectAlbumTrackAction |
InitSelectTrackAction |
InitSelectAlbumWaitAction |
InitSelectAlbumErrorAction |
InitSelectAlbumClearAction |
ClearSelectTrackAction;