import { faEllipsisVertical, faHeart, faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import "./style.scss";

export interface ISoundItem {
    name: any,
    duration: any,
    isPlay: boolean,
    isLiked: boolean,
    onClick: () => void,
}

export const SoundItem : React.FC<ISoundItem> = ({name, duration, isLiked, isPlay, onClick}) => {
    return (
        <div className={`flex items-center justify-between rounded-xl px-4 py-2 ${isPlay ? `bg_select_sound` : "bg-dark-100"}`}>
            <div className="flex gap-6 items-center">
                {
                    isPlay ? 
                    <FontAwesomeIcon className="text-2xl cursor-pointer transition-all" icon={faPause} onClick={onClick} />
                    :
                    <FontAwesomeIcon className="text-2xl cursor-pointer transition-all" icon={faPlay} onClick={onClick} />
                }
                <h1 className="text-medium">{name}</h1>
            </div>
            <div className="flex gap-4 items-center">
                <h1 className="text-thin">{duration}</h1>
                <FontAwesomeIcon className={`text-2xl ${isLiked ? "text-red-500" : "hover:text-blue-500"} cursor-pointer transition-all`} icon={faHeart} />
                <FontAwesomeIcon className="text-2xl hover:text-black cursor-pointer transition-all" icon={faEllipsisVertical} />
            </div>
        </div>
    )
}