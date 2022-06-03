import React from "react";
import { Navigate } from "react-router-dom";
import { IUser } from "../../../types";

export interface IAuthorizateRoute {
    user: IUser | null,
    isAllowed?: boolean,
    children : any,
}

export const AuthorizateRoute : React.FC<IAuthorizateRoute> = ({ user, children, isAllowed }) => {
    if (user !== null && !isAllowed) {
      return <div className="h-screen w-screen bg-black"><Navigate to="/" replace /></div>;
    }
    return children;
  };