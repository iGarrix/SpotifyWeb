import { faCheck, faCompactDisc, faEllipsisVertical, faFloppyDisk, faPlay, faTrash, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { baseUrl, IUser, VerifyType } from "../../../../types";
import { SoundOptionModal } from "../../Modals/SoundOptionModal";

import "./style.scss";
import { ISoundHistoryItem } from "./types";



export const SoundHistoryItem : React.FC<ISoundHistoryItem> = ({track, trackCreators, options, onClick}) => {
    return (
        <div className="flex gap-20 cursor-pointer soundhistory" onClick={onClick}>
            <div className="flex gap-4">
                <img alt="image" src={baseUrl + "Images/Tracks/" + track?.image}
                className="w-[124px] h-[124px] bg-cover object-cover bg-no-repeat rounded-lg" />
                <div className="flex flex-col justify-between">
                    <div className="flex flex-col">
                        <h1 className="text-xl">{track?.name}</h1>
                        <p className="text-gray-500 font-medium flex gap-2 items-center">{trackCreators ? trackCreators.map(i => i.username).join(', ') : "Unknown"}
                        <FontAwesomeIcon className="w-[16px] h-[16px] flex items-center text-primary-100 -translate-y-[12%]" icon={trackCreators ? trackCreators[0].verify === VerifyType.verify ? faCheck :
                        trackCreators[0].verify === VerifyType.artist ? faCompactDisc : faUser : faUser}/></p>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-gray-500 font-medium">Duration {track?.duration.replace(",", ":").substring(0, 4)}</p>
                        {
                            track?.create &&
                            <p className="text-gray-500 font-medium">realised {(new Date().getDate() - new Date(track.create).getDate())} days ago</p>
                        }
                    </div>
                </div>
            </div>
            <div className="ml-auto soundhistory_menu">            
                <SoundOptionModal options={options}
                trigger={<FontAwesomeIcon className=" w-[20px] h-[20px] text-blue-400" icon={faEllipsisVertical} />} />
            </div>
        </div>
    )
}