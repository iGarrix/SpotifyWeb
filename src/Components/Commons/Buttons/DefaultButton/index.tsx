import React from "react";
import { IDefaultButton } from "./types";

import "./style.scss";

export const DefaultButton: React.FC<IDefaultButton> = ({ text, type, importantDark, onClick }) => {
    return (
        <button type={type} className={`py-2 px-3 font-medium relative transition-all hover:contrast-125
        overflow-hidden rounded-xl shadow-xl select-none cursor-pointer ${importantDark ? "bg-dark-100/90 text-light-100" : "bg-light-200 text-dark-200"}`} onClick={onClick}>{text}</button>
    )
}