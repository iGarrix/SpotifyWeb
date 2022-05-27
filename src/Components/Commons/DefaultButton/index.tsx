import React from "react";
import { IDefaultButton } from "./types";

import "./style.scss";

var background1 = require("../../../Assets/Background1.png");

export const DefaultButton : React.FC<IDefaultButton> = ({text, onClick}) => {
    return (
        <button className="py-2 px-3 font-medium text-xl relative transition-all hover:contrast-125
        overflow-hidden bg-black rounded-xl defbtn shadow-lg" onClick={onClick}>{text}</button>
    )
}