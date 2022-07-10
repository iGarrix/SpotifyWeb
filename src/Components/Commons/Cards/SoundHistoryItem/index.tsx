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

export const SoundHistoryItem: React.FC<ISoundHistoryItem> = ({ track, trackCreators, options, onClick }) => {

    const nav = useNavigate();

    return (
        <div className="flex gap-20 cursor-pointer soundhistory text-dark-200" onClick={onClick}>
            <div className="flex gap-4">
                <img alt="Desc image" src={baseUrl + "Images/Tracks/" + track?.image}
                    className="w-[124px] h-[124px] bg-cover object-cover bg-no-repeat rounded-lg" onError={(tg: any) => { tg.target.src = defaultAlbumImage }} />
                <div className="flex flex-col justify-between">
                    <div className="flex flex-col">
                        <h1 className="text-xl">{track?.name}</h1>
                        <p className="text-gray-500 font-medium flex gap-2 items-center">
                            {
                                trackCreators?.map(i => i.username).map((i: any, index: number) => {
                                    return (
                                        <span key={Guid.create().toString()}
                                            className="cursor-pointer hover:text-blue-400" onClick={() => { nav("/overview/" + i, { replace: true }) }}>{i}{trackCreators?.length && index < trackCreators.length - 1 ? ", " : " "}</span>
                                    )
                                })
                            }
                            <FontAwesomeIcon className="w-[16px] h-[16px] flex items-center text-primary-100 -translate-y-[12%]" icon={trackCreators ? trackCreators[0].verify === VerifyType.verify ? faCheck :
                                trackCreators[0].verify === VerifyType.verify ? faCheck : faUser : faUser} /></p>
                    </div>
                    <div className="flex flex-col">
                        <div className="text-gray-500 font-medium flex gap-1">Duration
                            {
                                track &&
                                <p>{moment.utc(Number.parseFloat(track?.duration) * 1000).format("mm:ss")}</p>

                            }
                        </div>
                        {
                            track?.create &&
                            <p className="text-dark-200/60 font-medium whitespace-nowrap">realised {moment(new Date(track?.create)).format("DD.MM.YYYY")}</p>
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