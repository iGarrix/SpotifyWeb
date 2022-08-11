import { faEye } from "@fortawesome/free-regular-svg-icons";
import { faCancel, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { baseUrl } from "../../../../types";
import { IInviteCardProps } from "./types";

export const InviteCard: React.FC<IInviteCardProps> = ({...props}) => {

    const nav = useNavigate();

    return (
        <div className={`rounded-lg flex items-center gap-[20px] overflow-hidden bg-light-200 dark:bg-dark-100 shadow-md py-2 px-5 select-none text-dark-200 dark:text-light-200`}>
            <img alt="albumimage" src={baseUrl + "Images/AlbomImages/" + props.invite.albomDto.image} className="w-[64px] h-[64px] object-cover bg-cover rounded-full" />
            <div className="flex flex-col justify-center">
                <div className="flex gap-2">
                    <p className="font-medium text-[19px] flex hover:text-primary-100 dark:hover:text-blue-500 cursor-pointer" onClick={() => {nav("/album/" + props.invite.albomDto.returnId)}}>{props.invite.albomDto.name}</p>
                    <span className="text-sm bg-primary-100 text-light-200 rounded-sm px-2 py-0.5 text-center flex items-center justify-center">Full album</span>
                </div>
                <p className="flex gap-2 items-center text-lg">{props.invite.albomDto.views.toLocaleString(undefined, { maximumFractionDigits: 2 })}<FontAwesomeIcon className="text-lg translate-y-[-2px]" icon={faEye} /></p>
            </div>
            <p className="ml-auto whitespace-nowrap py-3">{moment(props.invite.create).format("DD/MM/YYYY - HH:mm")}</p>
            <div className="flex gap-2 z-[10]">
                <div className="bg-green-500 rounded-sm flex items-center justify-center text-center w-[35px] h-[35px]
                cursor-pointer transition-all hover:bg-primary-100" onClick={props.onAccept}>
                    <FontAwesomeIcon className="text-xl" icon={faCheck} />
                </div>
                <div className="bg-red-500 rounded-sm flex items-center justify-center text-center w-[35px] h-[35px]
                cursor-pointer transition-all hover:bg-primary-100" onClick={props.onRejected}>
                    <FontAwesomeIcon className="text-xl" icon={faCancel} />
                </div>
            </div>
        </div>
    )
}