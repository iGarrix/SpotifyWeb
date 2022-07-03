import React from "react";
import { IDropdownButtonItem } from "./types";

export const DropdownButtonItem: React.FC<IDropdownButtonItem> = ({ text, isDanger, icon, notifications, onClick }) => {
    return (
        <button className={`w-full h-full py-2 text-white grid grid-cols-12 px-4 pr-12 gap-2 items-center transition-all select-none
        ${isDanger ? "hover:bg-red-500" : "hover:bg-primary-100"}`} onClick={onClick}>
            <div className="col-span-2">
                {icon}
            </div>
            <div className="col-span-10 flex">
                <p className="text-[1.05rem] whitespace-nowrap">{text}</p>
            </div>
        </button>
    )
}