import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Outlet, useNavigate } from "react-router-dom";
import { ProfileButton } from "../../Commons/Buttons/ProfileButton";

export const MyMediaLibrary: React.FC = () => {
    const [currentItem, setCurrentItem] = useState(window.location.pathname);
    const nav = useNavigate();
    const onCurrentItem = (path: string) => {
        setCurrentItem(path);
        nav(path);
    }
    return (
        <div className="w-full h-full flex flex-col justify-start py-8 px-12 items-center relative">
            <Helmet>
                <title>Soundwave | MyMediaLibrary</title>
            </Helmet>

            <div className={`h-full w-full flex flex-col items-center mt-5`}>
                <div className="w-full items-center flex flex-col gap-5">
                    <h1 className="font-semibold text-2xl">Saves</h1>
                    <div className="bg-light-200/100 flex px-[50px] rounded-xl py-3 justify-center gap-[100px]">
                        <ProfileButton text="songs" isSelect={currentItem === "/medialibrary"} onClick={() => { onCurrentItem("/medialibrary") }} />
                        <ProfileButton text="albums" isSelect={currentItem === "/medialibrary/albums"} onClick={() => { onCurrentItem("/medialibrary/albums") }} />
                        <ProfileButton text="playlists" isSelect={currentItem === "/medialibrary/playlists"} onClick={() => { onCurrentItem("/medialibrary/playlists") }} />
                        <ProfileButton text="creators" isSelect={currentItem === "/medialibrary/creators"} onClick={() => { onCurrentItem("/medialibrary/creators") }} />
                    </div>
                </div>
                <Outlet />
            </div>
        </div>
    );
};
