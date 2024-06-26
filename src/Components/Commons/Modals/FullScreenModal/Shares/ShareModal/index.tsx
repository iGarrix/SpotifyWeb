import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { useTranslation } from "react-i18next";
import { IShareAlbumModal } from "./types";

export const ShareModal: React.FC<IShareAlbumModal> = ({ ...props }) => {

    const [isCopy, setCopy] = useState(false);
    const { t } = useTranslation();
    const onCloseHandle = () => {
        props.onClose();
        setCopy(false);
    }

    return (
        <div className="rounded-lg flex flex-col gap-6 text-dark-200 bg-light-100 dark:text-light-200 dark:bg-dark-200 shadow-xl py-4 px-8 mx-[25%] mm:mx-0 sm:mx-[10%]
        md:mx-[10%] mm:w-full">
            <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center gap-10">
                    <h1 className="text-xl whitespace-nowrap">{props.title}</h1>
                    <div className="w-full flex justify-end"><FontAwesomeIcon className="text-dark-200 dark:text-light-200 font-medium text-2xl cursor-pointer hover:text-red-500 rounded-sm px-1" icon={faClose} onClick={onCloseHandle} /></div>
                </div>
                <hr className="w-full border border-light-200 dark:border-dark-100" />
            </div>
            {props.banner}
            <div className="flex flex-col gap-1 w-full mm:mt-auto">
                <h1 className="text-lg font-medium">{isCopy ? t("Link copied!") : t("Share link")}</h1>
                <div className="flex w-full">
                    <div className="flex w-full justify-between bg-light-200 dark:bg-dark-100 shadow-sm rounded-md items-center gap-[64px] overflow-hidden">
                        <a href={props.link} className="px-4 hover:text-primary-100 dark:hover:text-blue-400" target={"_blank"}>{props.link}</a>
                        <div className="mm:hidden">
                            <CopyToClipboard text={props.link ? props.link : ""} onCopy={() => { setCopy(true) }}>
                                <p className="text-light-100 flex items-center justify-center text-center
                                text-lg font-medium bg-blue-500 hover:bg-sky-500 rounded-lg px-[24px] py-[6px] cursor-pointer">{isCopy ? t("Copied") : t("Copy")}</p>
                            </CopyToClipboard>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}