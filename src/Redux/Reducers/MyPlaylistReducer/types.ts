import { IPagableResponse, IUser } from "../../../types";

export enum MyPlaylistActionTypes {
  INITMYPLAYLIST = "INITMYPLAYLIST",
  ADDMYPLAYLIST = "ADDMYPLAYLIST",
  INITMYSEARCHPLAYLIST = "INITMYSEARCHPLAYLIST",
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
  views: number,
}

export interface IGenre {
  name: string,
  image: string,
}

export interface IPagableMyPlaylistItem {
  playlistDto: IPlaylist | null,
  playlistGenres: IGenre | null,
  playlistCreator: IUser | null,
  songs: number,
  isLiked: boolean,
}

export interface IMyPlaylistStateState {
  playlists: IPagableMyPlaylistItem[] | null;
  searchPlaylists: IPagableMyPlaylistItem[] | null,
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
export interface InitMySearchPlaylistAction {
  type: MyPlaylistActionTypes.INITMYSEARCHPLAYLIST;
  payload: Array<IPagableMyPlaylistItem> | null;
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
  | InitMySearchPlaylistAction
  | InitMyPlaylistErrorAction
  | InitMyPlaylistClearAction
  | AddMyPlaylistAction;

export interface IChangePlaylistForm {
  newName: string,
  newStatus: string,
  newImage: string,
}

export interface IChangePlaylistRequest {
  response: IPlaylistFindRequest,
  newName: string,
  newStatus: string,
}

export interface IChangePlaylistImageRequest {
  response: IPlaylistFindRequest,
  image: string,
}

export interface IPlaylistFindRequest {
  findPlaylistName: string,
  findPlaylistCreatorEmail: string,
}
export interface IRemoveTrackPlaylistRequest {
  playlistFind: IPlaylistFindRequest,
  trackId: string,
}

export interface ICreatePlaylistRequest {
  userEmail: string,
  name: string,
  image: string,
  accessStatus: string,
}

export interface ISubscribePlaylistRequest {
  userEmail: string,
  playlistFind: IPlaylistFindRequest,
}

export interface IUnsubscribePlaylistRequest {
  findSubscriberEmail: string,
  playlistFind: IPlaylistFindRequest,
} 