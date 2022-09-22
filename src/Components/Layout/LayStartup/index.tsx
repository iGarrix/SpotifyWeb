import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Outlet, useNavigate } from "react-router-dom";
import { useTypedSelector } from "../../../Hooks/useTypedSelector";
import { baseUrl, defaultAvatarImage, GetUserAvatar } from "../../../types";
import { RedirectButton } from "../../Commons/Buttons/RedirectButton";
import { PlayingFooter } from "../../Commons/Footers/PlayingFooter";
import { Header } from "../../Commons/Header";
import { FixedModal } from "../../Commons/Modals/FixedModal";
import { SideBar } from "../../Commons/SideBar";
import { SideBarItem } from "../../Commons/SideBar/SideBarItem";

const icon_settings = require('../../../Assets/Icons/Settings.png');
const icon_home = require('../../../Assets/Icons/Home.png');
const icon_search = require('../../../Assets/Icons/Search.png');
const icon_lib = require('../../../Assets/Icons/Library.png');
const icon_pd = require('../../../Assets/Icons/PDAccount.png');

export const LayStartup: React.FC = () => {
  const [isVisible, setVisible] = useState(false);
  const [show, setShow] = useState(true);
  const rx = useTypedSelector(state => state.playingReducer);
  const user = useTypedSelector(state => state.userReducer.profile);
  const load = useTypedSelector(state => state);
  const { t } = useTranslation();
  useEffect(() => {
    if (rx.queue) {
      setVisible(true);
    }
  }, [rx.queue]);
  const nav = useNavigate();
  return (
    <div className="grid grid-cols-20 w-full mm:flex mm:flex-col sm:flex sm:flex-col md:flex md:flex-col">
      {
        load.mySingleReducer.loading || load.myAlbumsReducer.loading ||
        load.playingReducer.loading || load.userReducer.loading ||
        load.searchReducer.loading || load.myPlaylistReducer.loading
        || load.myMediaLibraryReducer.loading || load.mainReducer.loading ||
        load.genreReducer.loading &&
        <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-primary-100 animate-pulse w-screen h-1 rounded-b-md fixed top-0 left-0 z-[10000]"></div>
      }
      <div className={`col-span-3 lg:col-span-4 xl:col-span-4 w-full h-full z-[100] mm:hidden ${!show && "sm:hidden md:hidden"}`}>
        <SideBar />
      </div>
      <div className={`col-[span_17] lg:col-[span_16] xl:col-[span_16] w-full h-full flex flex-col ${isVisible ? "mb-[150px] mm:mb-[25vh]" : "mb-[100px] mm:mb-[10vh]"}`}>
        <Header isShow={show} onShow={() => { setShow(!show) }} />
        <Outlet />
      </div>
      <div className="fixed bottom-0 w-full grid grid-cols-20 z-[100]">
        <div className={`col-[span_3] lg:col-[span_4] xl:col-[span_4] w-full mb-6 mm:hidden sm:hidden md:hidden`}>
          <SideBarItem text={t('Settings')} icon={icon_settings} onClick={() => { nav("websettings") }} />
        </div>
        <div className="col-[span_20] relative mm:rounded-t-2xl overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full backdrop-blur-[22px] blur-[22px] z-[-2]" style={{ backgroundImage: `url('${baseUrl + "Images/Tracks/" + rx.queue?.soundobjs[rx.queue?.playedIndex].track?.image}')` }}></div>
          <div className="absolute top-0 left-0 w-full h-full bg-dark-200/60 z-[-2]"></div>
          {
            isVisible && user ?
              <div>
                <PlayingFooter />
              </div> :
              !user &&
              <div className="w-full h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-primary-100 text-light-100 col-[span_17] lg:col-[span_16] xl:col-[span_16] mm:col-span-full sm:col-span-full md:col-span-full
              flex mm:flex-col sm:flex-col md:flex-col justify-between items-center px-[2%] mm:py-[1%] sm:py-[1%] md:py-[1%]">
                <div className="flex flex-col sm:w-full md:w-full">
                  <p className="text-lg font-bold] mm:hidden">{t("TEMPORALITY USING SOUNDWAVE")}</p>
                  <p>{t("Sign up to listen to playlists, albums and songs for free")}</p>
                </div>
                <div className="flex ml-auto mm:w-full sm:w-full md:w-full">
                  <RedirectButton onClick={() => nav('/authorizate')} text={t("Register & Login - Free")} />
                </div>
              </div>
          }
          <div className={`px-[2%] justify-between z-50 hidden ${user && "mm:flex items-center"} `}>
            <SideBarItem text="" isShowLabel icon={icon_home} onClick={() => { nav(""); }} />
            <SideBarItem text="" isShowLabel icon={icon_search} onClick={() => { nav("/search"); }} />
            <SideBarItem text="" isShowLabel icon={icon_lib} onClick={() => { nav("/medialibrary"); }} />
            <FixedModal trigger={<div className="px-6">
              <img alt="avatar" src={GetUserAvatar(user)} className="rounded-xl cursor-pointer transition-all object-cover w-[40px] h-[40px]"
                onError={(tg: any) => { tg.target.src = defaultAvatarImage }} />
            </div>} />

          </div>
        </div>
      </div>

    </div>
  )
};
