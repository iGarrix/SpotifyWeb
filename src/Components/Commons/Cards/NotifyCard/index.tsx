import { faCircleCheck, faSpinner, faWarning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import React from "react";
import { INotifyCard } from "./types";

export const NotifyCard: React.FC<INotifyCard> = ({ ...props }) => {
    return (
        <div className={`rounded-lg flex mm:flex-col sm:flex-col md:flex-col lg:flex-col items-center gap-[20px] py-3 px-5 overflow-hidden
        ${props.isFunc && "transition-all cursor-pointer hover:shadow-xl"} ${props.type === "success" ? "bg-green-500/40 dark:bg-green-500/70" : props.type === "wait" ? "bg-primary-100/40 dark:bg-primary-100/70" : "bg-red-500/40 dark:bg-red-500/70"}`} onClick={props.onClick}>
            <FontAwesomeIcon icon={props.type === "success" ? faCircleCheck : props.type === "wait" ? faSpinner : faWarning} className={`text-3xl ${props.type === "wait" && "animate-spin"} ${props.type === "success" ? "text-green-500 dark:text-green-400  " : props.type === "wait" ? "text-primary-100 dark:text-blue-500" : "text-red-400"}`} />
            <p className="">{props.message}</p>
            <div className="flex mm:flex-col mm:w-full sm:w-full md:w-full lg:w-full mm:items-center sm:justify-between md:justify-between lg:justify-between gap-2 ml-auto">
                <span className="font-medium text-dark-200/80 dark:text-light-200/80 whitespace-nowrap">{props.device}</span>
                <p className="whitespace-nowrap">{moment(props.date).format("DD/MM/YYYY - HH:mm")}</p>
            </div>
        </div>
    )
}