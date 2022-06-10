
import axios, { AxiosError } from "axios";
import { Dispatch } from "redux";
import http, { AuthorizateHeader } from "../../../axios_creator";
import { IPagableResponse } from "../../../types";
import { IAlbum, IGetAllMyAlbumRequest, MyAlbumAction, MyAlbumActionTypes } from "./types";

export const getMyAlbum = (data: IGetAllMyAlbumRequest) => {
    return async (dispatch: Dispatch<MyAlbumAction>) => {
      try {
        dispatch({ type: MyAlbumActionTypes.INITMYALBUM_WAITING, payload: true });
        const token = localStorage.getItem("token");
        const response = await http.get<IPagableResponse<IAlbum>>(
          `api/Albom/GetAllByCreator?email=${data.email}&page=${data.page}&isSingle=false`,
          AuthorizateHeader(token)
        );
        dispatch({ type: MyAlbumActionTypes.INITMYALBUM, payload: response.data});
  
        return Promise.resolve();
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const serverError = error as AxiosError<any>;
          dispatch({
            type: MyAlbumActionTypes.INITMYALBUM_ERROR,
            payload: serverError.response?.data,
          });
          if (serverError && serverError.response) {
            return Promise.reject(serverError.response.data);
          }
        }
      }
    };
  };


  export const addMyAlbum = (data: IGetAllMyAlbumRequest) => {
    return async (dispatch: Dispatch<MyAlbumAction>) => {
      try {
        dispatch({ type: MyAlbumActionTypes.INITMYALBUM_WAITING, payload: true });
        const token = localStorage.getItem("token");
        const response = await http.get<IPagableResponse<IAlbum>>(
          `api/Albom/GetAllByCreator?email=${data.email}&page=${data.page}&isSingle=false`,
          AuthorizateHeader(token)
        );
        dispatch({ type: MyAlbumActionTypes.ADDMYALBUM, payload: response.data});
  
        return Promise.resolve();
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const serverError = error as AxiosError<any>;
          dispatch({
            type: MyAlbumActionTypes.INITMYALBUM_ERROR,
            payload: serverError.response?.data,
          });
          if (serverError && serverError.response) {
            return Promise.reject(serverError.response.data);
          }
        }
      }
    };
  };