import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { IShareAlbumModal } from "./types";

export const ShareModal : React.FC<IShareAlbumModal> = ({...props}) => {

    const [isCopy, setCopy] = useState(false);

    const onCloseHandle = () => {
        props.onClose();
        setCopy(false);
    }

    return (
        <div className="rounded-lg flex flex-col gap-6 text-dark-200 bg-light-100 shadow-xl py-4 px-8 mx-[25%]">
            <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center gap-10">
                    <h1 className="text-xl font-['Lexend'] whitespace-nowrap">{props.title}</h1>
                    <div className="w-full flex justify-end"><FontAwesomeIcon className="text-dark-200 font-medium text-2xl cursor-pointer hover:text-red-500 rounded-sm px-1" icon={faClose} onClick={onCloseHandle} /></div>
                </div>
                <hr className="w-full border border-light-200" />
            </div>
            {props.banner}
            <div className="flex flex-col gap-1 w-full">
                <h1 className="text-lg font-medium">{isCopy ? "Link copied!" : "Share link"}</h1>
                <div className="flex w-full bg-green-500">
                    <div className="flex w-full justify-between bg-light-200 shadow-sm rounded-sm items-center gap-[64px]">
                        <a href={props.link} className="text-md px-4 hover:text-primary-100" target={"_blank"}>{props.link}</a>
                        <CopyToClipboard text={props.link ? props.link : ""} onCopy={() => {setCopy(true)}}>
                            <p className="text-light-100 flex items-center justify-center text-center
                            text-lg font-medium bg-blue-500 px-[24px] py-[6px] cursor-pointer">{isCopy ? "Copied" : "Copy"}</p>            
                        </CopyToClipboard>
                    </div>
                </div>
            </div>
        </div>
    )
}