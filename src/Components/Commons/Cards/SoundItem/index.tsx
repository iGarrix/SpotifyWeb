import { faEllipsisVertical, faHeart, faPause, faPlay, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Guid } from "guid-typescript";
import moment from "moment";
import React from "react";
import { useNavigate } from "react-router-dom";
import { AddToQueue } from "../../../../Helpers/QueueHelper";
import { useActions } from "../../../../Hooks/useActions";
import { useTypedSelector } from "../../../../Hooks/useTypedSelector";
import { baseUrl } from "../../../../types";
import { SoundOptionModal } from "../../Modals/SoundOptionModal";

import "./style.scss";
import { ISoundItem } from "./types";

const icon_pause = require('../../../../Assets/Icons/Pause.png');
const icon_play = require('../../../../Assets/Icons/Play.png');
const icon_like = require('../../../../Assets/Icons/Like.png');
const icon_likered = require('../../../../Assets/Icons/LikeRed.png');

export const SoundItem: React.FC<ISoundItem> = ({ item, isLiked, isPlay, onClick }) => {

    const { initQueue } = useActions();
    const nav = useNavigate();
    const play = useTypedSelector(state => state.playingReducer.queue?.isPlay);
    const user = useTypedSelector(state => state.userReducer.profile);
    const addtoqueue = async (isPlay: any) => {
        const response = AddToQueue(item, isPlay);
        if (response) {
            await initQueue(response);
        }
    }
    const save = () => {

    }

    return (
        <div className={`flex items-center gap-3 rounded-[18px] px-4 py-[12px] bg-no-repeat object-cover bg-cover ${isPlay ? `bg_select_sound text-light-200` : "bg-light-200 text-dark-200"}`}>
            <div className="flex gap-6 items-center">
                {
                    isPlay ?
                        // <FontAwesomeIcon className="text-2xl cursor-pointer transition-all" icon={faPause} onClick={onClick} />
                        <img alt="icon" className="w-[25px] cursor-pointer" src={icon_pause} onClick={() => {user && onClick()}} />
                        :
                        <img alt="icon" className="w-[25px] cursor-pointer invert" src={icon_play} onClick={() => {user && onClick()}} />
                    // <FontAwesomeIcon className="text-2xl cursor-pointer transition-all" icon={faPlay} onClick={onClick} />
                }
                <div>
                    <img alt="icon" className="w-[40px] h-[40px] rounded-sm bg-no-repeat object-cover bg-cover cursor-pointer" src={baseUrl + "Images/Tracks/" + item.track?.image} />
                </div>
                <h1 className="text-medium">
                    {
                        item.trackCreators?.map(i => i.username).map((i: any, index: number) => {
                            return (
                                <span key={Guid.create().toString()}
                                    className="cursor-pointer hover:text-blue-400" onClick={() => { nav("/overview/" + i, { replace: false }) }}>{i}{item.trackCreators?.length && index < item.trackCreators.length - 1 ? ", " : " "}</span>
                            )
                        })
                    }
                    <span>- {item.track?.name}</span>
                </h1>
            </div>
            <div className="flex gap-4 items-center justify-between ml-auto">
                {
                    item.track &&
                    <h1 className="text-thin w-[48px]">{moment.utc(Number.parseFloat(item.track.duration) * 1000).format("mm:ss")}</h1>
                }
                {/* <FontAwesomeIcon className={`text-2xl ${isLiked ? "text-red-500" : "hover:text-blue-500"} cursor-pointer transition-all" translate-y-[-1px]`} icon={faHeart} /> */}
                {
                    isLiked ?
                        <img alt="icon" className="w-[25px] cursor-pointer" src={icon_likered} />
                        :
                        <img alt="icon" className="w-[25px] cursor-pointer invert" src={icon_like} />
                }
                <SoundOptionModal options={[{
                    title: "Add to queue", icon: <FontAwesomeIcon icon={faPlus} />, onClick: () => { addtoqueue(play) }
                }]}
                    trigger={<FontAwesomeIcon className="text-2xl hover:text-black cursor-pointer transition-all translate-y-[1px]" icon={faEllipsisVertical} />} />
            </div>
        </div>
    )
}