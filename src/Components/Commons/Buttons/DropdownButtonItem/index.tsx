import React from "react";
import { IDropdownButtonItem } from "./types";


export const DropdownButtonItem : React.FC<IDropdownButtonItem> = ({text, isDanger, icon, notifications, onClick}) => {
    return (
        <button className={`w-full h-full py-2 text-white flex px-4 pr-12 gap-2 items-center transition-all select-none
        ${isDanger ? "hover:bg-red-500" : "hover:bg-dark-200"}`} onClick={onClick}>{icon} {text} 
        <p className={`${notifications ? "flex items-center justify-center bg-red-600 rounded-full w-5 h-5" : ""}`}>{notifications}</p>
        </button>
    )
}