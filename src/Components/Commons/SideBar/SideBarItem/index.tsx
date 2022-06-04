import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { ISideBarItem } from "./types";

import "./style.scss";

export const SideBarItem: React.FC<ISideBarItem> = ({ text, icon, isSelect, onClick }) => {
    return (
        <div className={`flex items-center gap-4 cursor-pointer ${isSelect ? "sidebaritem bg-black" : "hover:bg-primary-100/60"}
        transition-all text-white active:bg-black`} onClick={onClick}>
                <div className="py-3 px-6 flex items-center gap-4 overflow-x-hidden">
                    <div className="bg-blue-400 rounded-lg px-1.5 py-0.5">
                        <FontAwesomeIcon className="text-white" icon={icon} />
                    </div>
                    <div>
                        <h1 className="select-none">{text}</h1>
                    </div>
                </div>
            </div>
    )
}