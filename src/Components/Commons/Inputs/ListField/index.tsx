import { faList, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { IListField } from "./types";

const bg = require('../../../../Assets/Background2.png');

export const ListField : React.FC<IListField> = ({...props}) => (
    <div className="flex flex-col gap-1">
        <p className="text-dark-200 dark:text-light-200 font-medium text-lg">{props.title}</p>
        <div className="flex flex-col gap-3">
            <div className="flex bg-light-200 dark:bg-dark-100 rounded-lg overflow-hidden items-center pr-2 py-2 gap-1">
                <input placeholder={props.placeholder} defaultValue={props.value} disabled onChange={(e: any) => { } }
                    className={`text-dark-200 dark:text-light-200 py-2 px-4 w-full outline-none border-0 bg-transparent`} />
                    <FontAwesomeIcon icon={faList} className="flex items-center justify-center text-center rounded-md p-2 shadow-xl cursor-pointer
                 bg-blue-500 text-light-100 ml-auto text-lg  bg-cover object-cover" style={{backgroundImage: `url("${bg}")`}} onClick={props.onOpenList} />
                <FontAwesomeIcon icon={faTrash} className="flex items-center justify-center text-center rounded-md p-2 px-2.5 shadow-xl cursor-pointer
                 bg-blue-500 text-light-100 ml-auto text-lg bg-cover object-cover" style={{backgroundImage: `url("${bg}")`}} onClick={props.onRemove} />
            </div>

        </div>
    </div>
)