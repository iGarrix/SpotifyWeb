import React from "react";
import { baseUrl } from "../../../../types";
import { IGenreItem } from "./types";

export const GenreItem: React.FC<IGenreItem> = ({  image, name, onClick }) => {
    return (
        <button className="rounded-xl flex flex-col items-center gap-2 w-[164px] text-dark-200" onClick={onClick}>
            <img alt="genreimage" className="hover:shadow-xl transition-all rounded-xl w-[164px] h-[164px] bg-no-repeat bg-cover object-cover" src={`${baseUrl}Images/Genre/${image}`} onError={(tg: any) => { tg.target.src = "https://d338t8kmirgyke.cloudfront.net/icons/icon_pngs/000/002/026/original/disc.png"}} />
            <div className="flex flex-col gap-1">
                <h2 className="text-lg">{name}</h2>
            </div>
        </button>
    )
}