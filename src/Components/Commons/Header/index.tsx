
import { faMusic, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useActions } from "../../../Hooks/useActions";
import { useTypedSelector } from "../../../Hooks/useTypedSelector";
import { baseUrl } from "../../../types";
import { FixedModal } from "../Modals/FixedModal";

export const Header: React.FC = () => {

    const user = useTypedSelector(state => state.userReducer.profile);

    const nav = useNavigate();

    const ImageSrc = user?.avatar.includes("http") ? user.avatar
        : baseUrl + "Images/Users/" + user?.avatar;


    return (
        <div className="py-2 px-10 bg-dark-200/90 flex justify-end overflow-x-hidden sticky top-0">
            <div className="flex gap-7 items-center">
                {
                    user ?
                        user.avatar.length !== 0 ?
                            <div className="flex items-center gap-6">
                                <FontAwesomeIcon className="text-blue-300 text-2xl cursor-pointer" icon={faMusic} onClick={() => { nav("createalbum") }} />
                                <FixedModal trigger={<img alt="avatar" src={ImageSrc} className="rounded-xl cursor-pointer transition-all object-cover" width={40} height={40} />} />
                            </div> :
                            <div className="flex items-center gap-6">
                                <FontAwesomeIcon className="text-blue-300 text-2xl cursor-pointer" icon={faMusic} onClick={() => { nav("createalbum") }} />
                                <FixedModal trigger={<div className="bg-primary-100 rounded-lg px-3 py-1 cursor-pointer">
                                    <h1 className="text-white text-2xl">{user.username.charAt(0)}</h1>
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