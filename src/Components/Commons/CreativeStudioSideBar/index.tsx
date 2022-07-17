import React from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useTypedSelector } from "../../../Hooks/useTypedSelector";
import { SettingsBarItem } from "../AccountSettingsSideBar/SettingsBarItem";

const logo = require("../../../Assets/LogoLight.png");

const icon_pdaccount = require('../../../Assets/Icons/PDAccount.png');
const icon_verifyemail = require('../../../Assets/Icons/VerifyEmail.png');
const icon_sendappelation = require('../../../Assets/Icons/SendAppelation.png');
const icon_protected = require('../../../Assets/Icons/Protected.png');
const icon_notify = require('../../../Assets/Icons/Notifications.png');
const icon_trash = require('../../../Assets/Icons/Trash.png');

export const CreativeStudioSideBar: React.FC = () => {

    const history = useLocation();
    const nav = useNavigate();
    const user = useTypedSelector(state => state.userReducer.profile);

    return (
        <div className="w-full h-screen sticky top-0 pb-12 pt-6 py-1 flex flex-col gap-12 bg-gradient-to-b from-light-200 to-light-200/100">
            <div className="w-full flex justify-center">
                <img alt="logo" src={logo} className="rounded-xl contrast-125 cursor-pointer transition-all mx-7" height={170} width={170} onClick={() => { nav("/creativestudio") }} />
            </div>
            <div className="flex flex-col h-full z-10">
                <SettingsBarItem text="Playlist" isSelect={history.pathname === "/creativestudio"} icon={icon_sendappelation}
                    onClick={() => { nav("") }} />
                <SettingsBarItem text="Single" isSelect={history.pathname.includes("/creativestudio/single")} icon={icon_notify}
                    onClick={() => { nav("single") }} />
                <SettingsBarItem text="Album" isSelect={history.pathname.includes("/creativestudio/album")} icon={icon_trash}
                    onClick={() => { nav("album") }} />
            </div>
        </div>
    )
}