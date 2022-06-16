import React from "react";
import { IProfileButton } from "./types";

const bg2 = require('../../../../Assets/Background2.png');



export const ProfileButton : React.FC<IProfileButton> = ({text, isSelect, onClick}) => {
    return (
        <button className={`flex items-center py-2 px-[23px] bg-cover bg-no-repeat rounded-xl active:contrast-200 ${isSelect ? "contrast-150" : "contrast-75"} hover:contrast-150 transition-all`}
        onClick={onClick}
        style={{ backgroundImage: isSelect ? `url("${bg2}")` : "" }}>{text}</button>
    )
}