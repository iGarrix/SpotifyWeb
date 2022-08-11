import React from "react";
import { IField } from "./types";

export const Field: React.FC<IField> = ({ placeholder, value, onChange, icon, visiblePlaceholder = true }) => {
    return (
        <div className="flex flex-col gap-1">
            {
                visiblePlaceholder &&
                <p className="text-dark-200 dark:text-light-200 font-medium text-lg">{placeholder}</p>
            }
            <div className="flex">
                <input placeholder={placeholder} defaultValue={value} onChange={(e: any) => { onChange(e) }}
                    className={`text-dark-200 py-2 px-4 w-full outline-none border-0 bg-light-100 dark:bg-dark-100
                    dark:text-light-200
                     ${icon ? 'rounded-l-lg' : 'rounded-lg'}`} />
                {
                    icon ?
                        <div className="bg-light-100 dark:bg-dark-100 rounded-r-xl flex items-center px-4">
                            {icon}
                        </div> : null

                }
            </div>
        </div>
    )
}