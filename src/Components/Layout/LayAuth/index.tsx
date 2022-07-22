import React from "react";
import { Outlet } from "react-router-dom";
import { useTypedSelector } from "../../../Hooks/useTypedSelector";
import { ProtectedRoute } from "../../ProtectedRoutes/ProtectedRoute";

export const LayAuth: React.FC = () => {
  const load = useTypedSelector((state) => state.userReducer.loading);
  const user = useTypedSelector((state) => state.userReducer.profile);
  return (
    <ProtectedRoute user={user}>
      <div className="w-full min-h-screen relative">
        {
          load &&
          <div className="bg-blue-400 animate-pulse w-screen h-1 rounded-b-md fixed top-0 left-0 z-[10000]"></div>
        }
        <Outlet />
      </div>
    </ProtectedRoute>
  )
};
