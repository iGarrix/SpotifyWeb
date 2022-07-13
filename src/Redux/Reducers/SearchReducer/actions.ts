import axios, { AxiosError } from "axios";
import { Dispatch } from "redux";
import http from "../../../axios_creator";
import { ISearchAllModel, SearchAction, SearchActionTypes } from "./types";

export const SearchAllXHR = (searchQuery: string) => {
    return async (dispatch: Dispatch<SearchAction>) => {
        try {
            dispatch({ type: SearchActionTypes.SEARCH_WAITING, payload: true });
            const response = await http.get<ISearchAllModel>(
                `api/Search/SearchAll?searchQuery=${searchQuery}`
            );
            dispatch({ type: SearchActionTypes.INITSEARCHALL, payload: response.data });

            return Promise.resolve();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const serverError = error as AxiosError<any>;
                dispatch({
                    type: SearchActionTypes.SEARCH_ERROR,
                    payload: serverError.response?.data,
                });
                if (serverError && serverError.response) {
                    return Promise.reject(serverError.response.data);
                }
            }
        }
    };
};

export const ClearSearchXHR = () => {
    return (dispatch: Dispatch<SearchAction>) => {
        dispatch({ type: SearchActionTypes.SEARCHCLEAR });
    };
}