import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SideBarItem } from "../SideBar/SideBarItem";

const logo = require("../../../Assets/Logo.png");
const icon_home = require('../../../Assets/Icons/Home.png');
const icon_heart = require('../../../Assets/Icons/Like.png');
const icon_music = require('../../../Assets/Icons/Music.png');

export const AnalyticsSideBar: React.FC = () => {
    const nav = useNavigate();
    const [currentItem, setCurrentItem] = useState(window.location.pathname);
    return (
        <div className="w-full h-screen sticky top-0 pb-12 pt-6 py-1 flex flex-col gap-12 bg-gradient-to-b from-dark-200 to-dark-200/100">
            <div className="w-full flex justify-center">
                <img alt="logo" src={logo} className="rounded-xl contrast-125 cursor-pointer transition-all mx-7" height={170} width={170} onClick={() => { nav("/") }} />
            </div>
            <div className="flex flex-col h-full z-10 gap-2">
                <SideBarItem text="Overview" isSelect={currentItem === "/s&a/analytics"} icon={icon_home} onClick={() => { setCurrentItem("/s&a/analytics"); nav("/s&a/analytics"); }} />
                <SideBarItem text="Audience" isSelect={currentItem === "/s&a/analytics/audience"} icon={icon_music} onClick={() => { setCurrentItem("/s&a/analytics/audience"); nav("audience") }} />
                <SideBarItem text="Research" isSelect={currentItem === "/s&a/analytics/research"} icon={icon_heart} onClick={() => { setCurrentItem("/s&a/analytics/research"); nav("research") }} />
            </div>
        </div>
    )
}