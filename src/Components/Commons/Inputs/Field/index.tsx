import React from "react";
import { IField } from "./types";

export const Field: React.FC<IField> = ({ placeholder, value, onChange, icon }) => {
    return (
        <div className="flex flex-col gap-1">
            <p className="text-white font-medium">{placeholder}</p>
            <input placeholder={placeholder} defaultValue={value} onChange={(e: any) => { onChange(e) }}
                className={`text-white py-2 px-4 outline-none border-0 bg-dark-200/60 ${icon ? 'rounded-l-xl' : 'rounded-xl'}`} />
            {
                icon ?
                    <div className="bg-dark-200/60 rounded-r-xl flex items-center px-4">
                        {icon}
                    </div> : null

            }
        </div>
    )
}