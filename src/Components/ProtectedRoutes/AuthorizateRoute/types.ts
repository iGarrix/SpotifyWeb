import { IUser } from "../../../types";

export interface IAuthorizateRoute {
    user: IUser | null;
    children: any,
}