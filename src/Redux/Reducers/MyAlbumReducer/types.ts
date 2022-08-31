import { IPagableResponse, IUser } from "../../../types";

export enum MyAlbumActionTypes {
  INITMYALBUM = "INITMYALBUM",
  ADDMYALBUM = "ADDMYALBUM",
  INITMYALBUM_WAITING = "INITMYALBUM_WAITING",
  INITMYALBUM_ERROR = "INITMYALBUM_ERROR",
  INITMYALBUM_CLEAR = "INITMYALBUM_CLEAR",
}

export interface IAlbum {
  returnId: string,
  name: string,
  releasealbom: Date | null,
  image: string,
  templateimage: string,
  description: string,
  views: number,
}

export interface IPagableMyAlbumItem {
  albomDto: IAlbum | null,
  creatorsAlbom: IUser[] | null,
  songs: number,
  isLiked: boolean,
}

export interface IMyAlbumStateState {
  albums: IPagableMyAlbumItem[] | null;
  prevPage: number | null,
  nextPage: number | null,
  loading: boolean;
  error: string;
}

export interface IGetAllMyAlbumRequest {
  email: string,
  page: number
}

export interface InitMyAlbumAction {
  type: MyAlbumActionTypes.INITMYALBUM;
  payload: IPagableResponse | null;
}
export interface AddMyAlbumAction {
  type: MyAlbumActionTypes.ADDMYALBUM;
  payload: IPagableResponse | null;
}
export interface InitMyAlbumWaitAction {
  type: MyAlbumActionTypes.INITMYALBUM_WAITING;
  payload: boolean;
}
export interface InitMyAlbumErrorAction {
  type: MyAlbumActionTypes.INITMYALBUM_ERROR;
  payload: string;
}
export interface InitMyAlbumClearAction {
  type: MyAlbumActionTypes.INITMYALBUM_CLEAR;
}

export type MyAlbumAction =
  | InitMyAlbumAction
  | AddMyAlbumAction
  | InitMyAlbumWaitAction
  | InitMyAlbumErrorAction
  | InitMyAlbumClearAction;

export interface IChangeAlbumRequest {
  findReturnId: string,
  newName: string,
  newDescription: string,
}
export interface IChangeImageAlbumRequest {
  findReturnId: string,
  newImage: string,
}
export interface IChangeTemplateImageAlbumRequest {
  findReturnId: string,
  newTemplateimage: string,
}

export interface ISubscribeAlbumRequest {
  findSubscriberEmail: string,
  findAlbomId: string,
}

export interface IUnsubscribeAlbumRequest {
  albomId: string,
  email: string,
}