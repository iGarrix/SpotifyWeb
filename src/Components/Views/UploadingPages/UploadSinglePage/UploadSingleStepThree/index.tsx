import React, { useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { useLocation, useNavigate } from "react-router-dom";
import { useTypedSelector } from "../../../../../Hooks/useTypedSelector";
import { defaultMusicImage } from "../../../../../types";
import { ProfileButton } from "../../../../Commons/Buttons/ProfileButton";

const copy_icon = require('../../../../../Assets/Icons/Copy.png');

export const UploadSingleStepThree: React.FC = () => {

    const nav = useNavigate();
    const reducer = useTypedSelector(state => state.uploadReducer);
    const user = useTypedSelector(state => state.userReducer.profile);
    const [copy, setCopy] = useState(false);
    const [link, setLink] = useState(document.location.origin + "/search?query=" + reducer.singledata?.title);

    useEffect(() => {
        if (!reducer.singlefile) {
            nav(-2);
        }
    }, [reducer.singlefile]);

    return (
        <div className="w-full flex flex-col items-center gap-10 h-full relative text-dark-200 dark:text-light-200">
            <div className="flex flex-col pt-[4%] gap-[6%] w-full h-full px-[30%]">
                <div className="flex flex-col gap-2">
                    <h1 className="text-xl font-medium">Preview</h1>
                    <div className="p-4 bg-light-100 dark:bg-dark-100 w-full rounded-lg flex gap-3">
                        <img alt="single_image" src={reducer.singledata ? reducer.singledata.image : ""} className="cursor-pointer transition-all object-cover h-[120px] w-[120px] rounded-xl" onError={(tg: any) => { tg.target.src = defaultMusicImage }} />
                        <div className="flex flex-col justify-center">
                            <h1 className="text-2xl font-['Lexend'] font-bold">{reducer.singledata?.title}</h1>
                            <h1 className="text-xl font-['Lexend'] font-nornal">{user?.username}</h1>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-1 w-full">
                    <h1 className="text-lg font-medium">{copy ? "Link copied!" : "Share link"}</h1>
                    <div className="flex w-full">
                        <div className="flex w-full justify-between bg-light-100 dark:bg-dark-100 shadow-sm rounded-md items-center gap-[64px] overflow-hidden py-2 pr-4 pl-0">
                            <a href={link} className="text-md px-4 hover:text-primary-100 dark:hover:text-blue-500">{link}</a>
                            <CopyToClipboard text={link ? link : ""} onCopy={() => { setCopy(true) }}>
                                <p className="flex items-center justify-center text-center
                                text-lg font-medium cursor-pointer"><img alt="icon" src={copy_icon} className="object-cover bg-cover" /></p>
                            </CopyToClipboard>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-end w-full mt-auto px-[15%] pb-[4%]">
                <ProfileButton text={"Go to main"} isSelect={true} onClick={() => { nav("/") }} />
            </div>
        </div>
    )
}