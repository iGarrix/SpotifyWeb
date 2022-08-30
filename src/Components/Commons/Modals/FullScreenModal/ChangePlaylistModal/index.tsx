import { faClose, faImage, faPlus, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useActions } from "../../../../../Hooks/useActions";
import { useTypedSelector } from "../../../../../Hooks/useTypedSelector";
import { IChangePlaylistImageRequest, IChangePlaylistRequest } from "../../../../../Redux/Reducers/MyPlaylistReducer/types";
import { baseUrl, defaultPlaylistImage } from "../../../../../types";
import { ProfileButton } from "../../../Buttons/ProfileButton";
import { DefaultSettingsDropdown } from "../../../DefaultSettingsDropdown";
import { Field } from "../../../Inputs/Field";
import { IChangePlaylistModal } from "./types";


export const ChangePlaylistModal: React.FC<IChangePlaylistModal> = ({ onSave, onClose, playlist }) => {
    const error = useTypedSelector(state => state.userReducer.error);
    const { updatePlaylist, updateImagePlaylist } = useActions();
    const user = useTypedSelector(state => state.userReducer.profile);
    const { t } = useTranslation();
    useEffect(() => {
        if (error && error !== "") {
            setEnterError(error);
        }
    }, [error]);
    const [enterError, setEnterError] = useState("");
    const onSubmit = async (event: any) => {
        event.preventDefault();
        try {
            if (event.target[1].value.length === 0) {
                setEnterError("Field 'Name' is empty")
                return;
            }
            else if (event.target[2].value.length === 0) {
                setEnterError("Field 'AccessType' is empty")
                return;
            }
            if (playlist && playlist.playlistDto && playlist.playlistCreator) {
                const request: IChangePlaylistRequest = {
                    response: { findPlaylistCreatorEmail: playlist.playlistCreator?.email, findPlaylistName: playlist.playlistDto?.name },
                    newName: event.target[1].value,
                    newStatus: event.target[2].value,
                }
                await updatePlaylist(request);
                setEnterError("");
                onSaveSubmit();
            }
        } catch (err) {
            setEnterError(error);
        }
    }
    const onSaveSubmit = () => {
        if (enterError.length === 0) {
            onSave();
        }
    }
    const onCloseSubmit = () => {
        setEnterError("");
        onClose();
    }
    const onChangeImage = async (e: any) => {
        try {
            const file = e.target.files[0];
            if (user && file && playlist && playlist.playlistDto && playlist.playlistCreator) {
                const request: IChangePlaylistImageRequest = {
                    response: { findPlaylistCreatorEmail: playlist.playlistCreator?.email, findPlaylistName: playlist.playlistDto?.name },
                    image: file,
                }
                await updateImagePlaylist(request);
            }
            onCloseSubmit();
        } catch (error) {

        }
    }
    return (
        <div className="rounded-md py-6 flex flex-col mm:w-full mm:h-full items-center gap-3 text-dark-200 bg-light-100 dark:text-light-200 dark:bg-dark-200 shadow-xl px-10 border border-light-200 dark:border-dark-200">
            <div className="flex justify-between w-full">
                <h1 className="text-xl font-['Lexend']">{t("Change")}</h1>
                <div className="w-full flex justify-end"><FontAwesomeIcon className="text-dark-200 dark:text-light-200 font-medium text-2xl cursor-pointer hover:text-red-500 dark:hover:text-red-500 rounded-sm px-1" icon={faClose} onClick={onCloseSubmit} /></div>
            </div>
            <hr className="w-full mb-4 dark:border-dark-100" />
            {
                enterError && enterError.length !== 0 ?
                    <p className="text-red-500 font-medium text-lg flex gap-3 items-center"><FontAwesomeIcon className="text-xl" icon={faTriangleExclamation} />{enterError}</p> : null
            }
            <form className="flex mm:flex-col gap-[18px]" onSubmit={onSubmit}>
                <div className="flex flex-col mm:items-center gap-2">
                    {
                        playlist ?
                            <div className="w-48 h-48 relative overflow-hidden rounded-xl">
                                <div className="w-full h-full transition-all bg-black/60 opacity-0 hover:opacity-100 absolute flex justify-center items-center">
                                    <input type="file" id="file" accept="image/*" onChange={onChangeImage} className="hidden" />
                                    <label htmlFor="file"><FontAwesomeIcon className="invert dark:invert-0 text-6xl cursor-pointer" icon={faImage} /> </label>
                                </div>
                                <img alt="avatar" src={baseUrl + "Images/Playlist/" + playlist?.playlistDto?.image} className="cursor-pointer transition-all object-cover w-full h-full" onError={(tg: any) => { tg.target.src = defaultPlaylistImage }} />
                            </div> :
                            <div className="flex items-center justify-center w-[240px] h-[240px] bg-light-200">
                                <FontAwesomeIcon onClick={onChangeImage} className="text-white text-[64px]" icon={faPlus} />
                            </div>
                    }
                </div>
                {
                    playlist ?
                        <div className="flex flex-col gap-5 w-full">
                            <Field placeholder={t("Enter new name")} value={playlist.playlistDto?.name} onChange={(e: any) => { }} />
                            <DefaultSettingsDropdown value={playlist.playlistDto?.accessStatus} onChange={(e: any) => { }} title={t("Chose new access type")} options={[t("Public"), t("Private")]} />
                            <div className="mt-auto w-full flex justify-end">
                                <ProfileButton text={t("Save")} isSelect onClick={() => { }}></ProfileButton>
                            </div>
                        </div> : null
                }
            </form>
        </div>
    )
}