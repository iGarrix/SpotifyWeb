import { faCheck, faTriangleExclamation, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
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

export const FixedModal: React.FC<IFixedModal> = ({ trigger }) => {

    const fixeddropdown = useRef<HTMLDivElement>(null);
    const [isOpen, setOpen] = useState(false);

    const user = useTypedSelector(state => state.userReducer.profile);
    const { LogoutUser } = useActions();
    const nav = useNavigate();


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
            <div ref={fixeddropdown} className={`${isOpen ? "border-light-100/20 shadow-xl fixed right-10 top-16 flex flex-col text-dark-200 bg-light-200 dark:text-light-200 dark:bg-dark-200 rounded-sm overflow-hidden"
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
                            <h1 className="select-none font-[15px]">Email don't confirmed</h1>
                        </div> : null
                    }
                </div>
                <DropdownButtonItem text="Notification" notifications={notificate} icon={<img alt="icon" src={icon_notifications} className="w-[22px] h-[22px]" />} onClick={() => { onNavigateClick("/accountsettings/notification"); }} />
                <DropdownButtonItem text="Creative Studio" icon={<img alt="icon" src={icon_studio} className="w-[22px] h-[22px]" />} onClick={() => { onNavigateClick("/creativestudio"); }} />
                <DropdownButtonItem text="Account Manage" icon={<img alt="icon" src={icon_settings} className="w-[22px] h-[22px]" />} onClick={() => { onNavigateClick("/accountsettings") }} />
                <DropdownButtonItem text="Log out" isDanger={true} icon={<img alt="icon" src={icon_logout} className="w-[22px] h-[22p   x]" />} onClick={() => { LogoutUser(); nav("/"); }} />
            </div>
        </div>
    )
}