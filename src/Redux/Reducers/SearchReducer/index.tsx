import { DefaultServerError } from "../../../types";
import { ISearchState, SearchAction, SearchActionTypes } from "./types";


const inialState: ISearchState = {
    searchall: null,
    prevPage: null,
    nextPage: null,
    loading: false,
    error: ""
};

export const searchReducer = (
    state = inialState,
    action: SearchAction
): ISearchState => {
    switch (action.type) {

        case SearchActionTypes.INITSEARCHALL: {
            return {
                ...state,
                searchall: action.payload,
                loading: false,
                error: "",
            };
        }
        case SearchActionTypes.SEARCH_WAITING: {
            return {
                ...state,
                loading: action.payload,
            };
        }
        case SearchActionTypes.SEARCH_ERROR: {
            return {
                ...state,
                error:
                    action.payload === undefined || action.payload === null
                        ? DefaultServerError
                        : action.payload,
                loading: false,
            };
        }

        case SearchActionTypes.SEARCHCLEAR: {
            return {
                ...state,
                searchall: null,
                prevPage: null,
                nextPage: null,
                loading: false,
                error: "",
            };
        }

        default:
            return state;
    }
};
