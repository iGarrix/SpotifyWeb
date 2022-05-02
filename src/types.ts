export enum Theme {
  dark = "dark",
  light = "light",
}

export enum DeviceType {
  mobile = "mobile",
  desktop = "WebBrowser Desktop",
}

export const MinPasswordLenght = 8;

export interface IUser {
  username: string;
  email: string;
  phone: number;
  emailconfirm: string;
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
