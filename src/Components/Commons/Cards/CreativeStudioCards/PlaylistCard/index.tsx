import moment from "moment";
import React from "react";
import { baseUrl, defaultPlaylistImage } from "../../../../../types";
import { IPlaylistCard } from "./types";
import "./style.scss"

const icon_trash = require('../../../../../Assets/Icons/Trash.png');
const icon_pen = require('../../../../../Assets/Icons/Pen.png');

export const CreatePlaylistItem: React.FC<IPlaylistCard> = ({ image, name, date, listening, type, onClick, onEdit, onDelete }) => {
    return (
        <div className="playlistCardMain flex gap-20 cursor-pointer text-dark-200 relative">
            <div className="absolute top-0 left-0 w-full h-full z-[20]" onClick={onClick}></div>
            <div className="flex w-full gap-4 ">
                <div className={`p-3 grid grid-rows-1 grid-cols-12 gap-4 w-full overflow-hidden plCardMailSelect`}>
                        <img alt="Desc image" src={baseUrl + "Images/Playlist/" + image}
                            className="w-[96px] h-[96px] bg-cover object-cover bg-no-repeat rounded-lg" onError={(tg: any) => { tg.target.src = defaultPlaylistImage }} onClick={onClick} />
                    <div className="flex flex-col items-start justify-between col-span-3">
                        <h1 className="text-xl whitespace-nowrap">{name}</h1>
                        <div className="flex gap-2 playlistCardMailOptions">
                            <img className="invert w-[28px]" alt="pen" src={icon_pen} onClick={onEdit} />
                            <img className="invert w-[28px]" alt="trash" src={icon_trash} onClick={onDelete} />
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center col-span-3">
                        <h1 className="text-xl">Date</h1>
                        {
                            date &&
                            <p className="text-dark-200/90 font-medium whitespace-nowrap">{moment(new Date(date)).format("DD.MM.YYYY")}</p>
                        }
                    </div>
                    <div className="flex flex-col items-center justify-center col-span-4">
                        <h1 className="text-xl">Type</h1>
                        {
                            type &&
                            <p className="bg-dark-200/90 text-light-100 px-3 rounded-xl font-medium whitespace-nowrap flex items-center justify-center">{type}</p>
                        }
                    </div>
                    <div className="flex flex-col items-center justify-center col-span-1">
                        <h1 className="text-xl">Listening</h1>
                        {
                            listening &&
                            <p className="text-dark-200/90 font-medium whitespace-nowrap">{listening}</p>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};