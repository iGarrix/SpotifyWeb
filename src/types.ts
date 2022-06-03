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

export const MinPasswordLenght = 8;

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
  country: string;
  verify: string;
  emojie: string;
}

export const baseUrl = "https://localhost:7286/";
