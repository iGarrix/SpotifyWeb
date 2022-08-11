import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export interface IToggleButton {
    text: string | any,
    checkedText: string | any,
    isSelected?: boolean,
    onCheck: () => void,
}

export const ToggleButton: React.FC<IToggleButton> = ({ ...props }) => {
    return (
        <button className={`border border-light-300 rounded-lg py-2.5 px-6 grid grid-rows-1 grid-cols-2 gap-8 
        cursor-pointer transition-all hover:border-primary-100 hover:text-primary-100 dark:hover:border-blue-500 dark:hover:text-blue-500 w-full`} onClick={props.onCheck}>
            {
                props.isSelected ?
                    <FontAwesomeIcon className="text-2xl" icon={faMoon} />
                    :
                    <FontAwesomeIcon className="text-2xl" icon={faSun} />
            }
            <p className="font-medium">{props.isSelected ? props.checkedText : props.text}</p>
        </button>
    )
}