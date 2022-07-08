import { IPagableResponse } from "../../../types";


export enum MyGenreActionTypes {
    INITMYGENRE = "INITMYGENRE",
    ADDMYGENRE = "ADDMYGENRE",
    INITMYGENRE_WAITING = "INITMYGENRE_WAITING",
    INITMYGENRE_ERROR = "INITMYGENRE_ERROR",
    INITMYGENRE_CLEAR = "INITMYGENRE_CLEAR",
    INITSELECTGENRE_CLEAR = "INITSELECTGENRE_CLEAR"
}

export interface IGenre {
  name: string,
  image: string,
}

export interface IPagableMyGenreItem {
  genre: IGenre | null
}

export interface IMyGenreStateState {
  genres: IGenre[] | null;
  prevPage: number | null,
  nextPage: number | null,
  loading: boolean;
  error: string;
}

export interface IGetAllMyGenreRequest {
  page: number
}

export interface InitMyGenreAction {
  type: MyGenreActionTypes.INITMYGENRE;
  payload: IPagableResponse | null;
}
export interface AddMyGenreAction {
  type: MyGenreActionTypes.ADDMYGENRE;
  payload: IPagableResponse | null;
}
export interface InitMyGenreWaitAction {
  type: MyGenreActionTypes.INITMYGENRE_WAITING;
  payload: boolean;
}
export interface InitMyGenreErrorAction {
  type: MyGenreActionTypes.INITMYGENRE_ERROR;
  payload: string;
}
export interface InitMyGenreClearAction {
  type: MyGenreActionTypes.INITMYGENRE_CLEAR;
}

export type MyGenreAction =
  | InitMyGenreAction
  | InitMyGenreWaitAction
  | InitMyGenreErrorAction
  | InitMyGenreClearAction
  | AddMyGenreAction;