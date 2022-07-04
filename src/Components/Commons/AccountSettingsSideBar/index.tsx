import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTypedSelector } from "../../../Hooks/useTypedSelector";
import { SettingsBarItem } from "./SettingsBarItem";

const logo = require("../../../Assets/LogoLight.png");

const icon_pdaccount = require('../../../Assets/Icons/PDAccount.png');
const icon_verifyemail = require('../../../Assets/Icons/VerifyEmail.png');
const icon_sendappelation = require('../../../Assets/Icons/SendAppelation.png');
const icon_protected = require('../../../Assets/Icons/Protected.png');
const icon_notify = require('../../../Assets/Icons/Notifications.png');
const icon_trash = require('../../../Assets/Icons/Trash.png');

export const AccountSettingsSideBar: React.FC = () => {

    const nav = useNavigate();
    const [currentItem, setCurrentItem] = useState(window.location.pathname);
    const user = useTypedSelector(state => state.userReducer.profile);

    return (
        <div className="w-full h-screen sticky top-0 pb-12 pt-6 py-1 flex flex-col gap-12 bg-gradient-to-b from-light-200 to-light-200/100">
            <div className="w-full flex justify-center">
                <img alt="logo" src={logo} className="rounded-xl contrast-125 cursor-pointer transition-all mx-7" height={170} width={170} onClick={() => { nav("/") }} />
            </div>
            <div className="flex flex-col h-full z-10">
                <SettingsBarItem text="Update personal data" isSelect={currentItem === "/accountsettings"} icon={icon_pdaccount}
                    onClick={() => { setCurrentItem("/accountsettings"); nav(""); }} />
                <SettingsBarItem text="Verify account" isSelect={currentItem === "/accountsettings/verifyaccount"} icon={icon_protected}
                    onClick={() => { setCurrentItem("/accountsettings/verifyaccount"); nav("verifyaccount") }} />
                {
                    user && !user.emailconfirm &&
                    <SettingsBarItem text="Verify email" isSelect={currentItem === "/accountsettings/verifyemail"} icon={icon_verifyemail}
                        onClick={() => { setCurrentItem("/accountsettings/verifyemail"); nav("verifyemail") }} />
                }
                <SettingsBarItem text="Send appelation" isSelect={currentItem === "/accountsettings/sendappelation"} icon={icon_sendappelation}
                    onClick={() => { setCurrentItem("/accountsettings/sendappelation"); nav("sendappelation") }} />
                <SettingsBarItem text="Notification" isSelect={currentItem === "/accountsettings/notification"} icon={icon_notify}
                    onClick={() => { setCurrentItem("/accountsettings/notification"); nav("notification") }} />
                <SettingsBarItem text="Delete account" isSelect={currentItem === "/accountsettings/deleteaccount"} icon={icon_trash}
                    onClick={() => { setCurrentItem("/accountsettings/deleteaccount"); nav("deleteaccount") }} />
            </div>
        </div>
    )
}