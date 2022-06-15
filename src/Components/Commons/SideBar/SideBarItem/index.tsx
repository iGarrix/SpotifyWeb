import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { ISideBarItem } from "./types";

import "./style.scss";

const bg = require('../../../../Assets/Background1.png');

export const SideBarItem: React.FC<ISideBarItem> = ({ text, icon, isSelect, onClick }) => {
    return (
        <div className={`flex items-center gap-4 cursor-pointer ${isSelect ? "sidebaritem bg-black" : "hover:bg-primary-100/60"}
        transition-all text-white active:bg-black`} onClick={onClick}>
                <div className="py-3 px-6 flex items-center gap-4 overflow-x-hidden">
                    <div className="rounded-[10px] p-[8px] flex items-center justify-center bg-cover object-cover" style={{backgroundImage: `url('${bg}')`}}>
                        {/* <FontAwesomeIcon className="text-white text-[20px]" icon={icon} /> */}
                        <img alt="icon" src={icon} className="w-[20px] h-[20px]" />
                    </div>
                    <div>
                        <h1 className="select-none">{text}</h1>
                    </div>
                </div>
            </div>
    )
}