import { faEllipsisVertical, faFloppyDisk, faHeart, faPause, faPlay, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { AddToQueue } from "../../../Helpers/QueueHelper";
import { useActions } from "../../../Hooks/useActions";
import { SoundOptionModal } from "../Modals/SoundOptionModal";

import "./style.scss";
import { ISoundItem } from "./types";



export const SoundItem: React.FC<ISoundItem> = ({ item, isLiked, isPlay, onClick }) => {

    const { initQueue } = useActions();

    const addtoqueue = async () => {
        const response = AddToQueue(item);
        if (response) {
            await initQueue(response);
        }
    }

    const save = () => {

    }

    return (
        <div className={`flex items-center justify-between rounded-[18px] px-4 py-[12px] bg-no-repeat ${isPlay ? `bg_select_sound` : "bg-dark-100"}`}>
            <div className="flex gap-6 items-center">
                {
                    isPlay ?
                        <FontAwesomeIcon className="text-2xl cursor-pointer transition-all" icon={faPause} onClick={onClick} />
                        :
                        <FontAwesomeIcon className="text-2xl cursor-pointer transition-all" icon={faPlay} onClick={onClick} />
                }
                <h1 className="text-medium">{`${item.trackCreators?.map(i => i.username).join(", ")} - ${item.track?.name}`}</h1>
            </div>
            <div className="flex gap-4 items-center">
                <h1 className="text-thin">{item.track?.duration.replace(",", ":").substring(0, 4)}</h1>
                <FontAwesomeIcon className={`text-2xl ${isLiked ? "text-red-500" : "hover:text-blue-500"} cursor-pointer transition-all`} icon={faHeart} />
                <SoundOptionModal options={[{
                    title: "Add to queue", icon: <FontAwesomeIcon icon={faPlus} />, onClick: addtoqueue
                }, 
                {title: "Save", icon: <FontAwesomeIcon icon={faFloppyDisk} />, onClick: save}]} 
                trigger={<FontAwesomeIcon className="text-2xl hover:text-black cursor-pointer transition-all" icon={faEllipsisVertical} />} />
            </div>
        </div>
    )
}