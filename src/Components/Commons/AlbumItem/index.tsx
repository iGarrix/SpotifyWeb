import React from "react";
import { baseUrl } from "../../../types";
import { IAlbumItem } from "./types";

export const AlbumItem: React.FC<IAlbumItem> = ({ name, title, imageSrc, onClick }) => {
    return (
        <div className="flex flex-col items-center gap-2 cursor-pointer transition-all hover:scale-105 w-[205px] text-dark-200" onClick={onClick}>
            <h1 className="font-medium text-2xl text-center flex overflow-hidden">{name.substring(0, 10)} {name.length >= 10 && "..."}</h1>
            <p className="text-center flex-wrap">{title}</p>
            <div className="overflow-hidden w-52 h-52 shadow-2xl rounded-lg">
                <img alt="albumImage" className="bg-no-repeat object-cover w-full h-full"
                    src={`${baseUrl}Images/AlbomImages/${imageSrc}`} onError={(tg: any) => { tg.target.src = "https://d338t8kmirgyke.cloudfront.net/icons/icon_pngs/000/002/026/original/disc.png"}} />
            </div>
        </div>
    )
}