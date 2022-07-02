import { IPagableResponse } from "../../../types";


export enum NotificationActionTypes {
  INITNOTIFICATION = "INITNOTIFICATION",
  ADDNOTIFICATION = "ADDNOTIFICATION",
  INITAPPELATIONS = "INITAPPELATIONS",
  ADDAPPELATIONS = "ADDAPPELATIONS",
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

export interface IGetAppelationRequest {
  email: string,
  page: number,
}

export interface INotificationStateState {
  notifications: INotification[] | null;
  appelations: IAppelation[] | null,
  prevPage: number | null,
  nextPage: number | null,
  loading: boolean;
  error: string;
}

export interface IGetNotificationsRequest {
  findEmail: string,
  page: number,
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
  | InitNotificationWaitAction
  | InitNotificationErrorAction
  | InitNotificationClearAction;