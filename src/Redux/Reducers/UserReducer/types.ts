import * as Yup from "yup";
import { IUser, MinPasswordLenght } from "../../../types";

export enum UserActionTypes {
  INITUSER = "INITUSER",
  INITUSER_WAITING = "INITUSER_WAITING",
  INITUSER_ERROR = "INITUSER_ERROR",
  INITUSER_CLEAR = "INITUSER_CLEAR",
}

export const registerValidate = Yup.object({
  username: Yup.string().required("Nickname is required"),
  age: Yup.string().required("Age is required"),
  email: Yup.string().email("Email is invalid").required("Email is required"),
  phone: Yup.string(),
  name: Yup.string().required("Name is required"),
  surname: Yup.string().required("Surname is required"),
  gender: Yup.string().required("Gender is equired"),
  country: Yup.string().required("Country is equired"),
  password: Yup.string()
    .min(
      MinPasswordLenght,
      `Password must be at least ${MinPasswordLenght} charaters`
    )
    .required("Password is required"),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref("password"), null], "Password must match")
    .required("Confirm password is required"),
});

export const emailLoginValidate = Yup.object({
  email: Yup.string().email("Email is invalid").required("Email is required"),
  password: Yup.string()
    .min(
      MinPasswordLenght,
      `Password must be at least ${MinPasswordLenght} charaters`
    )
    .required("Password is required"),
});

export const nicknameLoginValidate = Yup.object({
  userName: Yup.string()
    .email("Email is invalid")
    .required("Email is required"),
  password: Yup.string()
    .min(
      MinPasswordLenght,
      `Password must be at least ${MinPasswordLenght} charaters`
    )
    .required("Password is required"),
});

export interface IUserState {
  profile: IUser | null;
  loading: boolean;
  error: string;
}

export interface IRegisterRequest {
  username: string;
  email: string;
  phone: string;
  name: string;
  surname: string;
  birthday: Date | null;
  gender: string;
  country: string;
  device: string;
  password: string;
}

export interface IRegisterForm {
  username: string;
  age: string,
  email: string;
  phone: string;
  name: string;
  surname: string;
  gender: string;
  country: string;
  password: string;
  passwordConfirm: string;
}

export interface ILoginByEmailRequest {
  email: string;
  password: string;
  rememberMe: boolean;
  device: string;
}

export interface ILoginByNicknameRequest {
  userName: string;
  password: string;
  rememberMe: boolean;
  device: string;
}

export interface ILoginByEmailForm {
  email: string;
  password: string;
}

export interface ILoginByNicknameForm {
  userName: string;
  password: string;
  rememberMe: boolean;
}

export interface IUpdatePersonalData {
  findEmail: string,
  newName: string,
  newSurname: string,
  newBirthday: Date | null,
  newGender: string,
  newCountry: string,
  device: string
}

export interface IAuthResponse {
  accessToken: string;
  refreshToken: string,
  expiredIn: Date;
  user: IUser;
}

export interface IInitGet {
  name: string;
  email: string;
  provider: string | null;
  roles: string;
}

export interface IExternalRequest {
  tokenId : string,
  accessToken: string,
}

export interface InitUserAction {
  type: UserActionTypes.INITUSER;
  payload: IUser | null;
}
export interface InitUserWaitAction {
  type: UserActionTypes.INITUSER_WAITING;
  payload: boolean;
}
export interface InitUserErrorAction {
  type: UserActionTypes.INITUSER_ERROR;
  payload: string;
}
export interface InitUserClearAction {
  type: UserActionTypes.INITUSER_CLEAR;
}

export type UserAction =
  | InitUserAction
  | InitUserWaitAction
  | InitUserErrorAction
  | InitUserClearAction;
