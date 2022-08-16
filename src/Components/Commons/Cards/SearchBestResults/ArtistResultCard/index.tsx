import { faCheck, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { defaultAvatarImage } from "../../../../../types";
import { IArtistResultCard } from "./types";

import "./style.scss";

export const ArtistResultCard: React.FC<IArtistResultCard> = ({ ...props }) => {
    return (
        <div className="w-full h-full rounded-xl bg-light-100 dark:bg-dark-200 flex flex-col gap-6 py-6 px-8 mm:px-3 mm:py-4 overflow-hidden cursor-pointer transition-all mainresultcard relative">
            <div className="absolute top-0 left-0 w-full h-full" onClick={props.onNavigate}></div>
            <img alt="image" src={props.image}
                className="rounded-xl w-[164px] h-[164px] bg-cover object-cover shadow-xl select-none" onError={(tg: any) => { tg.target.src = defaultAvatarImage }} />
            <div className="flex justify-between gap-[128px] mm:gap-0 mm:w-full">
                <div className="flex flex-col justify-between">
                    <div className="flex flex-col">
                        <p className="text-2xl font-medium">{props.name} {props.surname}</p>
                    </div>
                    <div className="flex gap-4 items-center select-none">
                        <p className="text-lg font-medium text-dark-200/90 dark:text-light-200">{props.nickname}</p>
                        <p className="text-light-100 dark:text-dark-200 bg-dark-200/90 dark:bg-light-200 rounded-xl px-4 py-0.5">{props.type}</p>
                    </div>
                </div>
                <div className="flex items-end select-none z-10">
                        <FontAwesomeIcon icon={props.type === "Artist" ? faCheck : faUser} className={`cursor-pointer text-xl text-dark-200/90 dark:text-light-200
                        mainresultbutton 
                        border border-dark-200/60 dark:border-light-200/90 py-2.5 px-3 text-center rounded-full ${props.onSelect && "hover:scale-105"}`} onClick={props.onSelect} />
                </div>
            </div>
        </div>
    )
}