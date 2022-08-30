import { faCheck, faTriangleExclamation, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useActions } from "../../../../Hooks/useActions";
import { useTypedSelector } from "../../../../Hooks/useTypedSelector";
import { VerifyType } from "../../../../types";
import { DropdownButtonItem } from "../../Buttons/DropdownButtonItem";

import "./style.scss";
import { IFixedModal } from "./types";

const icon_settings = require('../../../../Assets/Icons/Settings.png');
const icon_studio = require('../../../../Assets/Icons/Studio.png');
const icon_notifications = require('../../../../Assets/Icons/Notifications.png');
const icon_logout = require('../../../../Assets/Icons/Logout.png');

const icon_music = require('../../../../Assets/Icons/Music.png');
const icon_playlist = require('../../../../Assets/Icons/Playlist.png');
const icon_HistoryWhite = require('../../../../Assets/Icons/HistoryWhite.png');
const icon_upload = require('../../../../Assets/Icons/Add.png');

export const FixedModal: React.FC<IFixedModal> = ({ trigger }) => {

    const fixeddropdown = useRef<HTMLDivElement>(null);
    const [isOpen, setOpen] = useState(false);

    const user = useTypedSelector(state => state.userReducer.profile);
    const { LogoutUser } = useActions();
    const nav = useNavigate();
    const { t } = useTranslation();

    const [verifyImage] = useState(user?.verify === VerifyType.profile ? <FontAwesomeIcon className="verifyiconfixed" icon={faUser} width={12} height={12} /> :
            user?.verify === VerifyType.verify ? <FontAwesomeIcon className="verifyiconfixed" icon={faCheck} width={12} height={12} /> : null)
    useEffect(() => {


        const handleClick = (event: any) => {
            setOpen(false);
        };

        const element = fixeddropdown.current;

        element?.addEventListener('mouseleave', handleClick);
        return () => {
            element?.removeEventListener('mouseleave', handleClick);
        };
    }, []);


    const onNavigateClick = (path: string) => {
        nav(path);
        setOpen(false);
    }

    const [notificate] = useState(() => {
        const notificationList = localStorage.getItem("notifications");
        if (notificationList) {
            return "5";
        }
        return null;
    });

    return (
        <div className="relative flex flex-col">
            <div onClick={() => { setOpen(!isOpen) }}>
                {trigger}
            </div>
            <div ref={fixeddropdown} onClick={() => {setOpen(false);}}
            className={`${isOpen ? "border-light-100/20 shadow-2xl fixed right-10 top-16 mm:w-auto mm:h-auto mm:rounded-xl mm:right-4 mm:left-4 mm:top-4 mm:bottom-20 flex flex-col text-dark-200 bg-light-200 dark:text-light-200 dark:bg-dark-200 rounded-sm overflow-hidden"
                : "hidden"}`} style={{ zIndex: 30 }}>
                <div className="w-full py-2 px-4 gap-3 flex items-center transition-all hover:text-light-200 hover:bg-primary-100 active:bg-primary-100/20 cursor-pointer mb-1 hoveredverifyfixed" onClick={() => { onNavigateClick("/profile") }}>
                    <div className="scale-110">
                        {trigger}
                    </div>
                    <div className="flex flex-col justify-center">
                        <p className="font-medium text-lg flex items-center gap-2 select-none">{user?.name} {user?.surname} {verifyImage}</p>
                        <p className="text-sm">{user?.email}</p>
                    </div>
                </div>
                <div className="flex flex-col mb-1">
                    {!user?.emailconfirm ?
                        <div className="bg-red-500 py-3 px-4 flex items-center gap-3 transition-all hover:bg-red-400 cursor-pointer text-light-100" onClick={() => {onNavigateClick("/accountsettings/verifyemail")}}>
                            <FontAwesomeIcon className="text-2xl" icon={faTriangleExclamation} />
                            <h1 className="select-none font-[15px]">{t("Email don't confirmed")}</h1>
                        </div> : null
                    }
                </div>
                <DropdownButtonItem text={t("Notification")} notifications={notificate} icon={<img alt="icon" src={icon_notifications} className="w-[22px] h-[22px]" />} onClick={() => { onNavigateClick("/accountsettings/notification"); }} />
                <DropdownButtonItem text={t("Creative Studio")} icon={<img alt="icon" src={icon_studio} className="w-[22px] h-[22px]" />} onClick={() => { onNavigateClick("/creativestudio"); }} />
                <DropdownButtonItem text={t("Account Manage")} icon={<img alt="icon" src={icon_settings} className="w-[22px] h-[22px]" />} onClick={() => { onNavigateClick("/accountsettings") }} />
                <div className="hidden mm:flex flex-col">
                    <hr className="border-light-300 dark:border-dark-100" />
                    <DropdownButtonItem text={t("Genres")} icon={<img alt="icon" src={icon_music} className="w-[22px] h-[22px]" />} onClick={() => { onNavigateClick("/genres") }} />
                    <DropdownButtonItem text={t("History")} icon={<img alt="icon" src={icon_HistoryWhite} className="w-[22px] h-[22px]" />} onClick={() => { onNavigateClick("/history") }} />
                    <DropdownButtonItem text={t("New Playlist")} icon={<img alt="icon" src={icon_playlist} className="w-[22px] h-[22px]" />} onClick={() => { onNavigateClick("/creativestudio") }} />
                    <DropdownButtonItem text={t("Uploading")} icon={<img alt="icon" src={icon_upload} className="w-[22px] h-[22px]" />} onClick={() => { onNavigateClick("/upload") }} />
                    <DropdownButtonItem text={t("Settings")} icon={<img alt="icon" src={icon_settings} className="w-[22px] h-[22px]" />} onClick={() => { onNavigateClick("/websettings") }} />
                    <hr className="border-light-300 dark:border-dark-100" />
                </div>
                <DropdownButtonItem text={t("Log out")} isDanger={true} icon={<img alt="icon" src={icon_logout} className="w-[22px] h-[22p   x]" />} onClick={() => { LogoutUser(); nav("/"); }} />
            </div>
        </div>
    )
}