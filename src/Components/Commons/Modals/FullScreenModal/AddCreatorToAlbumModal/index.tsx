import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Guid } from "guid-typescript";
import React, { useEffect, useState, useTransition } from "react";
import { useTranslation } from "react-i18next";
import { useActions } from "../../../../../Hooks/useActions";
import { useTypedSelector } from "../../../../../Hooks/useTypedSelector";
import { IUserSearch } from "../../../../../Redux/Reducers/SearchReducer/types";
import { defaultAvatarImage, GetUserAvatarSimple } from "../../../../../types";
import { SearchField } from "../../../Inputs/SearchField";
import { IAddCreatorToAlbumModal } from "./types";

const icon_search = require('../../../../../Assets/Icons/Search.png');

export const AddCreatorToAlbumModal: React.FC<IAddCreatorToAlbumModal> = ({ ...props }) => {

    const [isPending, startTransition] = useTransition();
    const [searchQuery, setSearchQuery] = useState<string>("");
    const { t } = useTranslation();
    const { getAllSearchArtists } = useActions();

    useEffect(() => {
        const fetch = async () => {
            await getAllSearchArtists("*", 1);
        }
        fetch();
    }, []);

    useEffect(() => {
        const work = async (query: string) => {
            await getAllSearchArtists(query, 1);
        }
        if (searchQuery && searchQuery.length > 0) {
            startTransition(() => {
                work(searchQuery);
            })
        }
    }, [searchQuery])

    const { artists, error } = useTypedSelector(state => state.searchReducer);

    const onCloseHandle = () => {
        props.onClose();
    }

    const onAddHandle = (item: IUserSearch | null) => {
        if (item) {
            props.onAdd(item);
            props.onClose();
        }
    }

    return (
        <div className="rounded-md py-6 flex flex-col items-center gap-3 text-dark-200 dark:text-light-200 bg-light-200 dark:bg-dark-200 shadow-xl px-8 border border-light-200 dark:border-dark-200 mm:w-full mm:h-full">
            <div className="flex justify-between w-full">
                <h1 className="text-xl whitespace-nowrap">{t("Add creators to album")}</h1>
                <div className="w-full flex justify-end"><FontAwesomeIcon className="text-dark-200 dark:text-light-200 font-medium text-2xl cursor-pointer hover:text-red-500 dark:hover:text-red-500 rounded-sm px-1" icon={faClose} onClick={onCloseHandle} /></div>
            </div>
            <hr className="w-full dark:border-dark-100" />
            <div className="flex flex-col gap-4 w-full">
                <SearchField placeholder={t("Search artists")} value={searchQuery} onChange={(e: any) => {
                    setSearchQuery(e.target.value)
                }} icon={<img alt="icon" className="invert dark:invert-0 w-[28px]" src={icon_search} />} />

                {
                    error ?
                        <h1 className="text-center bg-red-500/90 text-light-100 rounded-lg py-4">{error}</h1>
                        :
                        <div className="flex flex-col gap-2">
                            {
                                artists && artists.length > 0 ?
                                    artists.map(item => {
                                        return (
                                            <div key={Guid.create().toString()} className="flex gap-2 overflow-hidden border hover:border-primary-100 dark:border-dark-100 dark:hover:border-blue-500
                                         rounded-md cursor-pointer" onClick={() => { onAddHandle(item) }}>
                                                <img alt="avatar" src={GetUserAvatarSimple(item.avatar)} className="w-[64px] h-[64px] rounded-md"
                                                    onError={(tg: any) => { tg.target.src = defaultAvatarImage }} />
                                                <div className="flex flex-col justify-center">
                                                    <p className="text-lg">{item.username}</p>
                                                </div>
                                            </div>
                                        )
                                    }) :
                                    <h1 className="text-center bg-red-500/90 text-light-100 rounded-lg py-4 w-full">{t("No Result")}</h1>
                            }
                        </div>
                }
            </div>
        </div>
    )
}