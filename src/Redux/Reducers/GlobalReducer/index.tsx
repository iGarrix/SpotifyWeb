import { GlobalAction, GlobalActionTypes, IGlobalState } from "./types";

const inialState: IGlobalState = {
    theme: "",
    lang: ""
};

export const globalReducer = (
    state = inialState,
    action: GlobalAction
): IGlobalState => {
    switch (action.type) {
        case GlobalActionTypes.INITTHEME: {
            return {
                ...state,
                theme: action.payload
            };
        }

        case GlobalActionTypes.INITLANGUAGE: {
            return {
                ...state,
                lang: action.payload
            };
        }

        default:
            return state;
    }
};
