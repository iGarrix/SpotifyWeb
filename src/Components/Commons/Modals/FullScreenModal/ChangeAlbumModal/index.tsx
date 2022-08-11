import { faClose, faImage, faPlus, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useActions } from "../../../../../Hooks/useActions";
import { useTypedSelector } from "../../../../../Hooks/useTypedSelector";
import { IChangeAlbumRequest, IChangeImageAlbumRequest, IChangeTemplateImageAlbumRequest, IGetAllMyAlbumRequest } from "../../../../../Redux/Reducers/MyAlbumReducer/types";
import { baseUrl, defaultAlbumImage } from "../../../../../types";
import { ProfileButton } from "../../../Buttons/ProfileButton";
import { Field } from "../../../Inputs/Field";
import { IChangeAlbumModal } from "./types";

export const ChangeAlbumModal: React.FC<IChangeAlbumModal> = ({ onSave, onClose, album }) => {
    const error = useTypedSelector(state => state.userReducer.error);
    const user = useTypedSelector(state => state.userReducer.profile);
    const { updateAlbum, updateImageAlbum, getMyAlbum, updateTemplateImageAlbum } = useActions();
    useEffect(() => {
        if (error && error !== "") {
            setEnterError(error);
        }
    }, [error]);
    const [enterError, setEnterError] = useState("");
    const onSubmit = async (event: any) => {
        event.preventDefault();
        try {
            if (event.target[2].value.length === 0) {
                setEnterError("Field 'Name' is empty")
                return;
            }
            else if (event.target[3].value.length === 0) {
                setEnterError("Field 'Description' is empty")
                return;
            }
            if (album && album.albomDto) {
                const request: IChangeAlbumRequest = {
                    findReturnId: album.albomDto.returnId,
                    newName: event.target[2].value,
                    newDescription: event.target[3].value,
                }
                await updateAlbum(request);
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
            if (user && file && album && album.albomDto) {
                const request: IChangeImageAlbumRequest = {
                    findReturnId: album.albomDto.returnId,
                    newImage: file,
                }
                await updateImageAlbum(request);
                if (user) {
                    const rq: IGetAllMyAlbumRequest = {
                        email: user.email,
                        page: 1
                    }
                    await getMyAlbum(rq);
                }
                onCloseSubmit();
            }
        } catch (error) {

        }
    }
    const onChangeTemplateImage = async (e: any) => {
        try {
            const file = e.target.files[0];
            if (user && file && album && album.albomDto) {
                const request: IChangeTemplateImageAlbumRequest = {
                    findReturnId: album.albomDto.returnId,
                    newTemplateimage: file,
                }
                await updateTemplateImageAlbum(request);
                if (user) {
                    const rq: IGetAllMyAlbumRequest = {
                        email: user.email,
                        page: 1
                    }
                    await getMyAlbum(rq);
                }
                onCloseSubmit();
            }
        } catch (error) {

        }
    }
    return (
        <div className="rounded-md py-6 flex flex-col items-center gap-3 text-dark-200 bg-light-100 dark:text-light-200 dark:bg-dark-200 shadow-xl px-10 border border-light-200 dark:border-dark-200">
            <div className="flex justify-between w-full">
                <h1 className="whitespace-nowrap text-xl font-['Lexend']">Change data</h1>
                <div className="w-full flex justify-end"><FontAwesomeIcon className="text-dark-200 dark:text-light-200 font-medium text-2xl cursor-pointer hover:text-red-500 dark:hover:text-red-500 rounded-sm px-1" icon={faClose} onClick={onCloseSubmit} /></div>
            </div>
            <hr className="w-full mb-4" />
            {
                enterError && enterError.length !== 0 ?
                    <p className="text-red-500 font-medium text-lg flex gap-3 items-center"><FontAwesomeIcon className="text-xl" icon={faTriangleExclamation} />{enterError}</p> : null
            }
            <form className="flex gap-[18px]" onSubmit={onSubmit}>
                <div className="flex flex-col gap-2">
                    {
                        album ?
                            <div className="w-48 h-48 relative overflow-hidden rounded-xl">
                                <div className="w-full h-full transition-all bg-black/60 opacity-0 hover:opacity-100 absolute flex justify-center items-center">
                                    <input type="file" id="file" accept="image/*" onChange={onChangeImage} className="hidden" />
                                    <label htmlFor="file"><FontAwesomeIcon className="invert dark:invert-0 text-6xl cursor-pointer" icon={faImage} /> </label>
                                </div>
                                <img alt="avatar" src={baseUrl + "Images/AlbomImages/" + album?.albomDto?.image} className="cursor-pointer transition-all object-cover w-full h-full" onError={(tg: any) => { tg.target.src = defaultAlbumImage }} />
                            </div> :
                            <div className="flex items-center justify-center w-[240px] h-[240px] bg-light-200">
                                <FontAwesomeIcon onClick={onChangeImage} className="text-white text-[64px]" icon={faPlus} />
                            </div>
                    }
                    {
                        album ?
                            <div className="flex flex-col gap-1">
                                <p>Background image</p>
                                <div className="w-32 h-32 relative overflow-hidden rounded-xl">
                                    <div className="w-full h-full transition-all bg-black/60 opacity-0 hover:opacity-100 absolute flex justify-center items-center">
                                        <input type="file" id="tempFile" accept="image/*" onChange={onChangeTemplateImage} className="hidden" />
                                        <label htmlFor="tempFile"><FontAwesomeIcon className="invert dark:invert-0 text-6xl cursor-pointer" icon={faImage} /> </label>
                                    </div>
                                    <img alt="avatar" src={baseUrl + "Images/AlbomTemplates/" + album?.albomDto?.templateimage} className="cursor-pointer transition-all object-cover w-full h-full" onError={(tg: any) => { tg.target.src = defaultAlbumImage }} />
                                </div>
                            </div>
                            :
                            <div className="flex items-center justify-center w-[240px] h-[240px] bg-light-200">
                                <FontAwesomeIcon onClick={onChangeTemplateImage} className="text-white text-[64px]" icon={faPlus} />
                            </div>
                    }
                </div>
                {
                    album ?
                        <div className="flex flex-col gap-5 w-full">
                            <Field placeholder="Enter new name" value={album.albomDto?.name} onChange={(e: any) => { }} />
                            <Field value={album.albomDto?.description} onChange={(e: any) => { }} placeholder={"Enter new description"} />
                            <div className="mt-auto w-full flex justify-end">
                                <ProfileButton text={"Save"} isSelect onClick={() => { }}></ProfileButton>
                            </div>
                        </div> : null
                }
            </form>
        </div>
    )
}