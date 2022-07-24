
import axios, { AxiosError } from "axios";
import { Dispatch } from "redux";
import http, { AuthorizateHeader } from "../../../axios_creator";
import { IPagableResponse } from "../../../types";
import { ITrackResponse } from "../PlayingReducer/types";
import { IGetAllMySingleRequest, ISubscribeSingleRequest, IUnsubscribeSingleRequest, MySingleAction, MySingleActionTypes } from "./types";

export const getMySingle = (data: IGetAllMySingleRequest) => {
  return async (dispatch: Dispatch<MySingleAction>) => {
    try {
      dispatch({ type: MySingleActionTypes.INITMYSINGLE_WAITING, payload: true });
      const token = localStorage.getItem("token");
      const response = await http.get<IPagableResponse<ITrackResponse>>(
        `api/Track/GetSingles?userEmail=${data.email}&page=${data.page}`,
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
      const response = await http.get<IPagableResponse<ITrackResponse>>(
        `api/Track/GetSingles?userEmail=${data.email}&page=${data.page}`,
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

export const removeTrack = (id: string) => {
  return async (dispatch: Dispatch<MySingleAction>) => {
    try {
      dispatch({ type: MySingleActionTypes.INITMYSINGLE_WAITING, payload: true });
      const token = localStorage.getItem("token");
      await http.delete<String>(
        "api/Track/Remove?trackId=" + id, {
        headers: AuthorizateHeader(token).headers
      }
      );
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


export const subscribeSingle = (data: ISubscribeSingleRequest) => {
  return async (dispatch: Dispatch<MySingleAction>) => {
    try {
      //dispatch({ type: MySingleActionTypes.INITMYSINGLE_WAITING, payload: true });
      const token = localStorage.getItem("token");
      await http.post<any>(
        "api/Track/SaveTrack",
        data, AuthorizateHeader(token)
      );
      //dispatch({ type: MySingleActionTypes.INITMYSINGLE_WAITING, payload: false });
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

export const unsubscribeSingle = (data: IUnsubscribeSingleRequest) => {
  return async (dispatch: Dispatch<MySingleAction>) => {
    try {
      //dispatch({ type: MySingleActionTypes.INITMYSINGLE_WAITING, payload: true });
      const token = localStorage.getItem("token");
      await http.delete<any>(
        "api/Track/RemoveSaveTrack",
        {
          headers: AuthorizateHeader(token).headers,
          data: data
        }
      );
      //dispatch({ type: MySingleActionTypes.INITMYSINGLE_WAITING, payload: false });
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