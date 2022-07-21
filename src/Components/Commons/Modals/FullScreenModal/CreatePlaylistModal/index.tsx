import { faImage } from "@fortawesome/free-regular-svg-icons";
import { faClose, faPlus, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useActions } from "../../../../../Hooks/useActions";
import { useTypedSelector } from "../../../../../Hooks/useTypedSelector";
import { ICreatePlaylistRequest } from "../../../../../Redux/Reducers/MyPlaylistReducer/types";
import { baseUrl, defaultAlbumImage, defaultAvatarImage } from "../../../../../types";
import { ProfileButton } from "../../../Buttons/ProfileButton";
import { DefaultSettingsDropdown } from "../../../DefaultSettingsDropdown";
import { Field } from "../../../Inputs/Field";
import { ICreatePlaylistModal } from "./types";

export const CreatePlaylistModal: React.FC<ICreatePlaylistModal> = ({ onSave, onClose }) => {
    const error = useTypedSelector(state => state.userReducer.error);
    const { createPlaylist } = useActions();
    const [file, setFile] = useState<any>("");
    const [targetFile, settargetFile] = useState<any>(null);
    const user = useTypedSelector(state => state.userReducer.profile);
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
            else if (!targetFile) {
                setEnterError("Image 'File' is empty")
                return;
            }
            if (user && targetFile) {
                const request: ICreatePlaylistRequest = {
                    userEmail: user.email,
                    image: targetFile,
                    name: event.target[1].value,
                    accessStatus: event.target[2].value,
                }
                console.log(event);
                console.log(request);
                await createPlaylist(request);
                setEnterError("");
                onSaveSubmit();
            }
        } catch (err) {
            setEnterError(error);
        }
    }
    const onLoadingImage = (e: any) => {
        if (e) {
            var selectedFile = e.target.files[0];
            var reader = new FileReader();
            reader.readAsDataURL(selectedFile);
            reader.onload = e => e?.target ? setFile(e.target?.result) : "";
            settargetFile(selectedFile);
        }
    }
    const onSaveSubmit = () => {
        if (enterError.length === 0) {
            onSave();
            onClose();
        }
    }
    const onCloseSubmit = () => {
        setEnterError("");
        onClose();
    }
    return (
        <div className="rounded-md py-6 flex flex-col items-center gap-3 text-dark-200 bg-light-100 shadow-xl px-10 border border-light-200">
            <div className="flex justify-between w-full">
                <h1 className="whitespace-nowrap text-xl font-['Lexend']">Create playlist</h1>
                <div className="w-full flex justify-end"><FontAwesomeIcon className="text-dark-200 font-medium text-2xl cursor-pointer hover:text-red-500 rounded-sm px-1" icon={faClose} onClick={onCloseSubmit} /></div>
            </div>
            <hr className="w-full mb-4" />
            {
                enterError && enterError.length !== 0 ?
                    <p className="text-red-500 font-medium text-lg flex gap-3 items-center"><FontAwesomeIcon className="text-xl" icon={faTriangleExclamation} />{enterError}</p> : null
            }
            <form className="flex gap-[18px]" onSubmit={onSubmit}>
                <div className="flex flex-col gap-2">
                    <div className="w-48 h-48 relative overflow-hidden rounded-xl">
                        <div className="w-full h-full transition-all bg-black/60 opacity-0 hover:opacity-100 absolute flex justify-center items-center">
                            <input type="file" id="file" accept="image/*" onChange={(event: any) => { onLoadingImage(event) }} className="hidden" />
                            <label htmlFor="file"><FontAwesomeIcon className="invert text-6xl cursor-pointer" icon={faImage} /> </label>
                        </div>
                        <img alt="avatar" src={file} className="cursor-pointer transition-all object-cover w-full h-full" onError={(tg: any) => { tg.target.src = defaultAlbumImage }} />
                    </div>
                </div>
                <div className="flex flex-col gap-5 w-full">
                    <Field placeholder="Enter name" onChange={(e: any) => { }} />
                    <DefaultSettingsDropdown onChange={(e: any) => { }} title={"Chose access type"} options={["Public", "Private"]} />
                    <div className="mt-auto w-full flex justify-end">
                        <ProfileButton text={"Create"} isSelect onClick={() => { }}></ProfileButton>
                    </div>
                </div>
            </form>
        </div>
    )
}