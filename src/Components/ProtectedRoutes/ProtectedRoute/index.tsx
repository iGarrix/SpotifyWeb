import React from "react";
import { Navigate } from "react-router-dom";
import { IProtectedRoute } from "./types";

export const ProtectedRoute: React.FC<IProtectedRoute> = ({ user, children }) => {
    return user ? <Navigate replace to={"/profile"} /> : children;
};