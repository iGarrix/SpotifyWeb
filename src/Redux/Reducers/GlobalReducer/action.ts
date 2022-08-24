import { Dispatch } from "redux";
import { GlobalActionTypes } from "./types";

export const initTheme = (theme: string, dispatch: any) => {
    dispatch({ type: GlobalActionTypes.INITTHEME, payload: theme });
};

export const initLang = (lang: string, dispatch: any) => {
    dispatch({ type: GlobalActionTypes.INITLANGUAGE, payload: lang });
};

export const initLangDispath = (lang: string) => {
    return (dispatch: Dispatch<any>) => {
        dispatch({ type: GlobalActionTypes.INITLANGUAGE, payload: lang });      
    }
};