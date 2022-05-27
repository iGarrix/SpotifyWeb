import React from "react";

import { Outlet } from "react-router-dom";
import { Header } from "../../Commons/Header";
import { SideBar } from "../../Commons/SideBar";

export const LayStartup: React.FC = () => {
  return (
    <div className="flex">
      <SideBar />
      <div className="flex flex-col w-full">
        <Header />
        <Outlet />
      </div>
    </div> 
  )
};
