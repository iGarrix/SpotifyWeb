import { IPagableResponse } from "../../../types";
import { ITrackResponse } from "../SelectAlbumReducer/types";

export enum MySingleActionTypes {
  INITMYSINGLE = "INITMYSINGLE",
  ADDMYSINGLE = "ADDMYSINGLE",
  INITMYSINGLE_WAITING = "INITMYSINGLE_WAITING",
  INITMYSINGLE_ERROR = "INITMYSINGLE_ERROR",
  INITMYSINGLE_CLEAR = "INITMYSINGLE_CLEAR",
}

export interface ISingle {
  returnId: string,
  name: string,
  releasealbom: Date | null,
  image: string,
  templateimage: string,
  description: string,
  isSingle: boolean,
}

export interface IPagableMySingleItem {
  albomDto: ISingle | null,
  creatorsAlbom: string[] | null,
  songs: number,
}

export interface IMySingleStateState {
  singles: ITrackResponse[] | null;
  prevPage: number | null,
  nextPage: number | null,
  loading: boolean;
  error: string;
}

export interface IGetAllMySingleRequest {
  email: string,
  page: number
}

export interface InitMySingleAction {
  type: MySingleActionTypes.INITMYSINGLE;
  payload: IPagableResponse | null;
}
export interface AddMySingleAction {
  type: MySingleActionTypes.ADDMYSINGLE;
  payload: IPagableResponse | null;
}
export interface InitMySingleWaitAction {
  type: MySingleActionTypes.INITMYSINGLE_WAITING;
  payload: boolean;
}
export interface InitMySingleErrorAction {
  type: MySingleActionTypes.INITMYSINGLE_ERROR;
  payload: string;
}
export interface InitMySingleClearAction {
  type: MySingleActionTypes.INITMYSINGLE_CLEAR;
}

export type MySingleAction =
  | InitMySingleAction
  | AddMySingleAction
  | InitMySingleWaitAction
  | InitMySingleErrorAction
  | InitMySingleClearAction;