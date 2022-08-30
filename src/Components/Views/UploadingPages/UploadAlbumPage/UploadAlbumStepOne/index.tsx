import { Guid } from "guid-typescript";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useActions } from "../../../../../Hooks/useActions";
import { useTypedSelector } from "../../../../../Hooks/useTypedSelector";
import { ISongData } from "../../../../../Redux/Reducers/UploadReducer/types";
import { DefaultButton } from "../../../../Commons/Buttons/DefaultButton";
import { ProfileButton } from "../../../../Commons/Buttons/ProfileButton";
import { UploadFileCard } from "../../../../Commons/Cards/UploadFileCard";

export const UploadAlbumStepOne: React.FC = () => {

    const nav = useNavigate();
    const { t } = useTranslation();
    const reducer = useTypedSelector(state => state.uploadReducer);
    const [files, setFiles] = useState<ISongData[] | null>(() => {
        if (reducer.albumfiles) {
            return reducer.albumfiles;
        }
        return [];
    })
    const { initAlbumFiles, initAlbumMoreFiles, removeAlbumFile } = useActions(); 

    useEffect(() => {
        if (reducer.albumfiles) {
            setFiles(reducer.albumfiles);
        }
        else {
            setFiles(null);
        }
    }, [reducer.albumfiles])

    const onUpload = (event: any) => {
        let song: ISongData[] = [];
        [...event.target.files].forEach((f: File) => {
            if (f.size <= 26214400) {           
                song.push(
                    {
                        file: f,
                        name: f.name.replace(".mp3", "").replace("-", "").replace(".", "").replace("_", ""),
                    }
                );
            }
        })
        initAlbumFiles([...song]);
    }

    useEffect(() => {
        initAlbumFiles(null);
    }, []);

    const onClear = () => {
        initAlbumFiles(null);
    }
    const onDelete = (item : ISongData | null) => {
        if (item) {
            removeAlbumFile(item);
        }
    }
    const onUploadMore = (event: any) => {
        let song: ISongData[] = [];
        [...event.target.files].forEach((f: File) => {
            if (f.size <= 26214400) {        
                song.push(
                    {
                        file: f,
                        name: f.name.replace(".mp3", "").replace("-", "").replace(".", "").replace("_", ""),
                    }
                );
            }
        })
        initAlbumMoreFiles([...song]);
    }

    const onNext = () => {
        initAlbumFiles(files);
        nav("information")
    }

    const onChangeTitle = (item: ISongData, value: string) => {
        if (files) {
            const index = files.findIndex(f => f.file.size === item.file.size && f.name === item.name);
            item.name = value;
            files[index] = item;
        }
    }

    return (
        <div className="w-full flex flex-col items-center gap-10 h-full relative text-dark-200 dark:text-light-200">
            {
                !files || files.length === 0 ?
                    <div className="w-full pt-[4%] flex flex-col items-center gap-4 h-full">
                        <h1 className="text-4xl mm:text-3xl font-bold text-center">{t("Upload Album")}</h1>
                        <p className="font-medium text-xl mt-10 text-center">{t("Drag & drop mp3 files")}</p>
                        <div className="flex">
                            <input type="file" id="filebg" accept="audio/mp3" multiple onChange={onUpload} className="hidden" />
                            <ProfileButton text={
                                <label htmlFor="filebg" className="cursor-pointer"><div className="flex gap-2"> <h1>{t("Choose file to upload")}</h1></div></label>
                            } onClick={() => { }} isSelect={true} />
                        </div>
                    </div> :
                    <div className="flex flex-col pt-[4%] gap-12 w-full h-full">
                        <h1 className="text-4xl mm:text-3xl font-bold text-center">{t("Uploading is complete")}</h1>
                        <div className="w-full px-[35%] mm:px-[3%] sm:px-[3%] md:px-[5%] lg:px-[15%] xl:px-[15%] 2xl:px-[30%] gap-4 flex flex-col">
                            {
                                files?.map(item => {
                                    return (
                                        <UploadFileCard key={Guid.create().toString()} file={item} onDelete={() => { onDelete(item); } } onChange={(e: any) => {onChangeTitle(item, e.target.value)}}/>
                                    )
                                })
                            }
                            <div className="w-full flex justify-center gap-6">
                                <div className="flex">
                                    <input type="file" id="filebgmore" accept="audio/mp3" multiple onChange={onUploadMore} className="hidden" />
                                    <DefaultButton text={
                                        <label htmlFor="filebgmore" className="cursor-pointer"><div className="flex gap-2"> <h1>{t("Upload more")}</h1></div></label>
                                    } onClick={() => { }}/>
                                    
                                </div>
                                <DefaultButton onClick={onClear} text={t("Clear All")} />
                            </div>
                        </div>
                        {
                            files &&
                            <div className="flex justify-end w-full mt-auto px-[15%] pb-[4%]">
                                <ProfileButton text={t("Next")} isSelect onClick={onNext} />
                            </div>
                        }
                    </div>
            }
        </div>
    )
}
