import { IHistory, IPagableResponse, IUser } from "../../../types";
import { IPagableMyAlbumItem } from "../MyAlbumReducer/types";
import { IPagableMyPlaylistItem, IPlaylistFindRequest } from "../MyPlaylistReducer/types";

export enum PlayingActionTypes {
    INITSELECTALBUM = "INITSELECTALBUM",
    INITSELECTPLAYLIST = "INITSELECTPLAYLIST",
    INITSELECTALBUMS_WAITING = "INITSELECTALBUMS_WAITING",
    INITSELECTALBUMS_ERROR = "INITSELECTALBUMS_ERROR",
    INITSELECTALBUMS_CLEAR = "INITSELECTALBUMS_CLEAR",
    INITSELECTALBUMTRACKS = "INITSELECTALBUMTRACKS",
    INITEDALBUMTRACKS = "INITEDALBUMTRACKS",
    INITQUEUE = "INITQUEUE",
    SETPLAYING = "SETPLAYING",
    CLEARQUEUE = "CLEARQUEUE",
    INITHISTORY = "INITHISTORY",
    CLEARHISTORY = "CLEARHISTORY",
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
    trackCreators: IUser[],
    isLiked: boolean,
}

export interface IQueue {
    soundobjs: ITrackResponse[],
    isPlay: boolean,
    playedIndex: number,
}

export interface IPlayingStateState {
    album: IPagableMyAlbumItem | null,
    playlist: IPagableMyPlaylistItem | null,
    tracks: ITrackResponse[] | null,
    queue: IQueue | null,
    history: IHistory | null,
    prevPage: number | null,
    nextPage: number | null,
    loading: boolean;
    error: string;
}

export interface IGetTracksRequest {
    albomId: string,
    page: number,
}

export interface IGetPlaylistTracksRequest {
    returnId: string,
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
export interface InitPlayingPlaylistAction {
    type: PlayingActionTypes.INITSELECTPLAYLIST;
    payload: IPagableMyPlaylistItem | null;
}
export interface InitPlayingTrackAction {
    type: PlayingActionTypes.INITSELECTALBUMTRACKS;
    payload: IPagableResponse | null;
}
export interface InitedPlayingTrackAction {
    type: PlayingActionTypes.INITEDALBUMTRACKS;
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

export interface InitHistoryAction {
    type: PlayingActionTypes.INITHISTORY;
    payload: IHistory | null;
}
export interface ClearHistoryAction {
    type: PlayingActionTypes.CLEARHISTORY;
}
export interface SetPlayingAction {
    type: PlayingActionTypes.SETPLAYING;
    payload: boolean,
}

export type PlayingAction =
    InitPlayingAction |
    InitPlayingTrackAction |
    InitedPlayingTrackAction |
    InitQueueAction |
    InitPlayingWaitAction |
    InitPlayingErrorAction |
    InitPlayingClearAction |
    ClearQueueAction |
    ClearTracksAction |
    InitHistoryAction |
    ClearHistoryAction |
    SetPlayingAction |
    InitPlayingPlaylistAction;



export interface IAddTrackToPlaylistRequest {
    playlistFind: IPlaylistFindRequest,
    trackId: string,
}