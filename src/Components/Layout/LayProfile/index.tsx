import React from "react";
import { Outlet, } from "react-router-dom";
import { useTypedSelector } from "../../../Hooks/useTypedSelector";
import { QuadraticLoader } from "../../Commons/Loaders/QuadraticLoader";
import { AuthorizateRoute } from "../../ProtectedRoutes/AuthorizateRoute";

export const LayProfile: React.FC = () => {

  const user = useTypedSelector(state => state.userReducer.profile);
  const loading = useTypedSelector(state => state.userReducer.loading);
  return (
    <>
      {
        loading ?
          <div className="w-full h-full fixed top-0 left-0 bg-black/60 flex justify-center items-center" style={{zIndex: 5000}}>
            <QuadraticLoader isVisisble={loading} />
          </div> : null
      }
      <AuthorizateRoute user={user}>
        <Outlet />
      </AuthorizateRoute>
    </>
  )
};
