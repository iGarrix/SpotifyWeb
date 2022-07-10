import { IPagableResponse, IUser } from "../../../types";


export enum NotificationActionTypes {
  INITNOTIFICATION = "INITNOTIFICATION",
  ADDNOTIFICATION = "ADDNOTIFICATION",
  INITAPPELATIONS = "INITAPPELATIONS",
  ADDAPPELATIONS = "ADDAPPELATIONS",
  INITSTATUSES = "INITSTATUSES",
  ADDSTATUSES = "ADDSTATUSES",
  INITSELECTSTATUS = "INITSELECTSTATUS",
  INITNOTIFICATION_WAITING = "INITNOTIFICATION_WAITING",
  INITNOTIFICATION_ERROR = "INITNOTIFICATION_ERROR",
  INITNOTIFICATION_CLEAR = "INITNOTIFICATION_CLEAR",
}

export interface INotification {
  date: Date,
  device: string,
  status: string,
  message: string,
  transaction: string,
}

export interface IAppelation {
  returnId: string,
  sendDate: Date,
  message: string,
}

export interface IUserStatus {
  status: string,
  startDate: Date,
  endDate: Date,
  reason: string,
  create: Date,
}

export interface IGetAppelationRequest {
  email: string,
  page: number,
}

export interface IGetStatusUserRequest {
  email: string,
  isadmin: boolean,
  page: number,
}

export interface IGetNotificationsRequest {
  findEmail: string,
  page: number,
}

export interface INotificationStateState {
  notifications: INotification[] | null;
  appelations: IAppelation[] | null,
  statuses: IUserStatusResponse[] | null,
  selectedStatus: IUserStatusResponse | null,
  prevPage: number | null,
  nextPage: number | null,
  loading: boolean;
  error: string;
}

export interface IUserStatusResponse {
  userStatusDto: IUserStatus,
  user: IUser,
  admin: IUser,
}

export interface InitNotificationAction {
  type: NotificationActionTypes.INITNOTIFICATION;
  payload: IPagableResponse | null;
}
export interface AddNotificationAction {
  type: NotificationActionTypes.ADDNOTIFICATION;
  payload: IPagableResponse | null;
}
export interface InitAppelationsAction {
  type: NotificationActionTypes.INITAPPELATIONS;
  payload: IPagableResponse | null;
}
export interface AddAppelationsAction {
  type: NotificationActionTypes.ADDAPPELATIONS;
  payload: IPagableResponse | null;
}
export interface InitStatusesAction {
  type: NotificationActionTypes.INITSTATUSES;
  payload: IPagableResponse | null;
}
export interface AddStatusesAction {
  type: NotificationActionTypes.ADDSTATUSES;
  payload: IPagableResponse | null;
}
export interface InitSelectStatusAction {
  type: NotificationActionTypes.INITSELECTSTATUS;
  payload: IUserStatusResponse | null;
}
export interface InitNotificationWaitAction {
  type: NotificationActionTypes.INITNOTIFICATION_WAITING;
  payload: boolean;
}
export interface InitNotificationErrorAction {
  type: NotificationActionTypes.INITNOTIFICATION_ERROR;
  payload: string;
}
export interface InitNotificationClearAction {
  type: NotificationActionTypes.INITNOTIFICATION_CLEAR;
}

export type NotificateAction =
  | InitNotificationAction
  | AddNotificationAction
  | InitAppelationsAction
  | AddAppelationsAction
  | InitStatusesAction 
  | AddStatusesAction
  | InitSelectStatusAction
  | InitNotificationWaitAction
  | InitNotificationErrorAction
  | InitNotificationClearAction;