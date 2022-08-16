import { faClose, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useActions } from "../../../../../Hooks/useActions";
import { useTypedSelector } from "../../../../../Hooks/useTypedSelector";
import { IUpdatePersonalData } from "../../../../../Redux/Reducers/UserReducer/types";
import { DeviceType } from "../../../../../types";
import { Field } from "../../../Inputs/Field";
import { IRenameBioModal } from "./types";

export const RenameBioModal: React.FC<IRenameBioModal> = ({ onSave, onClose }) => {

    const user = useTypedSelector(state => state.userReducer.profile);
    const error = useTypedSelector(state => state.userReducer.error);
    const {updatePDUser} = useActions();
    useEffect(() => {
        if (error && error !== "") {         
            setEnterError(error);
        }
    }, [error]);
    const [enterError, setEnterError] = useState("");
    const onSubmit = async (event: any) => {
        event.preventDefault();
        try {
            if (event.target[0].value.length === 0 && event.target[1].value.length === 0) {
                setEnterError("Field 'Name' 'Surname' is empty")
                return;
            }
            else if (event.target[0].value.length === 0) {
                setEnterError("Field 'Name' is empty")
                return;
            }
            else if (event.target[1].value.length === 0) {
                setEnterError("Field 'Surname' is empty")
                return;
            }
            if (user) {
                const request: IUpdatePersonalData = {
                    findEmail: user.email,
                    newName: event.target[0].value.replace(/\s+/g, ''),
                    newSurname: event.target[1].value.replace(/\s+/g, ''),
                    newBirthday: user.birthday,
                    newGender: user.gender,
                    newCountry: user.country,
                    device: DeviceType.desktop,
                }
                if (request.newName === user.name && request.newSurname === user.surname) {
                    setEnterError("Field 'Name' 'Surname' is don't renamed");
                    return;
                }
                await updatePDUser(request);
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
        <div className="rounded-lg py-8 mm:pt-[10%] flex flex-col items-center gap-3 text-dark-200 bg-light-100 dark:bg-dark-200 dark:text-light-200 shadow-xl px-10 mm:w-full mm:h-full">
            <div className="flex justify-between w-full">
                <h1 className="text-xl font-['Lexend']">Rename</h1>
                <div className="w-full flex justify-end"><FontAwesomeIcon className="text-dark-200 dark:text-light-200 font-medium text-2xl cursor-pointer hover:text-red-500 dark:hover:text-red-500 rounded-sm px-1" icon={faClose} onClick={onCloseSubmit} /></div>
            </div>
            <hr className="w-full mb-4 dark:border-dark-100" />
            {
                enterError && enterError.length !== 0 ?
                    <p className="text-red-500 font-medium text-lg flex gap-3 items-center"><FontAwesomeIcon className="text-xl" icon={faTriangleExclamation} />{enterError}</p> : null
            }
            <form onSubmit={onSubmit} className="mm:h-full">
                {
                    user ?
                    <div className="flex flex-col gap-3 px-20 mm:px-5 mm:h-full">
                        <Field placeholder="Enter new name" value={user?.name} onChange={(e: any) => { }} />
                        <Field placeholder="Enter new surname" value={user?.surname} onChange={(e: any) => { }} />
                        <button type="submit" className="text-center font-medium text-lg hover:text-primary-100 transition-all mt-7 mm:mt-auto">You want to rename pib?</button>
                    </div> : null
                }
            </form>
        </div>
    )
}