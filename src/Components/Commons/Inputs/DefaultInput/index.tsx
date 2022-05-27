import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { IDefaultInput } from "./types";


export const DefaultInput : React.FC<IDefaultInput> = ({placeholder, onChange, icon}) => {
    return (
        <div className="flex">
            <input placeholder={placeholder} onChange={(e: any) => {onChange(e)}}
            className="font-medium rounded-l-xl py-2 px-4 outline-none border-0 bg-white"/>
            {
                icon !== null ?
                <div className="bg-white rounded-r-xl flex items-center px-4">
                    {icon}       
                </div> : null

            }
        </div>
    )
}