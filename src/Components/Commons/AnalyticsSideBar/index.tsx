import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SettingsBarItem } from "../AccountSettingsSideBar/SettingsBarItem";

const logo = require("../../../Assets/LogoLight.png");
const icon_home = require('../../../Assets/Icons/Home.png');
const icon_heart = require('../../../Assets/Icons/Like.png');
const icon_music = require('../../../Assets/Icons/Music.png');

export const AnalyticsSideBar: React.FC = () => {
    const history = useLocation();
    const nav = useNavigate();
    return (
        <div className="w-full h-screen sticky top-0 pb-12 pt-6 py-1 flex flex-col gap-12 bg-gradient-to-b from-light-200 to-light-200">
            <div className="w-full flex justify-center">
                <img alt="logo" src={logo} className="rounded-xl contrast-125 cursor-pointer transition-all mx-7" height={170} width={170} onClick={() => { nav("/") }} />
            </div>
            <div className="flex flex-col h-full z-10">
                <SettingsBarItem isSelect={history.pathname === "/s&a/analytics"}  text={"Overview"} icon={icon_home} onClick={() => { nav("/s&a/analytics"); }} />
                <SettingsBarItem isSelect={history.pathname.includes("/s&a/analytics/audience")}  text={"Audience"} icon={icon_music} onClick={() => { nav("audience") }} />
                <SettingsBarItem isSelect={history.pathname.includes("/s&a/analytics/research")}  text={"Research"} icon={icon_heart} onClick={() => { nav("research") }} />
            </div>
        </div>
    )
}