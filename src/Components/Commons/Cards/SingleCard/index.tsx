import React from "react";
import { defaultAlbumImage } from "../../../../types";

export interface ISingleCard {
    image: string | any,
    title: string | any,
    onClick: () => void,
}

export const SingleCard: React.FC<ISingleCard> = ({ ...props }) => {
    return (
        <button className="rounded-xl flex flex-col items-center gap-2 w-[164px] mm:w-[164px] sm:w-[164px] md:w-[124px] text-dark-200 dark:text-light-200" onClick={props.onClick}>
            <img alt="albumimage" className="rounded-xl w-[164px] h-[164px] mm:w-[164px] mm:h-[164px] sm:w-[124px] sm:h-[124px] md:w-[124px] md:h-[124px] bg-no-repeat bg-cover object-cover transition-all hover:shadow-lg" 
            src={props.image} onError={(tg: any) => { tg.target.src = defaultAlbumImage }} />
            <div className="flex flex-col gap-1">
                <h2 className="text-md font-medium">{props.title.substring(0, 20)}</h2>
            </div>
        </button>
    )
}