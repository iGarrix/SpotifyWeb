import { Dispatch } from "redux";
import { GlobalAction, GlobalActionTypes } from "./types";

export const initTheme = (theme: string, dispatch: any) => {
    dispatch({ type: GlobalActionTypes.INITTHEME, payload: theme });
};

export const initLang = (lang: string, dispatch: any) => {
    dispatch({ type: GlobalActionTypes.INITLANGUAGE, payload: lang });
};