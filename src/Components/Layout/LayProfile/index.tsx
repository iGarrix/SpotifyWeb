import React from "react";
import { Outlet, } from "react-router-dom";
import { useTypedSelector } from "../../../Hooks/useTypedSelector";
import { AuthorizateRoute } from "../../ProtectedRoutes/AuthorizateRoute";

export const LayProfile: React.FC = () => {
  const user = useTypedSelector(state => state.userReducer.profile);
  const loading = useTypedSelector(state => state.userReducer.loading);
  return (
    <>
      <AuthorizateRoute user={user}>
        <Outlet />
      </AuthorizateRoute>
    </>
  )
};
