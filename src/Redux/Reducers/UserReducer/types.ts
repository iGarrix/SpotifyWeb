import * as Yup from "yup";
import { DeviceType, IUser, MinPasswordLenght, minYears } from "../../../types";

export enum UserActionTypes {
  INITUSER = "INITUSER",
  INITOVERWIEVER = "INITOVERWIEVER",
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

export const emailForgotValidate = Yup.object({
  email: Yup.string(),
});

export const newPasswordChangeValidate = Yup.object({
  newPassword: Yup.string()
    .min(
      MinPasswordLenght,
      `Password must be at least ${MinPasswordLenght} charaters`
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Password must match")
    .required("Confirm password is required"),
});

export const verifyCodeForgotValidate = Yup.object({
  code: Yup.string().required("Code is required").length(4, "Code is not valid"),
});

export const DeleteProfileValidate = Yup.object({
  password: Yup.string()
  .min(
    MinPasswordLenght,
    `Password must be at least ${MinPasswordLenght} charaters`
  )
  .required("Password is required"),
});

export const changeDataAccountValidate = Yup.object({
  name: Yup.string().required("Name is required"),
  surname: Yup.string().required("Surname is required"),
  username: Yup.string().required("Nickname is required"),
});

export const changeOtherDataAccountValidate = Yup.object({
  date: Yup.number().required("Day is required").min(1, "Invalid Day").max(31, "Invalid Day"),
  month: Yup.number().required("Month is required").min(1, "Invalid Month").max(12, "Invalid Month"),
  years: Yup.number().required("Years is required").min(1970, "Invalid Years").max(new Date().getFullYear() - minYears, `From ${minYears} years old`),
  gender: Yup.string().required("Gender is equired"),
  country: Yup.string().required("Country is equired"),
});

export const changeEmailAccountValidate = Yup.object({
  email: Yup.string().email("Email is invalid").required("Email is required"),
});
export const appelationMessageValidate = Yup.object({
  message: Yup.string().required("Message is required").min(20, "The message must be longer than 20 characters").max(300, "The message must be less than 300 characters long"),
});

export const changePasswordAccountValidate = Yup.object({
  oldPassword: Yup.string()
    .min(
      MinPasswordLenght,
      `Old password must be at least ${MinPasswordLenght} charaters`
    )
    .required("Old password is required"),
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

export const changeEmojieAccountValidate = Yup.object({
  emojie: Yup.string().required("Emojie is required").min(5, "Emojie not valid").max(20, "Emojie overflowed 20 symbols"),
});

export interface IUserState {
  profile: IUser | null;
  overviewer: IUser | null,
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
  tokenId: string,
  accessToken: string,
}

export interface IChangeAvatarRequest {
  findEmail: string,
  newAvatar: File,
}

export interface InitUserAction {
  type: UserActionTypes.INITUSER;
  payload: IUser | null;
}
export interface InitOverviewerAction {
  type: UserActionTypes.INITOVERWIEVER;
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
  | InitOverviewerAction
  | InitUserWaitAction
  | InitUserErrorAction
  | InitUserClearAction;

export interface IForgotByEmailForm {
  email: string;
}

export interface IForgotNewPasswordForm {
  newPassword: string;
  confirmPassword: string;
}

export interface IForgotNewPasswordRequest {
  findEmail: string;
  newPassword: string;
  device: string;
}

export interface IVerifyCodeByForgotForm {
  code: string;
}

export interface IVerifyCodeByForgotRequest {
  email: string;
  code: number;
}
export interface ISendVerifyCodeByForgotRequest {
  emailClient: string;
}

export interface IVerifyEmailRequest {
  findEmail: string;
  verify: boolean;
  device: string;
}

export interface IDeleteProfileForm {
  password: string;
}

export interface IDeleteProfileRequest {
  findEmail: string;
  password: string;
}

export interface IChangeEmojieForm {
  emojie: string,
}

export interface IChangeEmojieRequest {
  findEmail: string,
  newEmojie: string,
  device: DeviceType.desktop,
}

export interface IChangeDataAccountForm {
  name: string,
  surname: string,
  username: string,
}

export interface IChangeDataAccountRequest {
  findEmail: string,
  newUserName: string,
  device: DeviceType.desktop,
}

export interface IChangeOtherDataAccountForm {
  date: string,
  month: string,
  years: string,
  gender: string,
  country: string,
}

export interface IChangePhoneAccountRequest {
  findEmail: string,
  newPhone: string,
  device: DeviceType.desktop,
}

export interface IChangeEmailAccountForm {
  email: string,
}

export interface IChangeEmailAccountRequest {
  findEmail: string,
  newEmail: string,
  device: DeviceType.desktop,
}

export interface IChangePasswordAccountForm {
  oldPassword: string,
  password: string,
  passwordConfirm: string,
}

export interface IChangePasswordAccountRequest {
  findEmail: string,
  oldPassword: string,
  newPassword: string,
  device: DeviceType.desktop,
}

export interface IVerifiedAccountRequest {
  findEmail: string,
  status: string,
  device: DeviceType.desktop,
}

export interface ISendAppelationForm {
  message: string,
}

export interface ISendAppelationRequest {
  Message: string,
  FindEmail: string,
}
