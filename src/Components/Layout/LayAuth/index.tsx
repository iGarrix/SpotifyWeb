import React, { useEffect } from "react";

import { Outlet, useNavigate } from "react-router-dom";
import { useTypedSelector } from "../../../Hooks/useTypedSelector";
import { QuadraticLoader } from "../../Commons/Loaders/QuadraticLoader";

export const LayAuth: React.FC = () => {
  const nav = useNavigate();
  const user = useTypedSelector((state) => state.userReducer.profile);
  const load = useTypedSelector((state) => state.userReducer.loading);

  useEffect(() => {
    if (user !== null && load === false) {
      nav(-1);
    }

    return function clean() {};
  }, [user]);

  return (
    <div className="w-full min-h-screen relative">
      <div className={`absolute w-full h-full overflow-hidden flex flex-col justify-center items-center gap-10 transition-all ${load ? "opacity-100 z-20" : "opacity-0"}`}>
        <div className="absolute bg-black w-full h-full opacity-80 overflow-hidden flex justify-center items-center"></div>
        <QuadraticLoader isVisisble={load} />
      </div>
      <Outlet />
    </div>
  )
};
