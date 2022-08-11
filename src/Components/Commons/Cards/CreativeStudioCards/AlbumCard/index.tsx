import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import React from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl, defaultAlbumImage } from "../../../../../types";
import { IAlbumCard } from "./types";

const icon_trash = require('../../../../../Assets/Icons/Trash.png');
const icon_pen = require('../../../../../Assets/Icons/Pen.png');

export const AlbumStudioItem: React.FC<IAlbumCard> = ({ image, name, description, date, listening, onEdit, onDelete, ...props }) => {

    const nav = useNavigate();

    return (
        <div className="playlistCardMain flex gap-20 cursor-pointer text-dark-200 dark:text-light-200 relative">
            <div className="flex w-full gap-4 ">
                <div className={`p-3 grid grid-rows-1 grid-cols-12 gap-4 w-full overflow-hidden plCardMailSelect`} onClick={() => {console.log("HHHH")}}>
                        <img alt="Desc image" src={baseUrl + "Images/AlbomImages/" + image}
                            className="w-[96px] h-[96px] bg-cover object-cover bg-no-repeat rounded-lg col-span-1" onError={(tg: any) => { tg.target.src = defaultAlbumImage }} />
                    <div className="flex flex-col items-start justify-between col-span-4 overflow-hidden">
                        <div>
                            <h1 className="text-xl whitespace-nowrap">{name}</h1>
                            <h3 className="text-md whitespace-normal flex flex-wrap">{description}</h3>
                        </div>
                        <div className="flex gap-2 items-center playlistCardMailOptions">
                            <img className="invert dark:invert-0 w-[28px]" alt="pen" src={icon_pen} onClick={onEdit} />
                            <img className="invert dark:invert-0 w-[28px]" alt="trash" src={icon_trash} onClick={onDelete} />
                            <FontAwesomeIcon className="text-lg" icon={faLink} onClick={() => {nav("/album/" + props.id)}} />
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center col-span-4">
                        <h1 className="text-xl">Date</h1>
                        {
                            date &&
                            <p className="text-dark-200/90 dark:text-light-200/90 font-medium whitespace-nowrap">{moment(new Date(date)).format("DD.MM.YYYY")}</p>
                        }
                    </div>
                    <div className="flex flex-col items-center justify-center col-span-3">
                        <h1 className="text-xl">Listening</h1>
                        {
                            listening &&
                            <p className="text-dark-200/90 dark:text-light-200/90 font-medium whitespace-nowrap">{listening}</p>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};