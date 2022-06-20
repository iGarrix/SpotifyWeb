import { IPagableResponse, IUser } from "../../../types";
import { IPagableMyAlbumItem } from "../MyAlbumReducer/types";

export enum PlayingActionTypes {
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
    create: Date,
}

export interface ITrackResponse {
    track: ITrack | null,
    trackCreators: IUser[] | null,
}

export interface IQueue {
    soundobjs : ITrackResponse[],
    isPlay: boolean,
}

export interface IPlayingStateState {
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

export interface InitPlayingAction {
    type: PlayingActionTypes.INITSELECTALBUM;
    payload: IPagableMyAlbumItem | null;
}
export interface InitPlayingTrackAction {
    type: PlayingActionTypes.INITSELECTALBUMTRACKS;
    payload: IPagableResponse | null;
}
export interface InitQueueAction {
    type: PlayingActionTypes.INITQUEUE;
    payload: IQueue | null;
}
export interface InitPlayingWaitAction {
    type: PlayingActionTypes.INITSELECTALBUMS_WAITING;
    payload: boolean;
}
export interface InitPlayingErrorAction {
    type: PlayingActionTypes.INITSELECTALBUMS_ERROR;
    payload: string;
}
export interface InitPlayingClearAction {
    type: PlayingActionTypes.INITSELECTALBUMS_CLEAR;
}
export interface ClearQueueAction {
    type: PlayingActionTypes.CLEARQUEUE;
}
export interface ClearTracksAction {
    type: PlayingActionTypes.CLEARTRACKS;
}

export type PlayingAction =
InitPlayingAction |
InitPlayingTrackAction |
InitQueueAction |
InitPlayingWaitAction |
InitPlayingErrorAction |
InitPlayingClearAction |
ClearQueueAction |
ClearTracksAction;