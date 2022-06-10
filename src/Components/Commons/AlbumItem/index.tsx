import React from "react";
import { baseUrl } from "../../../types";
import { IAlbumItem } from "./types";


export const AlbumItem: React.FC<IAlbumItem> = ({name, title, imageSrc, onClick}) => {
    return (
        <div className="flex flex-col gap-2 cursor-pointer transition-all hover:scale-105" onClick={onClick}>
            <h1 className="font-medium text-2xl text-center">{name}</h1>
            <p className="font-thin text-center flex-wrap">{title.toString().substring(0, 15) + "..."}</p>
            <div className="overflow-hidden w-52 h-52 shadow-2xl">
                <img alt="playlistImage" className="bg-no-repeat object-cover rounded-xl w-full h-full"
                    src={`${baseUrl}Images/AlbomImages/${imageSrc}`} />
            </div>
        </div>
    )
}