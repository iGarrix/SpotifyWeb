import React from "react";
import { IRedirectButton } from "./types";



export const RedirectButton : React.FC<IRedirectButton> = ({text, icon, isActive = true, onClick}) => {
    return (
        <button disabled={!isActive} className={`py-2 px-6 border border-white/10 rounded-xl w-full flex items-center gap-6 transition-all 
        ${isActive ? "hover:border-blue-500 hover:bg-white/10" : "brightness-50"}`} 
        onClick={isActive ? onClick : () => {}}>
            {
                icon ?
                <img alt="logo" className="w-[28px] h-[28px]" src={icon} />
                :
                null
            }
            <p className="text-lg">{text}</p>
        </button>
    )
}