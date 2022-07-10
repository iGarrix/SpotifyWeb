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
  verify = "VerifyProfile",
}

export enum StorageVariables {
  Queue = "queue",
  History = "history",
  Album = "selectAlbum",
  Playlist = "selectPlaylist",
  Track = "selectTrack",
  ForgotUser = "ForgotUser",
  VerifyResponse = "VerifyResponse",
  Volume = "vol"
}

export const MinPasswordLenght = 8;
export const DefaultServerError = "The service is temporarily disabled, please try again later";

export interface IUser {
  username: string;
  email: string;
  phone: number;
  emailconfirm: boolean;
  phonenumberconfirmed: boolean;
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
  soundobjs: ITrackResponse[],
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

export const TempTake = 20;
export const minYears = 12;
export const defaultAlbumImage = "https://d338t8kmirgyke.cloudfront.net/icons/icon_pngs/000/002/026/original/disc.png";
export const defaultAvatarImage = "https://t4.ftcdn.net/jpg/04/10/43/77/360_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg";
export const defaultBackgroundImage = "https://static.vecteezy.com/system/resources/previews/005/185/276/original/abstract-man-avatar-pattern-background-free-vector.jpg";


export function monthDiff(d1: Date, d2: Date) {
  // var months;
  // months = (d1.getFullYear() - d2.getFullYear()) * 12;
  // months += d1.getMonth();
  // months -= d2.getMonth();
  // return months <= 0 ? 0 : months;
  var diff = Math.abs(d1.getTime() - d2.getTime());
  var diffMonth = Math.ceil(diff / (1000 * 3600 * 24 * 30));
  return diffMonth;
}

export function dayDiff(d1: Date, d2: Date) {
  // var day;
  // day = ((d1.getFullYear() - d2.getFullYear()) * 12) * 30;
  // console.log(day);
  // return day <= 0 ? 0 : day;
  var diff = Math.abs(d1.getTime() - d2.getTime());
  var diffDays = Math.ceil(diff / (1000 * 3600 * 24));
  return diffDays;
}

export function fillingUser(user: IUser | null) {
  if (user) {
    if (user.avatar.length !== 0 && user.background && user.avatar && user.background.length !== 0
      && user.birthday != null && user.country !== "No Above" && user.gender.length !== 0
      && user.phone.toString().length !== 0 && user.emojie.length !== 0 && user.country.length !== 0 && user.country
      && user.emailconfirm) {
      return true;
    }
  }
  return false;
}

export function GetUserAvatar(user: IUser | null) {
  if (user) {
    return user.avatar.includes("http") ? user.avatar
      : baseUrl + "Images/Users/" + user.avatar;
  }
  return "";
}

export function GetUserBackground(user: IUser | null) {
  if (user) {
    if (user.background && user.background.length !== 0) {
      if (user.background.includes("http")) {
        return user.background;
      }
      else {
        return baseUrl + "Images/Users/" + user.background;
      }
    }
    else {
      return defaultBackgroundImage;
    }
  }
  return "";
}