import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { IPreviewCardAccount } from "./types";

export const PreviewCardAccount: React.FC<IPreviewCardAccount> = ({ ...props }) => {
    return (
        <div className={`flex rounded-xl border border-light-200 text-dark-200 p-5 gap-4 overflow-hidden transition-all relative cursor-pointer hover:shadow-lg hover:shadow-light-200 ${props.isSelect && "shadow-lg shadow-primary-100"}`} onClick={props.onSelect}>
            <div className="absolute top-0 left-0 w-full h-full z-[-1]">
                <img alt="backgroundimage" className="bg-cover bg-no-repeat object-cover w-full h-full" src={props.BackgroundSrc} />
            </div>
            <img alt="avatar" src={props.ImageSrc} className="cursor-pointer transition-all bg-cover bg-no-repeat object-cover rounded-[50%] w-[94px] h-[94px] shadow-2xl" />
            <div className="flex flex-col w-full">
                <div className="flex items-center gap-4">
                    <h2 className="font-semibold text-2xl">{props.nickname}</h2>
                    <h2 className="text-xl"><FontAwesomeIcon icon={props.icon} className="text-blue-500 animate-pulse" width={20} height={20} /></h2>
                </div>
                <p className="text-dark-200/60">{props.email}</p>
                <div className="flex w-full justify-end mt-auto">
                    <p className={`${props.isSelect && "text-sky-500 blur-[0.5px]0"}`}>{props.title}</p>
                </div>
            </div>
        </div>
    )
}