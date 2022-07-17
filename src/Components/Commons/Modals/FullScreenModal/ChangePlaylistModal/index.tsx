import { faClose, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useActions } from "../../../../../Hooks/useActions";
import { useTypedSelector } from "../../../../../Hooks/useTypedSelector";
import { IChangePlaylistRequest } from "../../../../../Redux/Reducers/MyPlaylistReducer/types";
import { DefaultSettingsDropdown } from "../../../DefaultSettingsDropdown";
import { Field } from "../../../Inputs/Field";
import { IChangePlaylistModal } from "./types";


export const ChangePlaylistModal: React.FC<IChangePlaylistModal> = ({ onSave, onClose, playlist }) => {
    const error = useTypedSelector(state => state.userReducer.error);
    const {updatePlaylist} = useActions();
    useEffect(() => {
        if (error && error !== "") {         
            setEnterError(error);
        }
    }, [error]);
    const [enterError, setEnterError] = useState("");
    const onSubmit = async (event: any) => {
        event.preventDefault();
        try {
            if (event.target[0].value.length === 0) {
                setEnterError("Field 'Name' is empty")
                return;
            }
            else if (event.target[1].value.length === 0) {
                setEnterError("Field 'AccessType' is empty")
                return;
            }
            if (playlist && playlist.playlistDto && playlist.playlistCreator) {
                const request: IChangePlaylistRequest = {
                    response: { findPlaylistCreatorEmail: playlist.playlistCreator?.email, findPlaylistName: playlist.playlistDto?.name },
                    newName: event.target[0].value,
                    newStatus: event.target[1].value,
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
    return (
        <div className="rounded-md py-12 flex flex-col items-center gap-3 text-dark-200 bg-light-100 shadow-xl px-10 border border-light-200">
            <div className="flex justify-between w-full">
                <h1 className="text-xl font-['Lexend']">Change</h1>
                <div className="w-full flex justify-end"><FontAwesomeIcon className="text-dark-200 font-medium text-2xl cursor-pointer hover:text-red-500 rounded-sm px-1" icon={faClose} onClick={onCloseSubmit} /></div>
            </div>
            <hr className="w-full mb-4" />
            {
                enterError && enterError.length !== 0 ?
                    <p className="text-red-500 font-medium text-lg flex gap-3 items-center"><FontAwesomeIcon className="text-xl" icon={faTriangleExclamation} />{enterError}</p> : null
            }
            <form onSubmit={onSubmit}>
                {
                    playlist ?
                    <div className="flex flex-col gap-3 px-20">
                        <Field placeholder="Enter new name" value={playlist.playlistDto?.name} onChange={(e: any) => { }} />
                        <DefaultSettingsDropdown value={playlist.playlistDto?.accessStatus} onChange={(e: any) => { } } title={"Chose new access type"} options={["Public", "Private"]} />
                        <button type="submit" className="text-center font-medium text-lg hover:text-primary-100 transition-all mt-7">You want to rename pib?</button>
                    </div> : null
                }
            </form>
        </div>
    )
}