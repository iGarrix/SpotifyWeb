import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Outlet, useNavigate } from "react-router-dom";
import { useTypedSelector } from "../../../../Hooks/useTypedSelector";
import { VerifyType } from "../../../../types";
import { ProfileButton } from "../../../Commons/Buttons/ProfileButton";

export const Notifications: React.FC = () => {
    const nav = useNavigate();
    const { t } = useTranslation();
    const user = useTypedSelector(state => state.userReducer.profile);
    const [currentItem, setCurrentItem] = useState(window.location.pathname);
    return (
        <div className="flex flex-col h-full py-[50px] px-[5%] text-dark-200 dark:text-light-200 gap-[20px]">
            <div className="flex w-full mm:justify-center sm:justify-center md:justify-center">
                <h1 className="font-bold text-3xl mm:text-2xl mm:text-center sm:text-center md:text-center">{t("Notification")}</h1>
            </div>
            {
                user?.verify === VerifyType.profile &&
                <div className="bg-light-200 dark:bg-dark-100 flex justify-center rounded-md items-center py-3">
                    <div className="flex gap-6 items-center mm:justify-center sm:justify-center flex-wrap px-[5%]">
                        <h2 className="text-xl text-center">{t("You do not have a verified account")}</h2>
                        <ProfileButton text={t("Verify now")} isSelect={true} onClick={() => { nav("../verifyaccount") }} />
                    </div>
                </div>
            }
            <div className="flex flex-wrap justify-center items-center rounded-md gap-[20px]">
                <p className={`font-medium text-lg cursor-pointer transition-all ${currentItem === "/accountsettings/notification" && "text-blue-400"}`} onClick={() => { setCurrentItem('/accountsettings/notification'); nav('') }}>{t("Logs in account")}</p>
                <p>/</p>
                <p className={`font-medium text-lg cursor-pointer transition-all ${currentItem === "/accountsettings/notification/actions" && "text-blue-400"}`} onClick={() => { setCurrentItem('/accountsettings/notification/actions'); nav('actions') }}>{t("Account actions")}</p>
                <p>/</p>
                <p className={`font-medium text-lg cursor-pointer transition-all ${currentItem === "/accountsettings/notification/appeal" && "text-blue-400"}`} onClick={() => { setCurrentItem('/accountsettings/notification/appeal'); nav('appeal') }}>{t("Appelations")}</p>
                <p>/</p>
                <p className={`font-medium text-lg cursor-pointer transition-all ${currentItem === "/accountsettings/notification/invites" && "text-blue-400"}`} onClick={() => { setCurrentItem('/accountsettings/notification/invites'); nav('invites') }}>{t("Invites")}</p>
                <p>/</p>
                <p className={`font-medium text-lg cursor-pointer transition-all ${currentItem === "/accountsettings/notification/status" && "text-blue-400"}`} onClick={() => { setCurrentItem('/accountsettings/notification/status'); nav('status') }}>{t("Status")}</p>
            </div>
            <Outlet />
        </div>
    )
}