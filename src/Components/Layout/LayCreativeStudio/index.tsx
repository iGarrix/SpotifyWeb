import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useTypedSelector } from "../../../Hooks/useTypedSelector";
import { CreativeStudioSideBar } from "../../Commons/CreativeStudioSideBar";
import { Header } from "../../Commons/Header";
import { SideBarItem } from "../../Commons/SideBar/SideBarItem";

const icon_playlist = require('../../../Assets/Icons/Playlist.png');
const icon_music = require('../../../Assets/Icons/Music.png');
const icon_disc = require('../../../Assets/Icons/Disc.png');
const icon_profile = require('../../../Assets/Icons/PDAccount.png');

export const LayCreativeStudio: React.FC = () => {
    const loading = useTypedSelector(state => state.userReducer.loading);
    const [show, setShow] = useState(true);
    const nav = useNavigate();

    return (
        <div className="grid grid-cols-12 w-full h-full">
            {
                loading &&
                <div className="bg-blue-400 animate-pulse w-screen h-1 rounded-b-md fixed top-0 left-0 z-[10000]"></div>
            }
            <div className={`col-span-2 mm:col-span-full sm:col-span-full md:col-span-full lg:col-span-3 w-full z-[100] mm:hidden ${!show && "sm:hidden md:hidden"}`}>
                <CreativeStudioSideBar />
            </div>
            <div className={`col-span-10 mm:col-span-full sm:col-span-full md:col-span-full lg:col-span-9 w-full h-full flex flex-col relative mb-[15vh]`}>
                <Header isShow={show} onShow={() => { setShow(!show); }} />
                <Outlet />
            </div>
            <div className="fixed bottom-0 w-full justify-between col-span-full z-50 hidden mm:flex bg-light-200 dark:bg-dark-200 rounded-t-xl">
                <SideBarItem text="" isShowLabel icon={icon_playlist} onClick={() => { nav("/creativestudio"); }} />
                <SideBarItem text="" isShowLabel icon={icon_music} onClick={() => { nav("single"); }} />
                <SideBarItem text="" isShowLabel icon={icon_disc} onClick={() => { nav("album"); }} />
                <SideBarItem text="" isShowLabel icon={icon_profile} onClick={() => { nav("/profile"); }} />
            </div>
        </div>
    )
}