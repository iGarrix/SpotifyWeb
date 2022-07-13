import { IPagableResponse } from "../../../types";
import { ITrackResponse } from "../PlayingReducer/types";

export enum SearchActionTypes {
    INITSEARCHALL = "INITSEARCHALL",
    ADDSEARCHPROFILE = "ADDSEARCHPROFILE",
    INITSEARCHPROFILE = "INITSEARCHPROFILE",
    ADDSEARCHARTISTS = "ADDSEARCHARTISTS",
    INITSEARCHARTISTS = "INITSEARCHARTISTS",
    ADDSEARCHPLAYLIST = "ADDSEARCHPLAYLIST",
    INITSEARCHPLAYLIST = "INITSEARCHPLAYLIST",
    ADDSEARCHALBUM = "ADDSEARCHALBUM",
    INITSEARCHALBUM = "INITSEARCHALBUM",
    ADDSEARCHTRACK = "ADDSEARCHTRACK",
    INITSEARCHTRACK = "INITSEARCHTRACK",
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
    profiles: Array<IUserSearch> | null,
    artists: Array<IUserSearch> | null,
    playlists: Array<IPlaylistSearch> | null,
    albums: Array<IAlbumSearch> | null,
    tracks: Array<ITrackResponse> | null,
    prevPage: number | null,
    nextPage: number | null,
    loading: boolean;
    error: string;
}

export interface InitSearchAllAction {
    type: SearchActionTypes.INITSEARCHALL;
    payload: ISearchAllModel | null;
}
export interface InitSearchProfileActions{
    type: SearchActionTypes.INITSEARCHPROFILE;
    payload: IPagableResponse | null;
}

export interface AddSearchProfileAction{
    type: SearchActionTypes.ADDSEARCHPROFILE;
    payload: IPagableResponse | null;
}
export interface InitSearchArtistsActions{
    type: SearchActionTypes.INITSEARCHARTISTS;
    payload: IPagableResponse | null;
}

export interface AddSearchArtistsAction{
    type: SearchActionTypes.ADDSEARCHARTISTS;
    payload: IPagableResponse | null;
}
export interface InitSearchPlaylistActions{
    type: SearchActionTypes.INITSEARCHPLAYLIST;
    payload: IPagableResponse | null;
}

export interface AddSearchPlaylistAction{
    type: SearchActionTypes.ADDSEARCHPLAYLIST;
    payload: IPagableResponse | null;
}
export interface InitSearchAlbumsActions{
    type: SearchActionTypes.INITSEARCHALBUM;
    payload: IPagableResponse | null;
}

export interface AddSearchAlbumsAction{
    type: SearchActionTypes.ADDSEARCHALBUM;
    payload: IPagableResponse | null;
}

export interface InitSearchTrackActions{
    type: SearchActionTypes.INITSEARCHTRACK;
    payload: IPagableResponse | null;
}

export interface AddSearchTrackAction{
    type: SearchActionTypes.ADDSEARCHTRACK;
    payload: IPagableResponse | null;
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
    | InitSearchProfileActions
    | AddSearchProfileAction
    | InitSearchArtistsActions
    | AddSearchArtistsAction
    | InitSearchPlaylistActions
    | AddSearchPlaylistAction
    | InitSearchAlbumsActions
    | AddSearchAlbumsAction
    | InitSearchTrackActions
    | AddSearchTrackAction
    | InitSearchWaitAction
    | InitSearchErrorAction
    | InitSearchlearAction;