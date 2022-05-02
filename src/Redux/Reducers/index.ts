import { combineReducers } from "redux";
import { userReducer } from "./UserReducer";

export const rootReducer = combineReducers({
  userReducer: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
