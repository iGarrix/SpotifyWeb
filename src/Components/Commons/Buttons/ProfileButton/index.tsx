import React from "react";
import { IProfileButton } from "./types";

const bg2 = require('../../../../Assets/Background2.png');

export const ProfileButton: React.FC<IProfileButton> = ({ text, isSelect, onClick }) => {
    return (
        <button className={`flex items-center justify-center text-center py-2 px-[23px] overflow-hidden bg-cover bg-transparent bg-no-repeat rounded-xl mm:w-full sm:w-full
        active:contrast-150 ${isSelect ? "contrast-100 text-light-100" : "contrast-[10px] border border-light-300 text-dark-200 dark:border-light-200 dark:text-light-200"} transition-all`}
            onClick={onClick}
            style={{ backgroundImage: isSelect ? `url("${bg2}")` : "" }}>{text}</button>
    )
}