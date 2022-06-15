import { faCog } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";

import { Outlet, useNavigate } from "react-router-dom";
import { useTypedSelector } from "../../../Hooks/useTypedSelector";
import { PlayingFooter } from "../../Commons/Footers/PlayingFooter";
import { Header } from "../../Commons/Header";
import { SideBar } from "../../Commons/SideBar";
import { SideBarItem } from "../../Commons/SideBar/SideBarItem";

//${isVisible ? "mb-32" : ""}

export const LayStartup: React.FC = () => {

  const [isVisible, setVisible] = useState(false);

  const rx = useTypedSelector(state => state.selectedAlbumReducer);

  useEffect(() => {
    if (rx.selectTrack) {
      setVisible(true);
    }
  }, [rx.selectTrack]);

  const nav = useNavigate();
  return (
    <div className="grid grid-cols-8 w-full nin-h-screen bg-gradient-to-b from-dark-200/80 to-dark-200">
      <div className="col-span-1 w-full h-full">
        <SideBar />
      </div>
      <div className={`col-span-7 w-full h-full flex flex-col`}>
        <Header />
        <Outlet />
      </div>
      <div className="fixed bottom-0 w-full grid grid-cols-8 gap-y-6">
        <div className={`col-span-1 w-full ${isVisible ? "" : "mb-6"}`}>
          <SideBarItem text="Settings" icon={faCog} onClick={() => {nav("settings")}} />
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
