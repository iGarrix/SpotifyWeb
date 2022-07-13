import React from "react";
import { baseUrl } from "../../../types";
import { IPlaylistItem } from "./types";

export const PlaylistItem: React.FC<IPlaylistItem> = ({ name, title, imageSrc, onClick }) => {
    return (
        <div className="flex items-center flex-col gap-2 cursor-pointer transition-all text-dark-200" onClick={onClick}>
            <div className="overflow-hidden w-52 h-52 hover:shadow-2xl rounded-lg">
                <img alt="playlistImage" className="bg-no-repeat object-cover w-full h-full"
                    src={`${baseUrl}Images/Playlist/${imageSrc}`} onError={(tg: any) => { tg.target.src = "https://d338t8kmirgyke.cloudfront.net/icons/icon_pngs/000/002/026/original/disc.png"}} />
            </div>
            <h1 className="font-medium text-2xl text-center">{name}</h1>
            <p className="text-center">{title}</p>
        </div>
    )
}