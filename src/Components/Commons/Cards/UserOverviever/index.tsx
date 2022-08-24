import React from "react";
import { useNavigate } from "react-router-dom";
import { defaultAvatarImage, GetUserAvatarSimple } from "../../../../types";
import { IUserOverviever } from "./types";


export const UserOverviever: React.FC<IUserOverviever> = ({...props}) => {
    const nav = useNavigate();
    return (
        <div className="flex flex-col mm:items-center cursor-pointer text-dark-200 dark:text-light-200 gap-1 mm:w-auto" onClick={() => { nav("/overview/" + props.username) }}>
            <img alt="artist" src={GetUserAvatarSimple(props.avatar)}
                onError={(tg: any) => { tg.target.src = defaultAvatarImage }}
                className="w-[164px] h-[164px]  bg-cover object-cover bg-no-repeat rounded-xl transition-all hover:shadow-xl" />
            <p className="text-center font-medium">{props.username}</p>
        </div>
    )
}