import React from "react";
import { IDefaultButton } from "./types";

import "./style.scss";

export const DefaultButton: React.FC<IDefaultButton> = ({ text, type, onClick }) => {
    return (
        <button type={type} className="py-2 px-3 font-medium text-xl relative transition-all hover:contrast-125
        overflow-hidden rounded-xl bg-light-200 text-dark-200 shadow-xl select-none cursor-pointer" onClick={onClick}>{text}</button>
    )
}