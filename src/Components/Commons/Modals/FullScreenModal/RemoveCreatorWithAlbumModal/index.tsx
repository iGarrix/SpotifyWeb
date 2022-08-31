import { faClose, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Guid } from "guid-typescript";
import React from "react";
import { useTranslation } from "react-i18next";
import { useTypedSelector } from "../../../../../Hooks/useTypedSelector";
import { IUserSearch } from "../../../../../Redux/Reducers/SearchReducer/types";
import { defaultAvatarImage, GetUserAvatarSimple } from "../../../../../types";
import { IRemoveCreatorWithAlbumModal } from "./types";


export const RemoveCreatorWithAlbumModal: React.FC<IRemoveCreatorWithAlbumModal> = ({ ...props }) => {

    const { artists, error } = useTypedSelector(state => state.searchReducer);
    const { t } = useTranslation();
    const onCloseHandle = () => {
        props.onClose();
    }

    const onRemoveHandle = (item: IUserSearch | null) => {
        if (item) {
            props.onRemove(item);
        }
    }

    return (
        <div className="rounded-md py-6 flex flex-col items-center gap-3 text-dark-200 dark:text-light-200 bg-light-100 dark:bg-dark-200 shadow-xl px-8 border border-light-200 dark:border-dark-200 mm:w-full mm:h-full">
            <div className="flex justify-between w-full gap-[15rem]">
                <h1 className="text-xl whitespace-nowrap">{t("Invite List")}</h1>
                <div className="w-full flex justify-end"><FontAwesomeIcon className="text-dark-200 dark:text-light-200 font-medium text-2xl cursor-pointer hover:text-red-500 dark:hover:text-red-500 rounded-sm px-1" icon={faClose} onClick={onCloseHandle} /></div>
            </div>
            <hr className="w-full dark:border-dark-100" />
            <div className="flex flex-col gap-4 w-full">
                {
                    error ?
                        <h1 className="text-center bg-red-500/90 text-light-100 rounded-lg py-4">{error}</h1>
                        :
                        <div className="flex flex-col gap-2 w-full">
                            {
                                props.artists && props.artists.length > 0 ?
                                    props.artists.map(item => {
                                        return (
                                            <div key={Guid.create().toString()} className="flex gap-2 overflow-hidden rounded-md">
                                                <img alt="avatar" src={GetUserAvatarSimple(item.avatar)} className="w-[64px] h-[64px] rounded-md"
                                                    onError={(tg: any) => { tg.target.src = defaultAvatarImage }} />
                                                <div className="flex flex-col justify-center">
                                                    <p className="text-lg">{item.username}</p>
                                                </div>
                                                <div className="flex items-center ml-auto">
                                                    <FontAwesomeIcon icon={faTrash} className="flex items-center justify-center text-center rounded-md p-2 px-2.5 shadow-xl cursor-pointer
                                                bg-blue-500 text-light-100 ml-auto text-lg bg-cover object-cover" onClick={() => { onRemoveHandle(item) }} />
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