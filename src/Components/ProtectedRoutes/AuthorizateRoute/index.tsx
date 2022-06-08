import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { IAuthorizateRoute } from "./types";

export const AuthorizateRoute : React.FC<IAuthorizateRoute> = ({ user, children }) => {

    const [loginToken, setLoginToken] = useState(localStorage.getItem("token"));

    return user || loginToken ? children : <Navigate replace to={"/authorizate"} />;
};