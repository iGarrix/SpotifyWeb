import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useTypedSelector } from "../../../Hooks/useTypedSelector";
import { Header } from "../../Commons/Header";
import { AuthorizateRoute } from "../../ProtectedRoutes/AuthorizateRoute";

export const LayUpload: React.FC = () => {

  const user = useTypedSelector(state => state.userReducer.profile);
  const reducer = useTypedSelector(state => state.uploadReducer);
  const nav = useNavigate();

  return (
    <>
      {
        user?.status !== "Freeze" ?
        <div className="flex flex-col w-full relative">
          {
            reducer.loading &&
            <div className="bg-gradient-to-r from-blue-600 via-indigo-500 to-primary-100 animate-pulse w-screen h-1 rounded-b-md fixed top-0 left-0 z-[10000]"></div>
          }
          <Header isHead />
          <div className="hidden mm:flex w-full px-[5%] py-[15px] border-b border-b-dark-100">
            <FontAwesomeIcon className="text-xl text-dark-200 dark:text-light-200" icon={faArrowLeft} onClick={() => { nav(-1) }} />
          </div>
          <div className="w-full h-full">
            <AuthorizateRoute user={user}><Outlet /></AuthorizateRoute>
          </div>
        </div> : <Navigate to={"/"} replace={true} />
      }
    </>
  )
}