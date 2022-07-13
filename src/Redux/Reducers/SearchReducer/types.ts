import { ITrackResponse } from "../SelectAlbumReducer/types";

export enum SearchActionTypes {
    INITSEARCHALL = "INITSEARCHALL",
    SEARCH_WAITING = "SEARCH_WAITING",
    SEARCH_ERROR = "SEARCH_ERROR",
    SEARCHCLEAR = "SEARCHCLEAR",
}

export interface IUserSearch {
    username: string,
    name: string,
    surname: string,
    avatar: string,
    verifyType: string,
}
// export interface ITrackSearch {
//     id: string,
//     trackId: string,
//     name: string,
//     image: string,
//     duration: string,
//     creators: Array<IUserSearch>,
// }
export interface IPlaylistSearch {
    id: string,
    name: string,
    image: string,
    creator: IUserSearch,
}
export interface IAlbumSearch {
    id: string,
    name: string,
    image: string,
    isSingle: boolean,
    creators: Array<IUserSearch>,
}

export interface ISearchAllModel {
    bestResult: IUserSearch | ITrackResponse | IPlaylistSearch | IAlbumSearch,
    profiles: Array<IUserSearch>,
    artists: Array<IUserSearch>,
    tracks: Array<ITrackResponse>,
    playlists: Array<IPlaylistSearch>,
    albums: Array<IAlbumSearch>,
}

export interface ISearchState {
    searchall: ISearchAllModel | null,
    prevPage: number | null,
    nextPage: number | null,
    loading: boolean;
    error: string;
}

export interface InitSearchAllAction {
    type: SearchActionTypes.INITSEARCHALL;
    payload: ISearchAllModel | null;
}
export interface InitSearchWaitAction {
    type: SearchActionTypes.SEARCH_WAITING;
    payload: boolean;
}
export interface InitSearchErrorAction {
    type: SearchActionTypes.SEARCH_ERROR;
    payload: string;
}
export interface InitSearchlearAction {
    type: SearchActionTypes.SEARCHCLEAR;
}

export type SearchAction =
    | InitSearchAllAction
    | InitSearchWaitAction
    | InitSearchErrorAction
    | InitSearchlearAction;