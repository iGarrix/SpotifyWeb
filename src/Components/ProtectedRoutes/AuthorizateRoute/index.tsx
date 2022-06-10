import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useTypedSelector } from "../../../Hooks/useTypedSelector";
import { IAuthorizateRoute } from "./types";

export const AuthorizateRoute : React.FC<IAuthorizateRoute> = ({ user, children }) => {

    const token = localStorage.getItem("token");

    return user || token ? children : <Navigate replace to={"/authorizate"} />;
};