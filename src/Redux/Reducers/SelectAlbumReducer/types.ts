import { IPagableResponse } from "../../../types";
import { IPagableMyAlbumItem } from "../MyAlbumReducer/types";

export enum SelectAlbumActionTypes {
    INITSELECTALBUM = "INITSELECTALBUM",
    INITSELECTALBUMS_WAITING = "INITSELECTALBUMS_WAITING",
    INITSELECTALBUMS_ERROR = "INITSELECTALBUMS_ERROR",
    INITSELECTALBUMS_CLEAR = "INITSELECTALBUMS_CLEAR",
    INITSELECTALBUMTRACKS = "INITSELECTALBUMTRACKS",
    INITQUEUE = "INITQUEUE",
    CLEARQUEUE = "CLEARQUEUE",
    CLEARTRACKS = "CLEARTRACKS",
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

export interface IQueue {
    soundobjs : ITrackResponse[],
    isPlay: boolean,
}

export interface ISelectAlbumStateState {
    album: IPagableMyAlbumItem | null;
    tracks: ITrackResponse[] | null,
    queue: IQueue | null,
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
export interface InitQueueAction {
    type: SelectAlbumActionTypes.INITQUEUE;
    payload: IQueue | null;
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
export interface ClearQueueAction {
    type: SelectAlbumActionTypes.CLEARQUEUE;
}
export interface ClearTracksAction {
    type: SelectAlbumActionTypes.CLEARTRACKS;
}

export type SelectAlbumAction =
InitSelectAlbumAction |
InitSelectAlbumTrackAction |
InitQueueAction |
InitSelectAlbumWaitAction |
InitSelectAlbumErrorAction |
InitSelectAlbumClearAction |
ClearQueueAction |
ClearTracksAction;