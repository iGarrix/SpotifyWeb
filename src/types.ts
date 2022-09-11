import { ITrackResponse } from "./Redux/Reducers/PlayingReducer/types";

export enum Theme {
  dark = "dark",
  light = "light",
}

export enum LanguageVars {
  EN = "En",
  UA = "Ua"
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
  Track = "selectTrack",
  ForgotUser = "ForgotUser",
  VerifyResponse = "VerifyResponse",
  Volume = "vol",
  Language = "language",
  Theme = "theme",
}

export enum BestResultTypes {
  User = "user",
  Single = "single",
  Album = "album",
  Playlist = "playlist",
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
  views: number,
  status: string,
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

// RELEASE
//export const baseUrl = "https://soundwave.gq/";
// DEVELOPMENT
//export const baseUrl = "https://localhost:5001/"; 
export const baseUrl = "https://localhost:7286/";

export interface IRefreshModel {
  accessToken: string,
  refreshToken: string,
}

export const TempTake = 20;
export const minYears = 12;
export const defaultPlaylistImage = "https://t3.ftcdn.net/jpg/04/54/66/12/360_F_454661277_NtQYM8oJq2wOzY1X9Y81FlFa06DVipVD.jpg";
export const defaultGenreImage = "https://d338t8kmirgyke.cloudfront.net/icons/icon_pngs/000/002/026/original/disc.png";
export const defaultMusicImage = "https://cdn4.vectorstock.com/i/1000x1000/55/13/sound-wave-abstract-colored-equalizer-personal-vector-32115513.jpg";
export const defaultAlbumImage = "https://cdn5.vectorstock.com/i/1000x1000/94/84/glowing-neon-vinyl-disk-icon-isolated-on-blue-vector-29459484.jpg";
export const defaultAvatarImage = "https://t4.ftcdn.net/jpg/04/10/43/77/360_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg";
export const defaultBackgroundImage = "https://static.vecteezy.com/system/resources/previews/005/185/276/original/abstract-man-avatar-pattern-background-free-vector.jpg";


export function monthDiff(d1: Date, d2: Date) {
  var diff = Math.abs(d1.getTime() - d2.getTime());
  var diffMonth = Math.ceil(diff / (1000 * 3600 * 24 * 30));
  return diffMonth;
}

export function dayDiff(d1: Date, d2: Date) {
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

export function GetUserAvatarSimple(image: string | null) {
  if (image) {
    return image.includes("http") ? image
      : baseUrl + "Images/Users/" + image;
  }
  return "";
}

export function GetUserBackgroundSimple(image: string | null) {
  if (image) {
    if (image && image.length !== 0) {
      if (image.includes("http")) {
        return image;
      }
      else {
        return baseUrl + "Images/Users/" + image;
      }
    }
    else {
      return defaultBackgroundImage;
    }
  }
  return "";
}

export function shuffle<T>(array: T[]): T[] {
  let currentIndex = array.length, randomIndex;

  while (currentIndex != 0) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
};

export function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}