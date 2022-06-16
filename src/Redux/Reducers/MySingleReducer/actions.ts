
import axios, { AxiosError } from "axios";
import { Dispatch } from "redux";
import http, { AuthorizateHeader } from "../../../axios_creator";
import { IPagableResponse } from "../../../types";
import { IGetAllMySingleRequest, MySingleAction, MySingleActionTypes, ISingle } from "./types";

export const getMySingle = (data: IGetAllMySingleRequest) => {
  return async (dispatch: Dispatch<MySingleAction>) => {
    try {
      dispatch({ type: MySingleActionTypes.INITMYSINGLE_WAITING, payload: true });
      const token = localStorage.getItem("token");
      const response = await http.get<IPagableResponse<ISingle>>(
        `api/Albom/GetAllByCreator?email=${data.email}&page=${data.page}&isSingle=true`,
        AuthorizateHeader(token)
      );
      dispatch({ type: MySingleActionTypes.INITMYSINGLE, payload: response.data });

      return Promise.resolve();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<any>;
        dispatch({
          type: MySingleActionTypes.INITMYSINGLE_ERROR,
          payload: serverError.response?.data,
        });
        if (serverError && serverError.response) {
          return Promise.reject(serverError.response.data);
        }
      }
    }
  };
};


export const addMySingle = (data: IGetAllMySingleRequest) => {
  return async (dispatch: Dispatch<MySingleAction>) => {
    try {
      dispatch({ type: MySingleActionTypes.INITMYSINGLE_WAITING, payload: true });
      const token = localStorage.getItem("token");
      const response = await http.get<IPagableResponse<ISingle>>(
        `api/Albom/GetAllByCreator?email=${data.email}&page=${data.page}&isSingle=true`,
        AuthorizateHeader(token)
      );
      dispatch({ type: MySingleActionTypes.ADDMYSINGLE, payload: response.data });

      return Promise.resolve();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<any>;
        dispatch({
          type: MySingleActionTypes.INITMYSINGLE_ERROR,
          payload: serverError.response?.data,
        });
        if (serverError && serverError.response) {
          return Promise.reject(serverError.response.data);
        }
      }
    }
  };
};