import React from "react";
import { baseUrl, defaultAlbumImage } from "../../../types";
import { IAlbumItem } from "./types";

export const AlbumItem: React.FC<IAlbumItem> = ({ name, title, imageSrc, onClick }) => {
    return (
        <div className="flex items-center flex-col gap-2 cursor-pointer transition-all hover:scale-105 w-[205px] text-dark-200 dark:text-light-200" onClick={onClick}>
            <div className="overflow-hidden w-52 h-52 shadow-2xl rounded-lg">
                <img alt="albumImage" className="bg-no-repeat object-cover w-full h-full"
                    src={`${baseUrl}Images/AlbomImages/${imageSrc}`} onError={(tg: any) => { tg.target.src = defaultAlbumImage}} />
            </div>
            <h1 className="font-medium text-2xl text-center flex overflow-hidden whitespace-wrap">{name}</h1>
            <p className="text-center flex-wrap">{title}</p>
        </div>
    )
}