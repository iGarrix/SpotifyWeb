import React from "react";
import { IProfileButton } from "./types";

const bg2 = require('../../../../Assets/Background2.png');

export const ProfileButton: React.FC<IProfileButton> = ({ text, isSelect, onClick }) => {
    return (
        <button className={`flex items-center py-2 px-[23px] bg-cover bg-no-repeat rounded-xl hover:bg-light-100 active:contrast-150 ${isSelect ? "contrast-100 text-light-100" : "contrast-[10px] border border-dark-200 text-dark-200"} transition-all`}
            onClick={onClick}
            style={{ backgroundImage: isSelect ? `url("${bg2}")` : "" }}>{text}</button>
    )
}