import React from "react";
import { IFilterButton } from "./types";

export const FilterButton : React.FC<IFilterButton> = ({...props}) => {
    return (
        <button className={`rounded-2xl px-4 py-1 flex items-center 
        justify-center text-center border-[2px] transition-all hover:bg-light-200 ${props.isSelected ? "bg-light-200" : "bg-light-100"}`} onClick={props.onClick}>{props.text}</button>
    )
}