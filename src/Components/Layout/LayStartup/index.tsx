import { faNfcSymbol } from "@fortawesome/free-brands-svg-icons";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";

import { Outlet } from "react-router-dom";
import { PlayingFooter } from "../../Commons/Footers/PlayingFooter";
import { Header } from "../../Commons/Header";
import { SideBar } from "../../Commons/SideBar";
import { SideBarItem } from "../../Commons/SideBar/SideBarItem";

export const LayStartup: React.FC = () => {

  const [isVisible, setVisible] = useState(false);

  return (
    <div className="grid grid-cols-8 w-full nin-h-screen bg-gradient-to-b from-dark-100/100 to-dark-100">
      <div className="col-span-1 w-full h-full">
        <SideBar />
      </div>
      <div className="col-span-7 w-full h-full flex flex-col mb-32">
        <Header />
        <Outlet />
      </div>
      <div className="fixed bottom-0 w-full grid grid-cols-8 gap-y-6">
        <div className={`col-span-1 w-full ${isVisible ? "" : "mb-6"}`}>
          <SideBarItem text="Settings" icon={faCog} onClick={() => { }} />
        </div>
        {
          isVisible ?
            <div className="col-span-8">
              <PlayingFooter />
            </div> : null
        }
      </div>

    </div>
  )
};
