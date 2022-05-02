import React, { useEffect } from "react";

import { Outlet } from "react-router-dom";

export const LayAuth: React.FC = () => {
  useEffect(() => {
    //nav(-1);
  }, []);

  return <Outlet />;
};
