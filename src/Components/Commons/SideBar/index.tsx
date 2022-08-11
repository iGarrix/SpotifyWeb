import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTypedSelector } from "../../../Hooks/useTypedSelector";
import { Theme } from "../../../types";
import { SideBarItem } from "./SideBarItem";

const logo = require("../../../Assets/LogoLight.png");
const logoDark = require("../../../Assets/Logo.png");
const icon_home = require('../../../Assets/Icons/Home.png');
const icon_search = require('../../../Assets/Icons/Search.png');
const icon_music = require('../../../Assets/Icons/Music.png');
const icon_library = require('../../../Assets/Icons/Library.png');
const icon_playlist = require('../../../Assets/Icons/Playlist.png');
const icon_history = require('../../../Assets/Icons/HistoryWhite.png');

export const SideBar: React.FC = () => {
    const history = useLocation();
    const nav = useNavigate();
    const { theme } = useTypedSelector(state => state.globalReducer);
    return (
        <div className="w-full h-screen sticky top-0 pb-12 pt-6 py-1 flex flex-col gap-12 bg-gradient-to-b from-light-200 to-light-200/100 dark:from-dark-200 dark:to-dark-200">
            <div className="w-full flex justify-center">
                <img alt="logo" src={theme === Theme.light ? logo : logoDark} className="rounded-xl contrast-125 cursor-pointer transition-all mx-7" height={170} width={170} onClick={() => { nav("/") }} />
            </div>
            <div className="flex flex-col h-full z-10">
                <SideBarItem text="Home" isSelect={history.pathname === "/"} icon={icon_home} onClick={() => { nav(""); }} />
                <SideBarItem text="Search" isSelect={history.pathname.includes("/search")} icon={icon_search} onClick={() => { nav("search") }} />
                <SideBarItem text="Genres" isSelect={history.pathname.includes("/genres")} icon={icon_music} onClick={() => { nav("genres") }} />
                <SideBarItem text="History" isSelect={history.pathname.includes("/history")} icon={icon_history} onClick={() => { nav("history") }} />
                <div className="py-3">
                    <hr className="border-light-300 dark:border-dark-100" />
                </div>
                <SideBarItem text="Create playlist" isSelect={history.pathname.includes("/creativestudio")} icon={icon_playlist} onClick={() => { nav("creativestudio") }} />
                <SideBarItem text="My media library" isSelect={history.pathname.includes("/medialibrary")} icon={icon_library} onClick={() => { nav("medialibrary") }} />
            </div>
        </div>
    )
}   