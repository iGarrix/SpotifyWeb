import moment from "moment";
import React from "react";
import { baseUrl, defaultPlaylistImage } from "../../../../../types";
import { IPlaylistCard } from "./types";
import "./style.scss"
import { useTranslation } from "react-i18next";

const icon_trash = require('../../../../../Assets/Icons/Trash.png');
const icon_pen = require('../../../../../Assets/Icons/Pen.png');

export const CreatePlaylistItem: React.FC<IPlaylistCard> = ({ image, name, date, listening, type, onClick, onEdit, onDelete }) => {
    const { t } = useTranslation();
    return (
        <div className="playlistCardMain flex gap-20 cursor-pointer text-dark-200 dark:text-light-200 relative">
            <div className="absolute top-0 left-0 w-full h-full z-[20]" onClick={onClick}></div>
            <div className="flex w-full gap-4 ">
                <div className={`p-3 grid grid-rows-1 grid-cols-12 gap-4 w-full overflow-hidden plCardMailSelect pr-8 mm:pr-2 sm:pr-2`}>
                    <div className="flex gap-2 col-span-4 mm:col-span-8 sm:col-span-6 md:col-span-6 lg:col-span-7">
                        <div className="w-[96px] h-[96px] mm:w-[64px] mm:h-[64px]">
                            <img alt="Desc image" src={baseUrl + "Images/Playlist/" + image}
                                className="w-[96px] h-[96px] mm:w-full mm:h-full bg-cover object-cover bg-no-repeat rounded-lg" onError={(tg: any) => { tg.target.src = defaultPlaylistImage }} onClick={onClick} />
                        </div>
                        <div className="flex flex-col items-start justify-between">
                            <h1 className="text-xl mm:text-base whitespace-nowrap">{name}</h1>
                            <div className="flex gap-2 playlistCardMailOptions">
                                <img className="invert dark:invert-0 w-[28px] mm:w-[22px]" alt="pen" src={icon_pen} onClick={onEdit} />
                                <img className="invert dark:invert-0 w-[28px] mm:w-[22px]" alt="trash" src={icon_trash} onClick={onDelete} />
                            </div>
                        </div>
                    </div>  
                    <div className="flex flex-col items-center justify-center col-span-3 mm:hidden sm:hidden md:col-span-2 lg:hidden">
                        <h1 className="text-xl mm:text-base">{t("Date")}</h1>
                        {
                            date &&
                            <p className="text-dark-200/90 dark:text-light-200/90 font-medium whitespace-nowrap">{moment(new Date(date)).format("DD.MM.YYYY")}</p>
                        }
                    </div>
                    <div className="flex flex-col items-center justify-center col-span-3 mm:col-span-3 sm:col-span-4 md:col-span-3">
                        <h1 className="text-xl mm:hidden">{t("Type")}</h1>
                        {
                            type &&
                            <p className="bg-dark-200/90 text-light-200 dark:bg-light-200 dark:text-dark-200 px-3 rounded-xl font-medium whitespace-nowrap flex items-center justify-center">{type}</p>
                        }
                    </div>
                    <div className="flex flex-col items-center justify-center col-span-2 mm:col-span-1 sm:col-span-1 md:col-span-1">
                        <h1 className="text-xl mm:text-base mm:hidden">{t("Listening")}</h1>
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