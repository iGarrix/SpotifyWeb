import { icon } from "@fortawesome/fontawesome-svg-core";
import React from "react";
import { ISideBarItem } from "./types";

export const SideBarItem : React.FC<ISideBarItem> = ({text, icon, isSelect, onClick}) => {
    return (
        <div className={`flex gap-4 cursor-pointer ${isSelect ? "text-primary-100" : "text-white"}`} onClick={onClick}>
           {icon}
           <div>
                <h1 className="font-medium">{text}</h1>
           </div>
        </div>
    )
}