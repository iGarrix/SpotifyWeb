import React from "react";
import { IAblumCard } from "./types";

export const AlbumCard: React.FC<IAblumCard> = ({ name, songs, image, onClick }) => {
    return (
        <button className="rounded-xl overflow-hidden flex flex-col items-center gap-2 w-[164px]" onClick={onClick}>
            <img alt="albumimage" className="rounded-xl w-[164px] h-[164px] bg-no-repeat bg-cover object-cover" src={image} />
            <div className="flex flex-col gap-1">
                <h2 className="text-lg">{name}</h2>
                <p className="text-gray-400">{songs} songs</p>
            </div>
        </button>
    )
}