import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SideBarItem } from "./SideBarItem";

import { faCog, faCompactDisc, faHistory, faHouse, faList, faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";

const logo = require("../../../Assets/Logo.png");

export const SideBar : React.FC = () => {

    const nav = useNavigate();

    const [currentItem, setCurrentItem] = useState("Home");

    return (
        <div className="w-full h-screen sticky top-0 pb-12 py-3 flex flex-col gap-12 bg-gradient-to-b from-dark-200 to-dark-200/90">
            <img alt="logo" src={logo} className="rounded-xl contrast-125 cursor-pointer transition-all mx-7" height={170} width={170} onClick={() => {nav("/")}} />
            <div className="flex flex-col h-full z-10">
                <SideBarItem text="Home" isSelect={currentItem === "Home"} icon={faHouse} onClick={() => {setCurrentItem("Home"); nav(""); }} />
                <SideBarItem text="Search" isSelect={currentItem === "Search"} icon={faSearch} onClick={() => {setCurrentItem("Search"); nav("search")}} />
                <SideBarItem text="Genres" isSelect={currentItem === "Genres"} icon={faCompactDisc} onClick={() => {setCurrentItem("Genres"); nav("genres")}} />
                <div className="py-3">
                    <hr />
                </div>
                <SideBarItem text="Quick playlist" isSelect={currentItem === "QuickPlaylist"} icon={faPlus} onClick={() => {setCurrentItem("QuickPlaylist"); nav("createplaylist")}} />
                <SideBarItem text="History" isSelect={currentItem === "History"} icon={faHistory} onClick={() => {setCurrentItem("History"); nav("history")}} />
                <SideBarItem text="Queue" isSelect={currentItem === "Queue"} icon={faList} onClick={() => {setCurrentItem("Queue"); nav("queue")}} />
                <div className="mt-auto"></div>
                {/* <SideBarItem text="Settings" isSelect={currentItem === "Settings"} icon={faCog} onClick={() => {setCurrentItem("Settings"); nav("settings")}} /> */}
            </div>
        </div>
    )
}