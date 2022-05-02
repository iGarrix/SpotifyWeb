import React, { useEffect, useState } from "react";

import { Outlet, useNavigate } from "react-router-dom";
import { useTypedSelector } from "../../../Hooks/useTypedSelector";

export const LayProfile: React.FC = () => {
  const nav = useNavigate();
  const user = useTypedSelector((state) => state.userReducer.profile);
  const load = useTypedSelector((state) => state.userReducer.loading);

  useEffect(() => {
    if (user === null && load === false) {
      nav(-1);
    }

    return function clean() {};
  }, [user]);

  return <Outlet />;
};
