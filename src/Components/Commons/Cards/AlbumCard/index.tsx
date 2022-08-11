import React from "react";
import { defaultAlbumImage } from "../../../../types";
import { IAblumCard } from "./types";

export const AlbumCard: React.FC<IAblumCard> = ({ name, songs, image, onClick }) => {
    return (
        <button className="rounded-xl flex flex-col items-center gap-2 w-[164px] text-dark-200 dark:text-light-200" onClick={onClick}>
            <img alt="albumimage" className="rounded-xl w-[164px] h-[164px] bg-no-repeat bg-cover object-cover transition-all hover:shadow-lg" 
            src={image} onError={(tg: any) => { tg.target.src = defaultAlbumImage }} />
            <div className="flex flex-col gap-1">
                <h2 className="text-lg font-medium">{name}</h2>
                {/* {
                    songs &&
                } */}
                <p className="text-dark-200/80 dark:text-light-200/80">{songs && songs} songs</p>
            </div>
        </button>
    )
}