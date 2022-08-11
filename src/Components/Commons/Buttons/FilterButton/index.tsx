import React from "react";
import { IFilterButton } from "./types";

export const FilterButton : React.FC<IFilterButton> = ({...props}) => {
    return (
        <button className={`rounded-2xl px-4 py-1 flex items-center 
        justify-center text-center border-[2px] transition-all hover:bg-light-200 dark:border-dark-100
        ${props.isSelected ? "bg-light-300 dark:bg-dark-200/90 dark:border-dark-200/90" : "bg-light-100 dark:bg-dark-100"}`} onClick={props.onClick}>{props.text}</button>
    )
}