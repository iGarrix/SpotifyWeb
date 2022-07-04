import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SideBarItem } from "./SideBarItem";

const logo = require("../../../Assets/LogoLight.png");
const icon_home = require('../../../Assets/Icons/Home.png');
const icon_search = require('../../../Assets/Icons/Search.png');
const icon_music = require('../../../Assets/Icons/Music.png');
const icon_library = require('../../../Assets/Icons/Library.png');
const icon_playlist = require('../../../Assets/Icons/Playlist.png');
const icon_history = require('../../../Assets/Icons/HistoryWhite.png');

export const SideBar: React.FC = () => {
    const nav = useNavigate();
    const [currentItem, setCurrentItem] = useState(window.location.pathname);
    return (
        <div className="w-full h-screen sticky top-0 pb-12 pt-6 py-1 flex flex-col gap-12 bg-gradient-to-b from-light-200 to-light-200/100">
            <div className="w-full flex justify-center">
                <img alt="logo" src={logo} className="rounded-xl contrast-125 cursor-pointer transition-all mx-7" height={170} width={170} onClick={() => { nav("/") }} />
            </div>
            <div className="flex flex-col h-full z-10">
                <SideBarItem text="Home" isSelect={currentItem === "/"} icon={icon_home} onClick={() => { setCurrentItem("/"); nav(""); }} />
                <SideBarItem text="Search" isSelect={currentItem === "/search"} icon={icon_search} onClick={() => { setCurrentItem("/search"); nav("search") }} />
                <SideBarItem text="Genres" isSelect={currentItem === "/genres"} icon={icon_music} onClick={() => { setCurrentItem("/genres"); nav("genres") }} />
                <SideBarItem text="History" isSelect={currentItem === "/history"} icon={icon_history} onClick={() => { setCurrentItem("/history"); nav("history") }} />
                <div className="py-3">
                    <hr className="border-light-100" />
                </div>
                <SideBarItem text="Create playlist" isSelect={currentItem === "/createplaylist"} icon={icon_playlist} onClick={() => { setCurrentItem("/createplaylist"); nav("createplaylist") }} />
                <SideBarItem text="My media library" isSelect={currentItem === "/medialibrary"} icon={icon_library} onClick={() => { setCurrentItem("/medialibrary"); nav("medialibrary") }} />
            </div>
        </div>
    )
}