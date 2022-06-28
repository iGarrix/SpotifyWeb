import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export interface IPreviewCardAccount {
    ImageSrc: string,
    BackgroundSrc: string,
    title: string,
    nickname: string,
    email: string,
    icon: IconProp,
    isSelect?: boolean,
    onSelect?: () => void,
}

export const PreviewCardAccount: React.FC<IPreviewCardAccount> = ({...props}) => {
    return (
        <div className={`flex rounded-xl p-5 gap-4 overflow-hidden transition-all relative cursor-pointer hover:shadow-lg hover:shadow-white ${props.isSelect && "shadow-lg shadow-primary-100"}`} onClick={props.onSelect}>
            <div className="absolute top-0 left-0 w-full h-full z-[-1]">
                <img alt="backgroundimage" className="bg-cover bg-no-repeat object-cover w-full h-full" src={props.BackgroundSrc} />
            </div>
            <img alt="avatar" src={props.ImageSrc} className="cursor-pointer transition-all bg-cover bg-no-repeat object-cover rounded-[50%] w-[94px] h-[94px] shadow-2xl" />
            <div className="flex flex-col w-full">
                <div className="flex items-center gap-4">
                    <h2 className="font-semibold text-2xl">{props.nickname}</h2>
                    <h2 className="text-xl"><FontAwesomeIcon icon={props.icon} className="text-blue-500 animate-pulse" width={20} height={20} /></h2>
                </div>
                <p className="text-white/60">{props.email}</p>
                <div className="flex w-full justify-end mt-auto">
                    <p className={`${props.isSelect && "text-sky-500 blur-[0.5px]0"}`}>{props.title}</p>
                </div>
            </div>
        </div>
    )
}