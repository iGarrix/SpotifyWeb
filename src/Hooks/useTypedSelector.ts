import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../Redux/Reducers";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
