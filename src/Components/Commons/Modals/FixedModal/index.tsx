import { faBell, faCheck, faCog, faCompactDisc, faRightFromBracket, faSquarePlus, faTriangleExclamation, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useActions } from "../../../../Hooks/useActions";
import { useTypedSelector } from "../../../../Hooks/useTypedSelector";
import { VerifyType } from "../../../../types";
import { DropdownButtonItem } from "../../Buttons/DropdownButtonItem";

import "./style.scss";

export interface IFixedModal {
    trigger: any,
}

export const FixedModal: React.FC<IFixedModal> = ({trigger}) => {

    const fixeddropdown = useRef<HTMLDivElement>(null);
    const [isOpen, setOpen] = useState(false);

    const user = useTypedSelector(state => state.userReducer.profile);
    const {LogoutUser} = useActions();
    const nav = useNavigate();


    const [verifyImage] = useState(user?.verify === VerifyType.profile ? <FontAwesomeIcon className="verifyiconfixed" icon={faUser} width={12} height={12} /> :
    user?.verify === VerifyType.artist ? <FontAwesomeIcon className="verifyiconfixed" icon={faCompactDisc} width={12} height={12} /> : 
    user?.verify === VerifyType.verify ? <FontAwesomeIcon className="verifyiconfixed" icon={faCheck} width={12} height={12} /> : null)
    useEffect(() => {

        
        const handleClick = (event : any) => {
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
            <div onClick={() => {setOpen(!isOpen)}}>
                {trigger}
            </div>
            <div ref={fixeddropdown} className={`${isOpen ? "border-dark-100/20 fixed right-10 top-16 flex flex-col text-white bg-dark-200/60 rounded-sm overflow-hidden" 
            : "hidden"}`}>
                <div className="w-full py-2 px-4 gap-3 flex items-center transition-all hover:bg-primary-100 active:bg-primary-100/20 cursor-pointer mb-1 hoveredverifyfixed" onClick={() => { onNavigateClick("profile") }}>
                    {trigger}
                    <div className="flex flex-col justify-center">
                        <p className="font-medium flex items-center gap-2 select-none">{user?.name} {user?.surname} {verifyImage}</p>
                        <p className="text-gray-400 text-sm select-none">{user?.email}</p>
                    </div>
                </div>
                <div className="flex flex-col mb-1">
                    {!user?.emailconfirm ?
                        <div className="bg-red-500/60 py-2 px-4 flex items-center gap-3 transition-all hover:bg-red-500/90 cursor-pointer">
                            <FontAwesomeIcon className="text-2xl" icon={faTriangleExclamation}/>
                            <h1 className="select-none text-sm">Email don't confirmed</h1>
                        </div> : null
                    }
                </div>
                <DropdownButtonItem text="Notification" notifications={notificate} icon={<FontAwesomeIcon className="text-lg" icon={faBell} />} onClick={() => { onNavigateClick("notifications");}} />
                <DropdownButtonItem text="Creative Studio" icon={<FontAwesomeIcon className="text-lg" icon={faSquarePlus} />} onClick={() => { onNavigateClick("studio"); }} />
                <DropdownButtonItem text="Account Manage" icon={<FontAwesomeIcon className="text-lg" icon={faCog} />} onClick={() => { onNavigateClick("settings") }} />
                <DropdownButtonItem text="Log out" isDanger={true} icon={<FontAwesomeIcon className="text-lg" icon={faRightFromBracket} />} onClick={() => { LogoutUser(); nav("/") }} />
            </div>
        </div>
    )
}