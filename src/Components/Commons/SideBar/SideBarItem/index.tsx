import React from "react";
import { ISideBarItem } from "./types";
import "./style.scss";
const bg = require('../../../../Assets/Background1.png');

export const SideBarItem: React.FC<ISideBarItem> = ({ text, icon, isSelect, onClick }) => {
    return (
        <div className={`flex items-center gap-4 cursor-pointer text-[100%] ${isSelect ? "sidebaritem bg-light-300" : "hover:bg-primary-100/60"}
        transition-all text-dark-200 active:bg-light-100`} onClick={onClick}>
            <div className="py-3 px-6 flex items-center gap-4 overflow-x-hidden">
                <div className="rounded-[10px] p-[8px] flex items-center justify-center bg-cover object-cover" style={{ backgroundImage: `url('${bg}')` }}>
                    <img alt="icon" src={icon} className="w-[22px] h-[22px]" />
                </div>
                <div>
                    <h1 className="select-none text-[1em]">{text}</h1>
                </div>
            </div>
        </div>
    )
}