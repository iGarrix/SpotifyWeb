import { faFileArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { formatBytes } from "../../../../types";
import { IUploadFileCard } from "./types";

const icon_trash = require('../../../../Assets/Icons/Trash.png');

export const UploadFileCard: React.FC<IUploadFileCard> = ({...props}) => {
    return (
        <div className="flex justify-between items-center rounded-lg gap-2 bg-light-100 dark:bg-dark-100 p-2 pr-5">
            <div className="flex gap-3 items-center w-full">
                <FontAwesomeIcon className="text-4xl mm:text-2xl text-dark-200/90 dark:text-light-300" icon={faFileArrowUp} />
                <input type={"text"} disabled={props.disable} className="whitespace-nowrap text-lg mm:text-base bg-transparent w-full border-0 outline-none" defaultValue={props.file.name} onChange={(e: any) => {props.onChange(e)}}/>
            </div>
            <div className="flex items-center ml-auto gap-2 w-auto">
                <p className="whitespace-nowrap">{formatBytes(props.file.file.size)}</p>
                <img className="invert dark:invert-0 w-[25px] cursor-pointer" alt="trash" src={icon_trash} onClick={props.onDelete} />
            </div>
        </div>
    )
}