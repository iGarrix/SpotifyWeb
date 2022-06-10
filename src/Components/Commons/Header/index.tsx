
import { faUpload, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTypedSelector } from "../../../Hooks/useTypedSelector";
import { baseUrl } from "../../../types";
import { FixedModal } from "../Modals/FixedModal";

export const Header: React.FC = () => {

    const user = useTypedSelector(state => state.userReducer.profile);

    const nav = useNavigate();

    const [ImageSrc, setImageSrc] = useState("");

    useEffect(() => {
        if (user) {
            setImageSrc(user.avatar.includes("http") ? user.avatar
            : baseUrl + "Images/Users/" + user.avatar);
        }

    }, [user]);
        


    return (
        <div className="py-2 px-10 bg-dark-200/90 flex justify-end overflow-x-hidden sticky top-0 z-10">
            <div className="flex gap-7 items-center">
                {
                    user ?
                        user.avatar.length !== 0 ?
                            <div className="flex items-center gap-6">
                                <FontAwesomeIcon className="text-blue-300 text-2xl cursor-pointer" icon={faUpload} onClick={() => { nav("studio") }} />
                                <FixedModal trigger={ImageSrc !== "" ? <div className="w-12 h-12 overflow-hidden"><img alt="avatar" src={ImageSrc} className="rounded-xl cursor-pointer transition-all object-cover w-full h-full" /></div> : 
                                <div className="bg-gray-600 w-10 h-10 animate-pulse rounded-lg px-3 py-1 cursor-pointer">
                                </div>} />
                            </div> :
                            <div className="flex items-center gap-6">
                                <FontAwesomeIcon className="text-blue-300 text-2xl cursor-pointer" icon={faUpload} onClick={() => { nav("studio") }} />
                                <FixedModal trigger={<div className="bg-green-600 w-12 h-12 rounded-lg px-3 py-1 cursor-pointer flex justify-center items-center">
                                    <h1 className="text-white text-2xl select-none">{user.username.charAt(0)}</h1>
                                </div>} />             
                            </div>
                        :
                        <FontAwesomeIcon className="text-white rounded-lg py-1.5 text-2xl cursor-pointer" width={40} height={40} icon={faUser} onClick={() => { nav("authorizate") }} />
                    // <div className="flex items-center gap-6 bg-white py-1.5 rounded-lg">
                    // </div>
                }
            </div>
        </div>
    )
}