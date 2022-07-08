import { IPagableResponse, IUser } from "../../../types";

export enum MyPlaylistActionTypes {
  INITMYPLAYLIST = "INITMYPLAYLIST",
  ADDMYPLAYLIST = "ADDMYPLAYLIST",
  INITMYPLAYLIST_WAITING = "INITMYPLAYLIST_WAITING",
  INITMYPLAYLIST_ERROR = "INITMYPLAYLIST_ERROR",
  INITMYPLAYLIST_CLEAR = "INITMYPLAYLIST_CLEAR",
}

export interface IPlaylist {
  returnId: string,
  name: string,
  image: string,
  accessStatus: string,
  create: Date | null,
}

export interface IGenre {
  name: string,
  image: string,
}

export interface IPagableMyPlaylistItem {
  playlistDto: IPlaylist | null,
  playlistGenres: IGenre | null,
  playlistCreator: IUser | null,
  songs: number
}

export interface IMyPlaylistStateState {
  playlists: IPagableMyPlaylistItem[] | null;
  prevPage: number | null,
  nextPage: number | null,
  loading: boolean;
  error: string;
}

export interface IGetAllMyPlaylistRequest {
  email: string,
  page: number
}

export interface InitMyPlaylistAction {
  type: MyPlaylistActionTypes.INITMYPLAYLIST;
  payload: IPagableResponse<IPagableMyPlaylistItem> | null;
}
export interface AddMyPlaylistAction {
  type: MyPlaylistActionTypes.ADDMYPLAYLIST;
  payload: IPagableResponse<IPagableMyPlaylistItem> | null;
}
export interface InitMyPlaylistWaitAction {
  type: MyPlaylistActionTypes.INITMYPLAYLIST_WAITING;
  payload: boolean;
}
export interface InitMyPlaylistErrorAction {
  type: MyPlaylistActionTypes.INITMYPLAYLIST_ERROR;
  payload: string;
}
export interface InitMyPlaylistClearAction {
  type: MyPlaylistActionTypes.INITMYPLAYLIST_CLEAR;
}

export type MyPlaylistAction =
  | InitMyPlaylistAction
  | InitMyPlaylistWaitAction
  | InitMyPlaylistErrorAction
  | InitMyPlaylistClearAction
  | AddMyPlaylistAction;