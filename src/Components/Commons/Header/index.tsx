
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTypedSelector } from "../../../Hooks/useTypedSelector";
import { baseUrl, defaultAvatarImage, GetUserAvatar } from "../../../types";
import { FixedModal } from "../Modals/FixedModal";

const bg = require('../../../Assets/Background1.png');
const icon_upload = require('../../../Assets/Icons/Upload.png');
const logo = require("../../../Assets/LogoLight.png");

export interface IHeaderProps {
    isHead?: boolean,
}

export const Header: React.FC<IHeaderProps> = ({ ...props }) => {

    const user = useTypedSelector(state => state.userReducer.profile);
    const nav = useNavigate();
    return (
        <div className={`py-2 px-10 bg-light-200 flex overflow-x-hidden sticky top-0 z-[100] ${props.isHead ? "justify-between" : "justify-end"}`}>
            <div className={`flex gap-7 items-center ${props.isHead && "w-full"}`}>
                {
                    user ?
                        user.avatar.length !== 0 ?
                            <div className={`flex items-center gap-6 ${props.isHead && "w-full"}`}>
                                {
                                    props.isHead &&
                                    <img alt="logo" src={logo} className="rounded-xl contrast-125 cursor-pointer transition-all mr-auto" height={170} width={170} onClick={() => { nav("/") }} />
                                }
                                <div className="rounded-[10px] p-[8px] flex items-center justify-center bg-cover object-cover cursor-pointer"
                                    onClick={() => { nav('/upload') }}
                                    style={{ backgroundImage: `url('${bg}')` }}>
                                    <img alt="icon" src={icon_upload} className="w-[20px] h-[20px]" />
                                </div>
                                <FixedModal trigger={GetUserAvatar(user) !== "" ? <div className="w-12 h-12 overflow-hidden"><img alt="avatar" src={GetUserAvatar(user)} className="rounded-xl cursor-pointer transition-all object-cover w-full h-full"
                                    onError={(tg: any) => { tg.target.src = defaultAvatarImage }} /></div> :
                                    <div className="bg-gray-600 w-10 h-10 animate-pulse rounded-lg px-3 py-1 cursor-pointer">
                                    </div>} />
                            </div> :
                            <div className={`flex items-center gap-6 ${props.isHead && "w-full"}`}>
                                {
                                    props.isHead &&
                                    <img alt="logo" src={logo} className="rounded-xl contrast-125 cursor-pointer transition-all mr-auto" height={170} width={170} onClick={() => { nav("/") }} />
                                }
                                <div className="rounded-[10px] p-[8px] flex items-center justify-center bg-cover object-cover cursor-pointer"
                                    onClick={() => { nav('/upload') }}
                                    style={{ backgroundImage: `url('${bg}')` }}>
                                    <img alt="icon" src={icon_upload} className="w-[20px] h-[20px]" />
                                </div>
                                <FixedModal trigger={<div className="bg-green-600 w-12 h-12 rounded-lg px-3 py-1 cursor-pointer flex justify-center items-center">
                                    <h1 className="text-white text-2xl select-none">{user.username.charAt(0)}</h1>
                                </div>} />
                            </div>
                        :
                        <div className="flex items-center w-full">
                            {
                                props.isHead &&
                                <img alt="logo" src={logo} className="rounded-xl contrast-125 cursor-pointer transition-all" height={170} width={170} onClick={() => { nav("/") }} />
                            }
                            <FontAwesomeIcon className="text-dark-200 rounded-lg py-1.5 text-2xl cursor-pointer ml-auto" width={40} height={40} icon={faUser} onClick={() => { nav("authorizate") }} />
                        </div>
                }
            </div>
        </div>
    )
}