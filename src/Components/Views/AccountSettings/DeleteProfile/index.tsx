import { faClose, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { useActions } from "../../../../Hooks/useActions";
import { useTypedSelector } from "../../../../Hooks/useTypedSelector";
import { DeleteProfileValidate, IDeleteProfileForm, IDeleteProfileRequest } from "../../../../Redux/Reducers/UserReducer/types";
import { ProfileButton } from "../../../Commons/Buttons/ProfileButton";
import { FormikField } from "../../../Commons/Inputs/FieldSettings";
import { FullScreenModal } from "../../../Commons/Modals/FullScreenModal";

export const DeleteProfile: React.FC = () => {
    const user = useTypedSelector((state) => state.userReducer.profile);
    const error = useTypedSelector((state) => state.userReducer.error);
    const { DeleteProfile } = useActions();
    const nav = useNavigate();
    const [openModal, setOpenModal] = useState(false);

    const initialValues: IDeleteProfileForm = {
        password: ""
    };

    const onHandleSubmit = async (values: IDeleteProfileForm) => {
        try {
            const email = user?.email;
            if (email) {
                var request: IDeleteProfileRequest = {
                    findEmail: email,
                    password: values.password,
                };
                await DeleteProfile(request);
                nav("/");
            }
        } catch (error) {
        }
    };

    return (
        <div className="w-full h-full px-[5%] py-[50px] text-white">
            <Helmet>
                <title>Soundwave | Delete Account</title>
            </Helmet>
            <div className="flex justify-start items-center w-full">
                <div className="flex flex-col gap-4 w-auto">
                    <div className="flex">
                        <h1 className="text-3xl font-bold">Delete Profile</h1>
                    </div>
                    <div className="w-auto flex items-center gap-3 bg-dark-200/40 rounded-md px-4 py-2">
                        <h2 className="text-lg">Your profile will be deleted and you will be able to restore it within 30 days</h2>
                        <ProfileButton text="Delete profile" onClick={() => { setOpenModal(true) }} isSelect={true} />
                    </div>
                </div>
            </div>
            <FullScreenModal visible={openModal}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={DeleteProfileValidate}
                    onSubmit={onHandleSubmit}>
                    <Form>
                        <div className="flex w-screen h-full justify-center items-center">
                            <div className="rounded-md py-8 flex flex-col items-center justify-center gap-6">
                                <div className="w-full flex justify-end"><FontAwesomeIcon className="text-white font-medium text-2xl cursor-pointer hover:text-red-500 rounded-sm px-1" icon={faClose} onClick={() => { setOpenModal(false) }} /></div>
                                <h1 className="text-3xl font-medium font-['Lexend']">Delete account</h1>
                                {
                                    error && error.length !== 0 ?
                                        <p className="text-red-500 font-medium text-lg flex gap-3 items-center"><FontAwesomeIcon className="text-xl" icon={faTriangleExclamation} />{error}</p> : null
                                }
                                <div className="flex justify-center items-center flex-col px-20">
                                    <div className="flex flex-col w-full items-center">
                                        <FormikField placeholder="Password" name="password" type="password" onSumbit={() => { }} />
                                    </div>
                                    <div className="flex justify-center w-full mt-7">
                                        <ProfileButton text="Delete" onClick={() => { }} isSelect={true} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Form>
                </Formik>
            </FullScreenModal>
        </div>
    );
};