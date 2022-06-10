import React from "react";
import { IProfileButton } from "./types";

const bg2 = require('../../../../Assets/Background2.png');



export const ProfileButton : React.FC<IProfileButton> = ({text, isSelect, onClick}) => {
    return (
        <button className={`py-2 px-4 my-3 bg-cover bg-no-repeat rounded-xl active:contrast-200 ${isSelect ? "contrast-150" : "contrast-75"} hover:contrast-150 transition-all`}
        onClick={onClick}
        style={{ backgroundImage: `url("${bg2}")` }}>{text}</button>
    )
}