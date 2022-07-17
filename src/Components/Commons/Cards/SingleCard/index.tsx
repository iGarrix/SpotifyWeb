import React from "react";
import { defaultAlbumImage } from "../../../../types";

export interface ISingleCard {
    image: string | any,
    title: string | any,
    onClick: () => void,
}

export const SingleCard: React.FC<ISingleCard> = ({ ...props }) => {
    return (
        <button className="rounded-xl flex flex-col items-center gap-2 w-[164px] text-dark-200" onClick={props.onClick}>
            <img alt="albumimage" className="rounded-xl w-[164px] h-[164px] bg-no-repeat bg-cover object-cover transition-all hover:shadow-lg" 
            src={props.image} onError={(tg: any) => { tg.target.src = defaultAlbumImage }} />
            <div className="flex flex-col gap-1">
                <h2 className="text-lg font-medium">{props.title}</h2>
            </div>
        </button>
    )
}