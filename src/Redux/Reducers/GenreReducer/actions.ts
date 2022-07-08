import { IGenre, IGetAllMyGenreRequest, IPagableMyGenreItem, MyGenreAction, MyGenreActionTypes } from "./types";
import axios, { AxiosError } from "axios";
import { Dispatch } from "redux";
import http, { AuthorizateHeader } from "../../../axios_creator";
import { IPagableResponse } from "../../../types";

export const getAllGenre = (data: IGetAllMyGenreRequest) => {
  return async (dispatch: Dispatch<MyGenreAction>) => {
    try {
      dispatch({ type: MyGenreActionTypes.INITMYGENRE_WAITING, payload: true });
      const token = localStorage.getItem("token");
      const response = await http.get<IPagableResponse<IPagableMyGenreItem>>(
        `api/Genre/GetAll?&page=${data.page}`,
        AuthorizateHeader(token)
      );
      dispatch({ type: MyGenreActionTypes.INITMYGENRE, payload: response.data });

      return Promise.resolve();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<any>;
        dispatch({
          type: MyGenreActionTypes.INITMYGENRE_ERROR,
          payload: serverError.response?.data,
        });
        if (serverError && serverError.response) {
          return Promise.reject(serverError.response.data);
        }
      }
    }
  };
};

export const addMyGenre = (data: IGetAllMyGenreRequest) => {
  return async (dispatch: Dispatch<MyGenreAction>) => {
    try {
      dispatch({ type: MyGenreActionTypes.INITMYGENRE_WAITING, payload: true });
      const token = localStorage.getItem("token");
      const response = await http.get<IPagableResponse<IGenre>>(
        `api/Genre/GetAll?&page=${data.page}`,
        AuthorizateHeader(token)
      );
      dispatch({ type: MyGenreActionTypes.ADDMYGENRE, payload: response.data });

      return Promise.resolve();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<any>;
        dispatch({
          type: MyGenreActionTypes.INITMYGENRE_ERROR,
          payload: serverError.response?.data,
        });
        if (serverError && serverError.response) {
          return Promise.reject(serverError.response.data);
        }
      }
    }
  };
};