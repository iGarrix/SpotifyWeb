import React, { useEffect, useState } from "react";

import { Outlet, useNavigate } from "react-router-dom";
import { useTypedSelector } from "../../../Hooks/useTypedSelector";
import { RedirectButton } from "../../Commons/Buttons/RedirectButton";
import { PlayingFooter } from "../../Commons/Footers/PlayingFooter";
import { Header } from "../../Commons/Header";
import { SideBar } from "../../Commons/SideBar";
import { SideBarItem } from "../../Commons/SideBar/SideBarItem";

const icon_settings = require('../../../Assets/Icons/Settings.png');

export const LayStartup: React.FC = () => {
  const [isVisible, setVisible] = useState(false);
  const rx = useTypedSelector(state => state.playingReducer);
  const user = useTypedSelector(state => state.userReducer.profile);
  const load = useTypedSelector(state => state);
  useEffect(() => {
    if (rx.queue) {
      setVisible(true);
    }
  }, [rx.queue]);
  const nav = useNavigate();
  return (
    <div className="grid grid-cols-20 w-full nin-h-screen">
      {
        load.mySingleReducer.loading || load.myAlbumsReducer.loading || 
        load.playingReducer.loading || load.userReducer.loading || 
        load.searchReducer.loading || load.myPlaylistReducer.loading
        || load.myMediaLibraryReducer.loading || load.mainReducer.loading ||
        load.genreReducer.loading &&
        <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-primary-100 animate-pulse w-screen h-1 rounded-b-md fixed top-0 left-0 z-[10000]"></div>
      }
      <div className="col-span-3 w-full h-full z-[100]">
        <SideBar />
      </div>
      <div className={`col-[span_17] w-full h-full flex flex-col ${isVisible ? "mb-[150px]" : "mb-[100px]"}`}>
        <Header />
        <Outlet />
      </div>
      <div className="fixed bottom-0 w-full grid grid-cols-20 z-[100]">
        <div className={`col-[span_3] w-full mb-6`}>
          <SideBarItem text="Settings" icon={icon_settings} onClick={() => { nav("websettings") }} />
        </div>
        {
          isVisible && user ?
            <div className="col-[span_20]">
              <PlayingFooter />
            </div> : 
            !user &&
            <div className="w-full h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-primary-100 text-light-100 col-[span_17] flex justify-between items-center px-[2%]">
              <div className="flex flex-col">
                <p className="text-lg font-['Lexend'] font-bold]">TEMPORALITY USING SOUNDWAVE</p>
                <p>Sign up to listen to playlists, albums and songs for free</p>
              </div>
              <div className="flex ml-auto">
                <RedirectButton onClick={() => nav('/authorizate')} text={"Register & Login - Free"}/>
              </div>
            </div>
        }
      </div>

    </div>
  )
};
