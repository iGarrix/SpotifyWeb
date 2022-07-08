import React from "react";
import { IAblumCard } from "./types";

export const AlbumCard: React.FC<IAblumCard> = ({ name, songs, image, onClick }) => {
    return (
        <button className="rounded-xl overflow-hidden flex flex-col items-center gap-2 w-[164px] text-dark-200" onClick={onClick}>
            <img alt="albumimage" className="rounded-xl w-[164px] h-[164px] bg-no-repeat bg-cover object-cover transition-all hover:shadow-2xl" src={image} />
            <div className="flex flex-col gap-1">
                <h2 className="text-lg">{name}</h2>
                {
                    songs &&
                    <p className="text-dark-200/80">{songs} songs</p>
                }
            </div>
        </button>
    )
}