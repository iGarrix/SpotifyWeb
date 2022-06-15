import React from "react";
import { IDefaultButton } from "./types";

import "./style.scss";

export const DefaultButton : React.FC<IDefaultButton> = ({text, type, onClick}) => {
    return (
        <button type={type} className="py-2 px-3 font-medium text-xl relative transition-all hover:contrast-125
        overflow-hidden rounded-xl bg-buttongray-100 shadow-xl select-none" onClick={onClick}>{text}</button>
    )
}