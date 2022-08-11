import { Guid } from "guid-typescript";
import React, { useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { useLocation, useNavigate } from "react-router-dom";
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
    const history = useLocation();

    useEffect(() => {
        if (!reducer.albumfiles) {
            nav(-2);
        }
    }, [reducer.albumfiles]);

    return (
        <div className="w-full flex flex-col items-center gap-10 h-full relative text-dark-200 dark:text-light-200">
            <div className="flex flex-col pt-[4%] gap-[6%] w-full h-full px-[30%]">
                <div className="flex flex-col gap-2 bg-light-200 dark:bg-dark-100 rounded-lg p-4">
                    <h1 className="text-xl font-medium">Preview</h1>
                    <div className="w-full flex gap-[50px]">
                        <img alt="single_image" src={reducer.singledata ? reducer.singledata.image : ""} className="cursor-pointer transition-all object-cover h-[200px] w-[200px] rounded-xl" onError={(tg: any) => { tg.target.src = defaultMusicImage }} />
                        <div className="flex flex-col gap-2 w-full">
                            <div>
                                <h1 className="text-2xl font-bold">{reducer.albumdata?.title}</h1>
                                <h1 className="text-md">{reducer.albumfiles?.length} songs</h1>
                            </div>
                            <div className="flex flex-col gap-3 w-full">
                                {
                                    reducer.albumfiles &&
                                    reducer.albumfiles.map(f => {
                                        return (
                                            <div key={Guid.create().toString()} className="bg-light-300 dark:bg-dark-200/30 w-full py-2 px-3 rounded-lg flex justify-between items-center">
                                                <h1 className="text-lg">{user?.username} - {f.name}</h1>
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
                    <h1 className="text-lg font-medium">{copy ? "Link copied!" : "Share link"}</h1>
                    <div className="flex w-full">
                        <div className="flex w-full justify-between bg-light-200 dark:bg-dark-100 shadow-sm rounded-md items-center gap-[64px] overflow-hidden py-2 pr-4 pl-0">
                            <a href={link} className="text-md px-4 hover:text-primary-100 dark:hover:text-blue-500">{link}</a>
                            <CopyToClipboard text={link ? link : ""} onCopy={() => { setCopy(true) }}>
                                <p className=" flex items-center justify-center text-center
                                text-lg font-medium cursor-pointer"><img alt="icon" src={copy_icon} className="object-cover bg-cover" /></p>
                            </CopyToClipboard>
                        </div>
                    </div>
                </div>
                <div className="flex w-full justify-end">

                </div>
            </div>
            <div className="flex justify-end w-full mt-auto px-[15%] pb-[4%]">
                <ProfileButton text={"Go to main"} isSelect={true} onClick={() => { nav("/") }} />
            </div>
        </div>
    )
}