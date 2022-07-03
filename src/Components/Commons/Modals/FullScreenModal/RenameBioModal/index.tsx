import { faClose, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useActions } from "../../../../../Hooks/useActions";
import { useTypedSelector } from "../../../../../Hooks/useTypedSelector";
import { IUpdatePersonalData } from "../../../../../Redux/Reducers/UserReducer/types";
import { DeviceType } from "../../../../../types";
import { Field } from "../../../Inputs/Field";
import { QuadraticLoader } from "../../../Loaders/QuadraticLoader"

export interface IRenameBioModal {
    onSave: () => void,
    onClose: () => void,
}

export const RenameBioModal: React.FC<IRenameBioModal> = ({ onSave, onClose }) => {

    const user = useTypedSelector(state => state.userReducer.profile);
    const error = useTypedSelector(state => state.userReducer.error);
    const loading = useTypedSelector(state => state.userReducer.loading);

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
        <div className="rounded-md py-8 px-20 flex flex-col items-center gap-6">
            <div className="w-full flex justify-end"><FontAwesomeIcon className="text-white font-medium text-2xl cursor-pointer hover:text-red-500 rounded-sm px-1" icon={faClose} onClick={onCloseSubmit} /></div>
            <h1 className="text-3xl font-medium font-['Lexend']">Rename</h1>
            {
                enterError && enterError.length !== 0 ?
                    <p className="text-red-500 font-medium text-lg flex gap-3 items-center"><FontAwesomeIcon className="text-xl" icon={faTriangleExclamation} />{enterError}</p> : null
            }
            <form onSubmit={onSubmit}>
                {
                    user ?
                    <div className="flex flex-col gap-3">
                        <Field placeholder="Enter new name" value={user?.name} onChange={(e: any) => { }} />
                        <Field placeholder="Enter new surname" value={user?.surname} onChange={(e: any) => { }} />
                        <button type="submit" className="text-center font-medium text-lg hover:text-primary-100 transition-all mt-7">You want to rename pib?</button>
                    </div> : null
                }
            </form>
        </div>
    )
}