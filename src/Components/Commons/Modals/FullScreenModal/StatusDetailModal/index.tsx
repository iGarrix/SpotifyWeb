import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ProfileButton } from "../../../Buttons/ProfileButton";
import { IStatusDetailModal } from "./types";

export const StatusDetailModal: React.FC<IStatusDetailModal> = ({ ...props }) => {

    const nav = useNavigate();

    return (
        <div className="flex flex-col justify-center items-center rounded-xl bg-light-100 shadow-xl px-[2%] py-[2%] gap-5 border border-light-200">
            <div className="flex flex-col my-[10px] gap-3">
                <h2 className="font-bold text-2xl text-center">Serious reasons</h2>
                <div className="flex justify-between items-center gap-5">
                    <p className="whitespace-nowrap text-dark-200/80">{moment(props.data.userStatusDto.startDate).format("DD/MM/YYYY - HH:mm")}</p>
                    <FontAwesomeIcon icon={faArrowRight} />
                    <p className="whitespace-nowrap text-dark-200/80">{moment(props.data.userStatusDto.endDate).format("DD/MM/YYYY - HH:mm")}</p>
                </div>
                <hr className="w-full border-light-300" />
                <div className="flex flex-col">
                    <p>Status: <span className="font-medium text-red-500">{props.data.userStatusDto.status}</span></p>
                    <p>Reason: {props.data.userStatusDto.reason}</p>
                    <p>Created limit: {moment(props.data.userStatusDto.create).format("DD/MM/YYYY - HH:mm")}</p>
                </div>
                <hr className="w-full border-light-300" />
                <div className="flex flex-col">
                    <h3 className="text-center font-medium text-lg mb-1">Administrator (Sender)</h3>
                    <p>PIB: <span className="font-medium text-blue-500 cursor-pointer" onClick={() => {
                        props.onClose();
                        nav("/overview/" + props.data.admin.username);
                    }}>{props.data.admin.name} {props.data.admin.surname}</span></p>
                    <p>Nickname: <span className="font-medium text-blue-500 cursor-pointer" onClick={() => {
                        props.onClose();
                        nav("/overview/" + props.data.admin.username);
                    }}>{props.data.admin.username}</span></p>
                    <p>Phone: {props.data.admin.phone}</p>
                </div>
                <hr className="w-full border-light-300" />
                <div className="flex flex-col">
                    <h3 className="text-center font-medium text-lg mb-1">You (Receiver)</h3>
                    <p>PIB: <span className="font-medium text-blue-500 cursor-pointer" onClick={() => {
                        props.onClose();
                        nav("/profile");
                    }}>{props.data.user.name} {props.data.user.surname}</span></p>
                    <p>Nickname: <span className="font-medium text-blue-500 cursor-pointer" onClick={() => {
                        props.onClose();
                        nav("/profile");
                    }}>{props.data.user.username}</span></p>
                    <p>Phone: {props.data.user.phone}</p>
                </div>
            </div>
            <ProfileButton text="Ok" onClick={props.onClose} isSelect />
        </div>
    )
}