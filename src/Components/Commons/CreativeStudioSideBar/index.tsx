import React from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useTypedSelector } from "../../../Hooks/useTypedSelector";
import { Theme } from "../../../types";
import { SettingsBarItem } from "../AccountSettingsSideBar/SettingsBarItem";

const logo = require("../../../Assets/LogoLight.png");
const logoDark = require("../../../Assets/Logo.png");

const icon_playlist = require('../../../Assets/Icons/Playlist.png');
const icon_music = require('../../../Assets/Icons/Music.png');
const icon_disc = require('../../../Assets/Icons/Disc.png');

export const CreativeStudioSideBar: React.FC = () => {

    const history = useLocation();
    const nav = useNavigate();
    const user = useTypedSelector(state => state.userReducer.profile);

    const { theme } = useTypedSelector(state => state.globalReducer);

    return (
        <div className="w-full h-screen sticky top-0 pb-12 pt-6 py-1 flex flex-col gap-12 bg-gradient-to-b from-light-200 to-light-200 dark:from-dark-200 dark:to-dark-200">
            <div className="w-full flex justify-center">
                <img alt="logo" src={theme === Theme.light ? logo : logoDark} className="rounded-xl contrast-125 cursor-pointer transition-all mx-7" height={170} width={170} onClick={() => { nav("/creativestudio") }} />
            </div>
            <div className="flex flex-col h-full z-10">
                <SettingsBarItem text="Playlist" isSelect={history.pathname === "/creativestudio" || history.pathname.includes("overviewplaylist")} icon={icon_playlist}
                    onClick={() => { nav("") }} />
                <SettingsBarItem text="Single" isSelect={history.pathname.includes("/creativestudio/single")} icon={icon_music}
                    onClick={() => { nav("single") }} />
                <SettingsBarItem text="Album" isSelect={history.pathname.includes("/creativestudio/album")} icon={icon_disc}
                    onClick={() => { nav("album") }} />
            </div>
        </div>
    )
}