import { ITrackResponse } from "./Redux/Reducers/SelectAlbumReducer/types";

export enum Theme {
  dark = "dark",
  light = "light",
}

export enum DeviceType {
  mobile = "mobile",
  desktop = "WebBrowser Desktop",
}

export enum VerifyType {
  profile = "Profile",
  artist = "Artist",
  verify = "VerifyProfile",
}

export enum StorageVariables {
  Queue = "queue",
  History = "history",
  Album = "selectAlbum",
  Track = "selectTrack",
  //Single = "selectSingle"
}

export const MinPasswordLenght = 8;
export const DefaultServerError = "The service is temporarily disabled, please try again later";

export interface IUser {
  username: string;
  email: string;
  phone: number;
  emailconfirm: boolean;
  create: Date;
  name: string;
  surname: string;
  birthday: Date;
  gender: string;
  avatar: string;
  background: string;
  country: string;
  verify: string;
  emojie: string;
}

export interface IHistory {
    soundobjs : ITrackResponse[],
}

export interface IPagableResponse<T = any> {
  totalObj: number,
  total: number,
  currentPage: number,
  takes: number,
  nextPage: number | null,
  prevPage: number | null
  pageables: T[] | null,
}

export const baseUrl = "https://localhost:7286/";

export interface IRefreshModel {
  accessToken: string,
  refreshToken: string,
}

export const TempTake = 10;