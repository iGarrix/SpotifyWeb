import { IUser } from "../../../types";

export interface IProtectedRoute {
    user: IUser | null,
    children: any,
}