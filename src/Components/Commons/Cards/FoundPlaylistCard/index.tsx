import React from "react";
import { baseUrl, defaultPlaylistImage } from "../../../../types";
import { IFoundPlaylistCard } from "./types";

export const FoundPlaylistCard : React.FC<IFoundPlaylistCard> = ({...props}) => {
    return (
        <div className="flex items-center gap-4 bg-light-200 dark:bg-dark-100 transition-all p-2 rounded-md cursor-pointer
         text-dark-200 hover:text-light-100 dark:text-light-200 hover:bg-blue-500 dark:hover:bg-blue-500 w-full" onClick={props.onClick}>
            <img alt="image" className="w-[48px] h-[48px] shadow-xl"
            src={baseUrl + "Images/Playlist/" + props.image}
            onError={(tg: any) => { tg.target.src = defaultPlaylistImage }} />
                <p className="text-lg">{props.name}</p>
        </div>
    )
}