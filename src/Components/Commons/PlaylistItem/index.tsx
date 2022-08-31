import React from "react";
import { baseUrl, defaultPlaylistImage } from "../../../types";
import { IPlaylistItem } from "./types";

export const PlaylistItem: React.FC<IPlaylistItem> = ({ name, title, imageSrc, onClick }) => {
    return (
        <div className="flex items-center flex-col gap-2 cursor-pointer transition-all mm:w-auto text-dark-200 dark:text-light-200" onClick={onClick}>
            <div className="overflow-hidden w-52 h-52 mm:w-[110px] mm:h-[110px] sm:w-[100px] sm:h-[100px] md:w-[124px] md:h-[124px] lg:w-[164px] lg:h-[164px] xl:w-[186px] xl:h-[186px] hover:shadow-2xl rounded-lg">
                <img alt="playlistImage" className="bg-no-repeat object-cover w-full h-full"
                    src={`${baseUrl}Images/Playlist/${imageSrc}`} onError={(tg: any) => { tg.target.src = defaultPlaylistImage }} />
            </div>
            <h1 className="font-medium text-2xl mm:text-lg sm:text-lg md:text-lg text-center">{name}</h1>
            <p className="text-center sm:hidden mm:hidden">{title}</p>
        </div>
    )
}