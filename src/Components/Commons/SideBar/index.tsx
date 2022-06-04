import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SideBarItem } from "./SideBarItem";

import { faCompactDisc, faHistory, faHouse, faList, faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useTypedSelector } from "../../../Hooks/useTypedSelector";

const logo = require("../../../Assets/Logo.png");

export const SideBar : React.FC = () => {

    const nav = useNavigate();

    const user = useTypedSelector(state => state.userReducer.profile);

    const [currentItem, setCurrentItem] = useState(window.location.pathname);
    return (
        <div className="w-full h-screen sticky top-0 pb-12 py-1 flex flex-col gap-12 bg-gradient-to-b from-dark-200 to-dark-200/100">
            <div className="w-full flex justify-center">
                <img alt="logo" src={logo} className="rounded-xl contrast-125 cursor-pointer transition-all mx-7" height={170} width={170} onClick={() => {nav("/")}} />
            </div>
            <div className="flex flex-col h-full z-10">
                <SideBarItem text="Home" isSelect={currentItem === "/"} icon={faHouse} onClick={() => {setCurrentItem("/"); nav(""); }} />
                <SideBarItem text="Search" isSelect={currentItem === "/search"} icon={faSearch} onClick={() => {setCurrentItem("/search"); nav("search")}} />
                <SideBarItem text="Genres" isSelect={currentItem === "/genres"} icon={faCompactDisc} onClick={() => {setCurrentItem("/genres"); nav("genres")}} />
                <div className="py-3">
                    <hr />
                </div>
                <SideBarItem text="Create playlist" isSelect={currentItem === "/createplaylist"} icon={faPlus} onClick={() => {setCurrentItem("/createplaylist"); nav("createplaylist")}} />
                <SideBarItem text="History" isSelect={currentItem === "/history"} icon={faHistory} onClick={() => {setCurrentItem("/history"); nav("history")}} />
                <SideBarItem text="Queue" isSelect={currentItem === "/queue"} icon={faList} onClick={() => {setCurrentItem("/queue"); nav("queue")}} />
            </div>
        </div>
    )
}