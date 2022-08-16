import React from "react";
import { baseUrl, defaultAlbumImage } from "../../../types";
import { IAlbumItem } from "./types";

export const AlbumItem: React.FC<IAlbumItem> = ({ name, title, imageSrc, onClick }) => {
    return (
        <div className="flex items-center flex-col gap-2 cursor-pointer transition-all hover:scale-105  mm:w-auto text-dark-200 dark:text-light-200" onClick={onClick}>
            <div className="overflow-hidden w-52 h-52 mm:w-[110px] mm:h-[110px] sm:w-[124px] sm:h-[124px] md:w-[124px] md:h-[124px] lg:w-[164px] lg:h-[164px] xl:w-[186px] xl:h-[186px] shadow-2xl mm:shadow-none rounded-lg">
                <img alt="albumImage" className="bg-no-repeat object-cover w-full h-full"
                    src={`${baseUrl}Images/AlbomImages/${imageSrc}`} onError={(tg: any) => { tg.target.src = defaultAlbumImage}} />
            </div>
            <h1 className="font-medium text-2xl mm:text-lg sm:text-lg md:text-lg text-center flex overflow-hidden whitespace-wrap">{name}</h1>
            <p className="text-center flex-wrap sm:hidden mm:hidden">{title}</p>
        </div>
    )
}