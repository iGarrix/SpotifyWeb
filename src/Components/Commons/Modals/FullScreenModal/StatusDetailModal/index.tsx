import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { t } from "i18next";
import moment from "moment";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ProfileButton } from "../../../Buttons/ProfileButton";
import { IStatusDetailModal } from "./types";

export const StatusDetailModal: React.FC<IStatusDetailModal> = ({ ...props }) => {

    const nav = useNavigate();
    const {t} = useTranslation();

    return (
        <div className="flex flex-col justify-center items-center mm:justify-start rounded-xl mm:rounded-none bg-light-100 dark:bg-dark-100 shadow-xl px-[2%] py-[2%] mm:py-[7%] gap-5 border border-light-200 dark:border-dark-100 mm:h-full sm:full mm:w-full">
            <div className="flex flex-col my-[10px] gap-3">
                <h2 className="font-bold text-2xl text-center">{t(`SeriousReason`)}</h2>
                <div className="flex justify-between items-center gap-5">
                    <p className="whitespace-nowrap text-dark-200/80 dark:text-light-300">{moment(props.data.userStatusDto.startDate).format("DD/MM/YYYY - HH:mm")}</p>
                    <FontAwesomeIcon icon={faArrowRight} />
                    <p className="whitespace-nowrap text-dark-200/80 dark:text-light-300">{moment(props.data.userStatusDto.endDate).format("DD/MM/YYYY - HH:mm")}</p>
                </div>
                <hr className="w-full border-light-300" />
                <div className="flex flex-col">
                    <p>{t(`StatusModal`)}: <span className={`font-medium ${props.data.userStatusDto.status === "Happy" ? "text-green-500" : "text-red-500"}`}>{props.data.userStatusDto.status}</span></p>
                    <p>{t(`Reason`)}: {props.data.userStatusDto.reason}</p>
                    <p>{t(`CrLimit`)}: {moment(props.data.userStatusDto.create).format("DD/MM/YYYY - HH:mm")}</p>
                </div>
                <hr className="w-full border-light-300" />
                <div className="flex flex-col">
                    <h3 className="text-center font-medium text-lg mb-1">{t(`Admin`)} ({t('Sender')})</h3>
                    <p>{t(`PIB`)}: <span className="font-medium text-blue-500 cursor-pointer" onClick={() => {
                        props.onClose();
                        nav("/overview/" + props.data.admin.username);
                    }}>{props.data.admin.name} {props.data.admin.surname}</span></p>
                    <p>{t(`Nickname`)}: <span className="font-medium text-blue-500 cursor-pointer" onClick={() => {
                        props.onClose();
                        nav("/overview/" + props.data.admin.username);
                    }}>{props.data.admin.username}</span></p>
                    <p>{t(`Phone`)}: {props.data.admin.phone}</p>
                </div>
                <hr className="w-full border-light-300" />
                <div className="flex flex-col">
                    <h3 className="text-center font-medium text-lg mb-1">{t(`You`)} ({t('Receiver')})</h3>
                    <p>{t(`PIB`)}: <span className="font-medium text-blue-500 cursor-pointer" onClick={() => {
                        props.onClose();
                        nav("/profile");
                    }}>{props.data.user.name} {props.data.user.surname}</span></p>
                    <p>{t(`Nickname`)}: <span className="font-medium text-blue-500 cursor-pointer" onClick={() => {
                        props.onClose();
                        nav("/profile");
                    }}>{props.data.user.username}</span></p>
                    <p>{t(`Phone`)}: {props.data.user.phone}</p>
                </div>
            </div>
            <div className="mm:mt-auto">
                <ProfileButton text={t(`Ok`)} onClick={props.onClose} isSelect />
            </div>
        </div>
    )
}