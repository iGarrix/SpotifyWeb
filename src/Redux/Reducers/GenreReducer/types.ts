import { IPagableResponse } from "../../../types";
import { IPagableMyPlaylistItem, IPlaylist } from "../MyPlaylistReducer/types";

export enum MyGenreActionTypes {
  INITGENRE = "INITGENRE",
  ADDGENRE = "ADDGENRE",
  INITGENREPLAYLIST = "INITGENREPLAYLIST",
  ADDGENREPLAYLIST = "ADDGENREPLAYLIST",
  INITGENRE_WAITING = "INITGENRE_WAITING",
  INITGENRE_ERROR = "INITGENRE_ERROR",
  INITGENRE_CLEAR = "INITGENRE_CLEAR",
  INITGENREPLAYLIST_CLEAR = "INITGENREPLAYLIST_CLEAR"
}

export interface IGenre {
  name: string,
  image: string,
}

export interface IPagableMyGenreItem {
  genre: IGenre | null
}

export interface IGenreStateState {
  genres: IGenre[] | null,
  playlists: IPagableMyPlaylistItem[] | null,
  prevPage: number | null,
  nextPage: number | null,
  loading: boolean,
  error: string,
}

export interface IGetAllGenreRequest {
  page: number
}

export interface InitGenreAction {
  type: MyGenreActionTypes.INITGENRE;
  payload: IPagableResponse | null;
}
export interface AddGenreAction {
  type: MyGenreActionTypes.ADDGENRE;
  payload: IPagableResponse | null;
}

export interface InitGenrePlaylistAction {
  type: MyGenreActionTypes.INITGENREPLAYLIST;
  payload: IPagableResponse | null;
}
export interface AddGenrePlaylistAction {
  type: MyGenreActionTypes.ADDGENREPLAYLIST;
  payload: IPagableResponse | null;
}
export interface InitGenreWaitAction {
  type: MyGenreActionTypes.INITGENRE_WAITING;
  payload: boolean;
}
export interface InitGenreErrorAction {
  type: MyGenreActionTypes.INITGENRE_ERROR;
  payload: string;
}
export interface InitGenreClearAction {
  type: MyGenreActionTypes.INITGENRE_CLEAR;
}

export interface InitGenrePlayistClearAction {
  type: MyGenreActionTypes.INITGENREPLAYLIST_CLEAR;
}

export type MyGenreAction =
  | InitGenreAction
  | InitGenrePlaylistAction
  | InitGenreWaitAction
  | InitGenreErrorAction
  | InitGenreClearAction
  | AddGenreAction
  | InitGenrePlayistClearAction
  | AddGenrePlaylistAction;