import React from "react";
import { Outlet } from "react-router-dom";
import { useTypedSelector } from "../../../Hooks/useTypedSelector";
import { QuadraticLoader } from "../../Commons/Loaders/QuadraticLoader";
import { ProtectedRoute } from "../../ProtectedRoutes/ProtectedRoute";

export const LayAuth: React.FC = () => {
  const load = useTypedSelector((state) => state.userReducer.loading);
  const user = useTypedSelector((state) => state.userReducer.profile);
  return (
    <ProtectedRoute user={user}>
      <div className="w-full min-h-screen relative">
        <div className={`absolute w-full h-full overflow-hidden flex flex-col justify-center items-center gap-10 transition-all ${load ? "opacity-100 z-50" : "opacity-0"}`}>
          <div className="absolute bg-black w-full h-full opacity-80 overflow-hidden flex justify-center items-center"></div>
          <QuadraticLoader isVisisble={load} />
        </div>
        <Outlet />
      </div>
    </ProtectedRoute>
  )
};
