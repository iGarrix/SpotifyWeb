import { Guid } from "guid-typescript";
import React, { useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useTypedSelector } from "../../../../../Hooks/useTypedSelector";
import { defaultMusicImage, formatBytes } from "../../../../../types";
import { ProfileButton } from "../../../../Commons/Buttons/ProfileButton";

const copy_icon = require('../../../../../Assets/Icons/Copy.png');

export const UploadAlbumStepThree: React.FC = () => {

    const nav = useNavigate();
    const reducer = useTypedSelector(state => state.uploadReducer);
    const user = useTypedSelector(state => state.userReducer.profile);
    const [copy, setCopy] = useState(false);
    const [link, setLink] = useState(document.location.origin + "/search?query=" + reducer.albumdata?.title);
    const { t } = useTranslation();

    useEffect(() => {
        if (!reducer.albumfiles) {
            nav(-2);
        }
    }, [reducer.albumfiles]);

    return (
        <div className="w-full flex flex-col items-center gap-10 h-full relative text-dark-200 dark:text-light-200">
            <div className="flex flex-col pt-[4%] gap-[7%] mm:gap-4 sm:gap-4 md:gap-4 w-full h-full px-[30%] mm:px-[2%] sm:px-[2%] md:px-[5%] lg:px-[5%] xl:px-[15%] 2xl:px-[25%]">
                <div className="flex flex-col gap-2 bg-light-100 dark:bg-dark-100 rounded-lg px-6 py-5">
                    <h1 className="text-xl font-medium">{t("Preview")}</h1>
                    <div className="w-full flex mm:flex-col sm:flex-col mm:items-center sm:items-center gap-[20px]">
                        <img alt="single_image" src={reducer.albumdata ? reducer.albumdata.image : ""} className="cursor-pointer transition-all object-cover h-[200px] w-[200px] rounded-xl" onError={(tg: any) => { tg.target.src = defaultMusicImage }} />
                        <div className="flex flex-col gap-2 w-full">
                            <div>
                                <h1 className="text-2xl font-bold">{reducer.albumdata?.title}</h1>
                                <h1 className="text-md">{reducer.albumfiles?.length} {t("songs")}</h1>
                            </div>
                            <div className="flex flex-col gap-3 w-full">
                                {
                                    reducer.albumfiles &&
                                    reducer.albumfiles.map(f => {
                                        return (
                                            <div key={Guid.create().toString()} className="bg-light-300 dark:bg-dark-200/30 w-full py-2 px-3 rounded-lg flex mm:flex-wrap justify-between items-center">
                                                <h1 className="text-lg mm:text-base">{user?.username} - {f.name}</h1>
                                                <p>{formatBytes(f.file.size)}</p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-1 w-full">
                    <h1 className="text-lg font-medium">{copy ? t("Link copied!") : t("Share link")}</h1>
                    <div className="flex w-full">
                        <div className="flex w-full justify-between bg-light-100 dark:bg-dark-100 shadow-sm rounded-md items-center gap-[64px] overflow-hidden py-2 pr-4 pl-0">
                            <a href={link} className="text-md px-4 hover:text-primary-100 dark:hover:text-blue-500">{link}</a>
                            <CopyToClipboard text={link ? link : ""} onCopy={() => { setCopy(true) }}>
                                <p className=" flex items-center justify-center text-center
                                text-lg font-medium cursor-pointer"><img alt="icon" src={copy_icon} className="object-cover bg-cover" /></p>
                            </CopyToClipboard>
                        </div>
                    </div>
                    <div className="w-full flex justify-end mt-5">
                            <ProfileButton text={t("Go to main")} isSelect={true} onClick={() => { nav("/") }} />
                    </div>
                </div>
            </div>
        </div>
    )
}