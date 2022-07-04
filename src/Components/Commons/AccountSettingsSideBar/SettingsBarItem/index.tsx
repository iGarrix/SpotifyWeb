import React from "react";
import { ISettingsBarItem } from "./types";

export const SettingsBarItem: React.FC<ISettingsBarItem> = ({ text, icon, isSelect, onClick }) => {

    return (
        <div className={`flex items-center gap-4 cursor-pointer ${isSelect ? "sidebaritem bg-light-300" : "hover:bg-primary-100/60"}
        transition-all text-dark-200 active:bg-light-100`} onClick={onClick}>
            <div className="py-[20px] px-6 flex items-center gap-4 overflow-x-hidden">
                <img alt="icon" src={icon} className="w-[28px] h-[28px] invert" />
                <div>
                    <h1 className="select-none">{text}</h1>
                </div>
            </div>
        </div>
    )
}