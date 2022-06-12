import React from "react";
import { baseUrl } from "../../../types";
import { ISingleItem } from "./types";

export const SingleItem: React.FC<ISingleItem> = ({name, title, imageSrc, onClick}) => {
    return (
        <div className="flex flex-col gap-2 cursor-pointer transition-all hover:scale-105" onClick={onClick}>
            <h1 className="font-medium text-2xl text-center">{name}</h1>
            <p className="font-thin text-center flex-wrap text-blue-400">{title.toString().substring(0, 15)}</p>
            <div className="overflow-hidden w-52 h-52 shadow-2xl">
                <img alt="albumImage" className="bg-no-repeat object-cover rounded-xl w-full h-full"
                    src={`${baseUrl}Images/AlbomImages/${imageSrc}`} />
            </div>
        </div>
    )
}