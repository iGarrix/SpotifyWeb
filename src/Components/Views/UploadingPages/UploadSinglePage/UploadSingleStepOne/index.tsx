import { faFileArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useActions } from "../../../../../Hooks/useActions";
import { useTypedSelector } from "../../../../../Hooks/useTypedSelector";
import { formatBytes } from "../../../../../types";
import { ProfileButton } from "../../../../Commons/Buttons/ProfileButton";

const icon_trash = require('../../../../../Assets/Icons/Trash.png');

export const UploadSingleStepOne: React.FC = () => {

    const nav = useNavigate();
    const file = useTypedSelector(state => state.uploadReducer.singlefile);
    const { initSingleFile } = useActions();
    const { t } = useTranslation();
    const onUpload = (event: any) => {
        initSingleFile(event.target.files[0]);
    }

    useEffect(() => {
        initSingleFile(null);
    }, []);

    const onDelete = () => {
        initSingleFile(null);
    }
    return (
        <div className="w-full flex flex-col items-center gap-10 h-full relative text-dark-200 dark:text-light-200">
            {
                !file ?
                    <div className="w-full pt-[4%] flex flex-col items-center gap-4 h-full">
                        <h1 className="text-4xl mm:text-3xl font-bold text-center">{t("Upload Single")}</h1>
                        <p className="font-medium text-xl mt-10 text-center">{t("Drag & drop your single")}</p>
                        <div className="flex">
                            <input type="file" id="filebg" accept="audio/mp3" onChange={onUpload} className="hidden" />
                            <ProfileButton text={
                                <label htmlFor="filebg" className="cursor-pointer"><div className="flex gap-2"> <h1>{t("Choose file to upload")}</h1></div></label>
                            } onClick={() => { }} isSelect={true} />
                        </div>
                    </div> :
                    <div className="flex flex-col pt-[4%] gap-12 w-full h-full">
                        <h1 className="text-4xl mm:text-3xl font-bold text-center">{t("Uploading is complete")}</h1>
                        <div className="w-full px-[30%] mm:px-[3%] sm:px-[3%] md:px-[5%] lg:px-[15%] xl:px-[15%]">
                            <div className="flex justify-between flex-wrap items-center rounded-lg gap-2 bg-light-100 dark:bg-dark-100 p-2 pr-4">
                                <div className="flex gap-3 items-center">
                                    <FontAwesomeIcon className="text-4xl text-dark-200/90 dark:text-light-300" icon={faFileArrowUp} />
                                    <p className="text-lg">{file.name}</p>
                                </div>
                                <div className="flex items-center ml-auto gap-2">
                                    <p className="">{formatBytes(file.size)}</p>
                                    <img className="invert dark:invert-0 w-[25px] cursor-pointer" alt="trash" src={icon_trash} onClick={onDelete} />
                                </div>
                            </div>
                        </div>
                        {
                            file &&
                            <div className="flex justify-end w-full mt-auto px-[15%] pb-[4%] ">
                                <ProfileButton text={t("Next")} isSelect onClick={() => { nav("information") }} />
                            </div>
                        }
                    </div>
            }
        </div>
    )
}
