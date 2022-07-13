import { IPagableResponse, IUser } from "../../../types";
import { IPagableMyAlbumItem } from "../MyAlbumReducer/types";
import { IPagableMyPlaylistItem } from "../MyPlaylistReducer/types";
import { ITrackResponse } from "../PlayingReducer/types";

export enum MyMediaLibraryActionTypes {
  INITMYMEDIALIBRARYSINGLE = "INITMYMEDIALIBRARYSINGLE",
  ADDMYMEDIALIBRARYSINGLE = "ADDMYMEDIALIBRARYSINGLE",
  INITMYMEDIALIBRARYALBUMS = "INITMYMEDIALIBRARYALBUMS",
  ADDMYMEDIALIBRARYALBUMS = "ADDMYMEDIALIBRARYALBUMS",
  INITMYMEDIALIBRARYPLAYLISTS = "INITMYMEDIALIBRARYPLAYLISTS",
  ADDMYMEDIALIBRARYPLAYLISTS = "ADDMYMEDIALIBRARYPLAYLISTS",
  INITMYMEDIALIBRARYARTISTS = "INITMYMEDIALIBRARYARTISTS",
  ADDMYMEDIALIBRARYARTISTS = "ADDMYMEDIALIBRARYARTISTS",
  INITMYMEDIALIBRARY_WAITING = "INITMYMEDIALIBRARY_WAITING",
  INITMYMEDIALIBRARY_ERROR = "INITMYMEDIALIBRARY_ERROR",
  INITMYMEDIALIBRARY_CLEAR = "INITMYMEDIALIBRARY_CLEAR",
}

export interface IMyMediaLibrarySingleStateState {
  singles: ITrackResponse[] | null,
  albums: IPagableMyAlbumItem[] | null,
  playlists: IPagableMyPlaylistItem[] | null,
  artists: IUser[] | null,
  prevPage: number | null,
  nextPage: number | null,
  loading: boolean;
  error: string;
}

export interface InitMyMediaLibrarySingleAction {
  type: MyMediaLibraryActionTypes.INITMYMEDIALIBRARYSINGLE;
  payload: IPagableResponse | null;
}
export interface AddMyMediaLibrarySingleAction {
  type: MyMediaLibraryActionTypes.ADDMYMEDIALIBRARYSINGLE;
  payload: IPagableResponse | null;
}
export interface InitMyMediaLibraryAlbumsAction {
  type: MyMediaLibraryActionTypes.INITMYMEDIALIBRARYALBUMS;
  payload: IPagableResponse | null;
}
export interface AddMyMediaLibraryAlbumsAction {
  type: MyMediaLibraryActionTypes.ADDMYMEDIALIBRARYALBUMS;
  payload: IPagableResponse | null;
}
export interface InitMyMediaLibraryPlaylistsAction {
  type: MyMediaLibraryActionTypes.INITMYMEDIALIBRARYPLAYLISTS;
  payload: IPagableResponse | null;
}
export interface AddMyMediaLibraryPlaylistsAction {
  type: MyMediaLibraryActionTypes.ADDMYMEDIALIBRARYPLAYLISTS;
  payload: IPagableResponse | null;
}
export interface InitMyMediaLibraryArtistsAction {
  type: MyMediaLibraryActionTypes.INITMYMEDIALIBRARYARTISTS;
  payload: IPagableResponse | null;
}
export interface AddMyMediaLibraryArtistsAction {
  type: MyMediaLibraryActionTypes.ADDMYMEDIALIBRARYARTISTS;
  payload: IPagableResponse | null;
}
export interface InitMyMediaLibrarySingleWaitAction {
  type: MyMediaLibraryActionTypes.INITMYMEDIALIBRARY_WAITING;
  payload: boolean;
}
export interface InitMyMediaLibrarySingleErrorAction {
  type: MyMediaLibraryActionTypes.INITMYMEDIALIBRARY_ERROR;
  payload: string;
}
export interface InitMyMediaLibrarySingleClearAction {
  type: MyMediaLibraryActionTypes.INITMYMEDIALIBRARY_CLEAR;
}

export type MyMediaLibraryAction =
  | InitMyMediaLibrarySingleAction
  | AddMyMediaLibrarySingleAction
  | InitMyMediaLibraryAlbumsAction
  | AddMyMediaLibraryAlbumsAction
  | InitMyMediaLibraryPlaylistsAction
  | AddMyMediaLibraryPlaylistsAction
  | InitMyMediaLibraryArtistsAction
  | AddMyMediaLibraryArtistsAction
  | InitMyMediaLibrarySingleWaitAction
  | InitMyMediaLibrarySingleErrorAction
  | InitMyMediaLibrarySingleClearAction;