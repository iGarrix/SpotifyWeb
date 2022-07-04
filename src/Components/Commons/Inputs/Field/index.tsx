import React from "react";
import { IField } from "./types";

export const Field: React.FC<IField> = ({ placeholder, value, onChange, icon }) => {
    return (
        <div className="flex flex-col gap-1 w-full">
            <p className="text-dark-200 font-medium">{placeholder}</p>
            <input placeholder={placeholder} defaultValue={value} onChange={(e: any) => { onChange(e) }}
                className={`text-dark-200 py-2 px-4 w-full outline-none border-0 bg-light-200/60 ${icon ? 'rounded-l-xl' : 'rounded-xl'}`} />
            {
                icon ?
                    <div className="bg-light-200/60 rounded-r-xl flex items-center px-4">
                        {icon}
                    </div> : null

            }
        </div>
    )
}