import { Dispatch } from "redux";
import { IPagableMyAlbumItem } from "../MyAlbumReducer/types";
import { SelectAlbumAction, SelectAlbumActionTypes } from "./types";

export {};


export const initSelectAlbum = (data: IPagableMyAlbumItem) => {
    return async (dispatch: Dispatch<SelectAlbumAction>) => {
        dispatch({ type: SelectAlbumActionTypes.INITSELECTALBUM, payload: data});   
    };
  };