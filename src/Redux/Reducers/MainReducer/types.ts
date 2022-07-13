import { IPagableResponse, IUser } from "../../../types";
import { IPagableMyAlbumItem } from "../MyAlbumReducer/types";
import { ITrackResponse } from "../PlayingReducer/types";

export enum MainActionTypes {
    INITWEEKLYALBUM = "INITWEEKLYALBUM",
    INITWEEKLYARTIST = "INITWEEKLYARTIST",
    INITWEEKLYSONGSALBUM = "INITWEEKLYSONGSPLAYLIST",
    ADDWEEKLYALBUM = "ADDWEEKLYALBUM",
    ADDWEEKLYARTIST = "ADDWEEKLYARTIST",
    ADDWEEKLYSONGSALBUM = "ADDWEEKLYSONGSPLAYLIST",
    MAIN_WAITING = "MAIN_WAITING",
    MAIN_ERROR = "MAIN_ERROR",
    MAINCLEAR = "MAINCLEAR",
}

export interface IMainState {
    artists: IUser[] | null;
    tracks: ITrackResponse[] | null,
    albums: IPagableMyAlbumItem[] | null,
    prevPage: number | null,
    nextPage: number | null,
    loading: boolean;
    error: string;
}

export interface InitMainAlbumAction {
    type: MainActionTypes.INITWEEKLYALBUM;
    payload: IPagableResponse | null;
}
export interface InitMainArtistAction {
    type: MainActionTypes.INITWEEKLYARTIST;
    payload: IPagableResponse | null;
}
export interface InitMainArtistAction {
    type: MainActionTypes.INITWEEKLYARTIST;
    payload: IPagableResponse | null;
}
export interface InitMainSongsAlbumAction {
    type: MainActionTypes.INITWEEKLYSONGSALBUM;
    payload: IPagableResponse | null;
}
export interface AddMainAlbumAction {
    type: MainActionTypes.ADDWEEKLYALBUM;
    payload: IPagableResponse | null;
}
export interface AddMainArtistAction {
    type: MainActionTypes.ADDWEEKLYARTIST;
    payload: IPagableResponse | null;
}
export interface AddMainSongsAlbumAction {
    type: MainActionTypes.ADDWEEKLYSONGSALBUM;
    payload: IPagableResponse | null;
}
export interface InitMainWaitAction {
    type: MainActionTypes.MAIN_WAITING;
    payload: boolean;
}
export interface InitMainErrorAction {
    type: MainActionTypes.MAIN_ERROR;
    payload: string;
}
export interface InitMainlearAction {
    type: MainActionTypes.MAINCLEAR;
}

export type MainAction =
    | InitMainAlbumAction
    | InitMainArtistAction
    | InitMainSongsAlbumAction
    | InitMainWaitAction
    | InitMainErrorAction
    | InitMainlearAction
    | AddMainAlbumAction
    | AddMainArtistAction
    | AddMainSongsAlbumAction;