import React from "react";
import { Navigate } from "react-router-dom";
import { IAuthorizateRoute } from "./types";

export const AuthorizateRoute : React.FC<IAuthorizateRoute> = ({ user, children }) => {
    return user ? children : <Navigate replace to={"/authorizate"} />;
};