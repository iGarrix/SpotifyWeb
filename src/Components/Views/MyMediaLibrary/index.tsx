import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { Outlet, useNavigate } from "react-router-dom";
import { ProfileButton } from "../../Commons/Buttons/ProfileButton";

export const MyMediaLibrary: React.FC = () => {
    const [currentItem, setCurrentItem] = useState(window.location.pathname);
    const nav = useNavigate();
    const { t } = useTranslation();
    const onCurrentItem = (path: string) => {
        setCurrentItem(path);
        nav(path);
    }
    return (
        <div className="w-full h-full flex flex-col justify-start py-8 mm:py-[5%] px-12 mm:px-[2%] sm:px-[2%] md:px-[2%] lg:px-[2%] items-center relative">
            <Helmet>
                <title>Soundwave | MyMediaLibrary</title>
            </Helmet>

            <div className={`h-full w-full flex flex-col items-center mm:items-start sm:items-start md:items-start mm:px-[2%] sm:px-[2%] md:px-[2%] mt-5 mm:mt-0`}>
                <div className="w-full items-center flex flex-col gap-5">
                    <h1 className="font-semibold text-2xl dark:text-light-200">{t("Your saves library")}</h1>
                    <div className="bg-light-100 dark:bg-dark-100 mm:w-full sm:w-full md:w-full flex mm:px-[10px] sm:px-[20px] md:px-[30px] lg:px-[40px]
                    px-[50px] rounded-xl py-3 justify-center gap-[100px] mm:flex-col mm:gap-[10px] sm:gap-[10px]">
                        <ProfileButton text={t("Songs")} isSelect={currentItem === "/medialibrary"} onClick={() => { onCurrentItem("/medialibrary") }} />
                        <ProfileButton text={t("Albums")} isSelect={currentItem === "/medialibrary/albums"} onClick={() => { onCurrentItem("/medialibrary/albums") }} />
                        <ProfileButton text={t("Playlists")} isSelect={currentItem === "/medialibrary/playlists"} onClick={() => { onCurrentItem("/medialibrary/playlists") }} />
                        <ProfileButton text={t("Creators")} isSelect={currentItem === "/medialibrary/creators"} onClick={() => { onCurrentItem("/medialibrary/creators") }} />
                    </div>
                </div>
                <Outlet />
            </div>
        </div>
    );
};