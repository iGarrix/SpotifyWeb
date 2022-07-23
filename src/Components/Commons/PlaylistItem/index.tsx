import React from "react";
import { baseUrl, defaultPlaylistImage } from "../../../types";
import { IPlaylistItem } from "./types";

export const PlaylistItem: React.FC<IPlaylistItem> = ({ name, title, imageSrc, onClick }) => {
    return (
        <div className="flex items-center flex-col gap-2 cursor-pointer transition-all text-dark-200" onClick={onClick}>
            <div className="overflow-hidden w-52 h-52 hover:shadow-2xl rounded-lg">
                <img alt="playlistImage" className="bg-no-repeat object-cover w-full h-full"
                    src={`${baseUrl}Images/Playlist/${imageSrc}`} onError={(tg: any) => { tg.target.src = defaultPlaylistImage}} />
            </div>
            <h1 className="font-medium text-2xl text-center">{name}</h1>
            <p className="text-center">{title}</p>
        </div>
    )
}