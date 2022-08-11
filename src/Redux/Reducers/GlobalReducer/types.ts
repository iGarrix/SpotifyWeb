export enum GlobalActionTypes {
    INITTHEME = "INITTHEME",
    INITLANGUAGE = "INITLANGUAGE",
}

export interface IGlobalState {
    theme: string,
    lang: string,
}

export interface SetThemeAction {
    type: GlobalActionTypes.INITTHEME;
    payload: string;
}
export interface SetLangAction {
    type: GlobalActionTypes.INITLANGUAGE;
    payload: string;
}

export type GlobalAction =
    | SetThemeAction
    | SetLangAction;