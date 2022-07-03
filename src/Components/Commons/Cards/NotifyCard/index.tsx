import { faCircleCheck, faSpinner, faWarning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import React from "react";
import { INotifyCard } from "./types";

export const NotifyCard: React.FC<INotifyCard> = ({ ...props }) => {
    return (
        <div className={`rounded-lg flex items-center gap-[20px] py-3 px-5 overflow-hidden ${props.type === "success" ? "bg-green-500/40" : props.type === "wait" ? "bg-primary-100/40" : "bg-red-500/40"}`}>
            <FontAwesomeIcon icon={props.type === "success" ? faCircleCheck : props.type === "wait" ? faSpinner : faWarning} className={`text-3xl ${props.type === "success" ? "text-green-500" : props.type === "wait" ? "text-primary-100" : "text-red-500"}`} />
            {props.message}
            <p className="ml-auto whitespace-nowrap">{moment(props.date).format("DD/MM/YYYY - HH:mm")}</p>
        </div>
    )
}