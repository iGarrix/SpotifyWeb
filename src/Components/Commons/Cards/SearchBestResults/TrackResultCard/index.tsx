import { faCirclePause, faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Guid } from "guid-typescript";
import React from "react";
import { useNavigate } from "react-router-dom";
import { defaultAlbumImage } from "../../../../../types";

import "../ArtistResultCard/style.scss";
import { ITrackResultCard } from "./types";

export const TrackResultCard : React.FC<ITrackResultCard> = ({...props}) => {
    const nav = useNavigate();
    return (
        <div className="w-full h-full rounded-xl bg-light-200 overflow-hidden flex flex-col gap-6 py-6 px-8 cursor-pointer transition-all mainresultcard relative">
            <div className="absolute top-0 left-0 w-full h-full" onClick={props.onNavigate}></div>
            <img alt="image" src={props.image}
                className="rounded-xl w-[164px] h-[164px] shadow-xl select-none" onError={(tg: any) => { tg.target.src = defaultAlbumImage }} />
            <div className="flex justify-between gap-[128px] z-10">
                <div className="flex flex-col justify-between">
                    <div className="flex flex-col">
                        <p className="text-2xl font-medium">{props.name}</p>
                    </div>
                    <div className="flex gap-4 items-center select-none">
                        <p className="flex gap-1 flex-wrap text-dark-200/60">
                            {
                                props.creators?.splice(0, 2).map((i: any, index: number) => {
                                    return (
                                        <span key={Guid.create().toString()}
                                            className="text-md font-medium cursor-pointer hover:text-blue-400"
                                            onClick={() => { nav("/overview/" + i, { replace: false }) }}>{i}</span>
                                    )
                                })
                            }
                        </p>
                        <p className="text-light-100 bg-dark-200/90 rounded-xl px-4 py-0.5">Single</p>
                    </div>
                </div>
                <div className="flex items-end select-none z-10">
                        <FontAwesomeIcon icon={props.isPlay ? faCirclePause : faCirclePlay} className={`mainresultbutton transition-all cursor-pointer text-5xl text-dark-200/90 ${props.onSelect && "hover:scale-105"}`} onClick={props.onSelect} />
                </div>
            </div>
        </div>
    )
}