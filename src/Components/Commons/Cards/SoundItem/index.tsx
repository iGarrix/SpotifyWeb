import { faEllipsisVertical, faFloppyDisk, faHeart, faPause, faPlay, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { AddToQueue } from "../../../../Helpers/QueueHelper";
import { useActions } from "../../../../Hooks/useActions";
import { useTypedSelector } from "../../../../Hooks/useTypedSelector";
import { SoundOptionModal } from "../../Modals/SoundOptionModal";

import "./style.scss";
import { ISoundItem } from "./types";



export const SoundItem: React.FC<ISoundItem> = ({ item, isLiked, isPlay, onClick }) => {

    const { initQueue } = useActions();

    const play = useTypedSelector(state => state.playingReducer.queue?.isPlay);

    const addtoqueue = async (isPlay: any) => {
        const response = AddToQueue(item, isPlay);
        if (response) {
            await initQueue(response);
        }
    }

    const save = () => {

    }

    return (
        <div className={`flex items-center gap-3 rounded-[18px] px-4 py-[12px] bg-no-repeat object-cover bg-cover ${isPlay ? `bg_select_sound` : "bg-dark-100"}`}>
            <div className="flex gap-6 items-center">
                {
                    isPlay ?
                        <FontAwesomeIcon className="text-2xl cursor-pointer transition-all" icon={faPause} onClick={onClick} />
                        :
                        <FontAwesomeIcon className="text-2xl cursor-pointer transition-all" icon={faPlay} onClick={onClick} />
                }
                <h1 className="text-medium">{`${item.trackCreators?.map(i => i.username).join(", ")} - ${item.track?.name}`}</h1>
            </div>
            <div className="flex gap-4 items-center justify-between ml-auto">
                {
                    item.track &&
                    <h1 className="text-thin w-[48px]">{moment.utc(Number.parseFloat(item.track.duration) * 1000).format("mm:ss")}</h1>
                }
                <FontAwesomeIcon className={`text-2xl ${isLiked ? "text-red-500" : "hover:text-blue-500"} cursor-pointer transition-all" translate-y-[-1px]`} icon={faHeart} />
                <SoundOptionModal options={[{
                    title: "Add to queue", icon: <FontAwesomeIcon icon={faPlus} />, onClick: () => {addtoqueue(play) }
                }]} 
                trigger={<FontAwesomeIcon className="text-2xl hover:text-black cursor-pointer transition-all translate-y-[1px]" icon={faEllipsisVertical} />} />
            </div>
        </div>
    )
}