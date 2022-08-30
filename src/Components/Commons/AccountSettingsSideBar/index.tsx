import React from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useTypedSelector } from "../../../Hooks/useTypedSelector";
import { Theme } from "../../../types";
import { SettingsBarItem } from "./SettingsBarItem";

const logo = require("../../../Assets/LogoLight.png");
const logoDark = require("../../../Assets/Logo.png");

const icon_pdaccount = require('../../../Assets/Icons/PDAccount.png');
const icon_verifyemail = require('../../../Assets/Icons/VerifyEmail.png');
const icon_sendappelation = require('../../../Assets/Icons/SendAppelation.png');
const icon_protected = require('../../../Assets/Icons/Protected.png');
const icon_notify = require('../../../Assets/Icons/Notifications.png');
const icon_trash = require('../../../Assets/Icons/Trash.png');

export const AccountSettingsSideBar: React.FC = () => {

    const history = useLocation();
    const nav = useNavigate();
    const user = useTypedSelector(state => state.userReducer.profile);
    const { theme } = useTypedSelector(state => state.globalReducer);
    const { t } = useTranslation();
    return (
        <div className="w-full h-screen mm:h-auto sm:h-auto sticky mm:block sm:block top-0 pb-12 mm:pb-2 sm:pb-2 pt-6 py-1 flex flex-col gap-12 bg-gradient-to-b from-light-100 to-light-200/100 dark:from-dark-200 dark:to-dark-200">
            <div className="w-full flex justify-center pb-[5%]">
                <img alt="logo" src={theme === Theme.light ? logo : logoDark} className="rounded-xl contrast-125 cursor-pointer transition-all mx-7" height={170} width={170} onClick={() => { nav("/accountsettings") }} />
            </div>
            <div className="flex flex-col h-full z-10">
                <SettingsBarItem text={t("Personal data")} isSelect={history.pathname === "/accountsettings"} icon={icon_pdaccount}
                    onClick={() => { nav(""); }} />
                <SettingsBarItem text={t("Verify account")} isSelect={history.pathname.includes("/accountsettings/verifyaccount")} icon={icon_protected}
                    onClick={() => { nav("verifyaccount") }} />
                {
                    user && !user.emailconfirm &&
                    <SettingsBarItem text={t("Verify email")} isSelect={history.pathname.includes("/accountsettings/verifyemail")} icon={icon_verifyemail}
                        onClick={() => { nav("verifyemail") }} />
                }
                <SettingsBarItem text={t("Send appelation")} isSelect={history.pathname.includes( "/accountsettings/sendappelation")} icon={icon_sendappelation}
                    onClick={() => { nav("sendappelation") }} />
                <SettingsBarItem text={t("Notification")} isSelect={history.pathname.includes("/accountsettings/notification")} icon={icon_notify}
                    onClick={() => { nav("notification") }} />
                <SettingsBarItem text={t("Delete account")} isSelect={history.pathname.includes("/accountsettings/deleteaccount")} icon={icon_trash}
                    onClick={() => { nav("deleteaccount") }} />
            </div>
        </div>
    )
}