import React from "react";
import { Outlet } from "react-router-dom";
import { useTypedSelector } from "../../../Hooks/useTypedSelector";
import { Header } from "../../Commons/Header";
import { AuthorizateRoute } from "../../ProtectedRoutes/AuthorizateRoute";

export const LayUpload : React.FC = () => {

    const user = useTypedSelector(state => state.userReducer.profile);
    const reducer = useTypedSelector(state => state.uploadReducer);

    return (
        <div className="flex flex-col w-full relative">
          {
            reducer.loading &&
            <div className="bg-gradient-to-r from-blue-600 via-indigo-500 to-primary-100 animate-pulse w-screen h-1 rounded-b-md fixed top-0 left-0 z-[10000]"></div>
          }
          <Header isHead />
          <div className="w-full h-full">
            <AuthorizateRoute user={user}><Outlet /></AuthorizateRoute>
          </div>
        </div>
      )
}