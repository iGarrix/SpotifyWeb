import React from "react";
import { ISearchField } from "./types";

export const SearchField: React.FC<ISearchField> = ({ placeholder, value, onChange, icon }) => {
    return (
        <div className="flex flex-col gap-1 w-full">
            <div className="flex">
                <input placeholder={placeholder} defaultValue={value} onChange={(e: any) => { onChange(e) }}
                    className={`text-dark-200 dark:text-light-200 text-md py-3 px-6 w-full outline-none 
                    border-0 bg-light-100 dark:bg-dark-100/60 ${icon ? 'rounded-l-xl' : 'rounded-xl'}`} />
                {
                    icon ?
                        <div className="bg-light-100 dark:bg-dark-100/60 rounded-r-xl flex items-center px-4">
                            {icon}
                        </div> : null

                }
            </div>
        </div>
    )
}