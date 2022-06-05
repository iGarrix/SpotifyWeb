import React from "react";
import { IField } from "./types";


export const Field: React.FC<IField> = ({ placeholder, value, onChange, icon }) => {
    return (
        <div className="flex">
            <input placeholder={placeholder} defaultValue={value} onChange={(e: any) => { onChange(e) }}
                className="text-black rounded-l-xl py-2 px-4 outline-none border-0 bg-white" />
            {
                icon !== null ?
                    <div className="bg-white rounded-r-xl flex items-center px-4">
                        {icon}
                    </div> : null

            }
        </div>
    )
}