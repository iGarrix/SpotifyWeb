import { faCheck, faEllipsisVertical, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Guid } from "guid-typescript";
import moment from "moment";
import React from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl, dayDiff, defaultAlbumImage, VerifyType } from "../../../../types";
import { SoundOptionModal } from "../../Modals/SoundOptionModal";

import "./style.scss";
import { ISoundHistoryItem } from "./types";

const icon_duration = require("../../../../Assets/Icons/Duration.png");
const icon_like = require("../../../../Assets/Icons/Like.png");

export const SoundHistoryItem: React.FC<ISoundHistoryItem> = ({ track, trackCreators, index, selected, options, onClick, onLike }) => {

    const nav = useNavigate();

    return (
        <div className="flex gap-20 cursor-pointer soundhistory text-dark-200 relative">
            <div className="absolute top-0 left-0 w-full h-full z-[10]" onClick={onClick}></div>
            <div className="flex w-full gap-4">
                {
                    index != undefined &&
                    <div className="flex items-center justify-center px-2 w-[15px]">
                        <h1 className="text-xl font-medium text-center">{index}</h1>
                    </div>
                }
                <img alt="Desc image" src={baseUrl + "Images/Tracks/" + track?.image}
                    className="w-[100px] h-[100px] bg-cover object-cover bg-no-repeat rounded-lg" onError={(tg: any) => { tg.target.src = defaultAlbumImage }} onClick={onClick} />
                <div className={`grid grid-rows-1 grid-cols-12 gap-4 w-full overflow-hidden ${selected && "bg-light-200 shadow-xl rounded-xl"}`}>
                    <div className="flex flex-col items-center justify-center col-span-4">
                        <h1 className="text-xl">{track?.name}</h1>
                        <p className="text-gray-500 font-medium flex gap-2 items-center z-10">
                            {
                                trackCreators?.map(i => i.username).map((i: any, index: number) => {
                                    return (
                                        <span key={Guid.create().toString()}
                                            className="cursor-pointer hover:text-blue-400" onClick={() => { nav("/overview/" + i, { replace: false }) }}>{i}{trackCreators?.length && index < trackCreators.length - 1 ? ", " : " "}</span>
                                    )
                                })
                            }
                            <FontAwesomeIcon className="w-[16px] h-[16px] flex items-center text-primary-100 -translate-y-[12%]" icon={trackCreators ? trackCreators[0].verify === VerifyType.verify ? faCheck :
                                trackCreators[0].verify === VerifyType.verify ? faCheck : faUser : faUser} /></p>
                    </div>
                    <div className="flex flex-col items-center justify-center col-span-4">
                        <h1 className="text-xl">Realised</h1>
                        {
                            track?.create &&
                            <p className="text-dark-200/90 font-medium whitespace-nowrap">realised {moment(new Date(track?.create)).format("DD.MM.YYYY")}</p>
                        }
                    </div>
                    <div className="flex items-center justify-end gap-4 col-span-3">
                        <div className="flex flex-col items-center gap-2">
                            <img alt="icon" className="invert w-[24px]" src={icon_duration} />
                            {
                                track &&
                                <p>{moment.utc(Number.parseFloat(track?.duration) * 1000).format("mm:ss")}</p>

                            }
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-4 col-span-1">
                        <img alt="icon" className="invert w-[24px] z-[11]" src={icon_like} onClick={onLike} />
                    </div>
                </div>
                <div className="soundhistory_menu z-[11]">
                    <SoundOptionModal options={options}
                        trigger={<FontAwesomeIcon className=" w-[20px] h-[20px] text-dark-200" icon={faEllipsisVertical} />} />
                </div>
            </div>
        </div>
    )
}