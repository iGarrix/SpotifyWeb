import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useActions } from "../../../../Hooks/useActions";
import { useTypedSelector } from "../../../../Hooks/useTypedSelector";
import { DeleteProfileValidate, IDeleteProfileForm, IDeleteProfileRequest } from "../../../../Redux/Reducers/UserReducer/types";
import { StorageVariables } from "../../../../types";
import { ProfileButton } from "../../../Commons/Buttons/ProfileButton";
import { FormikDefaultInput } from "../../../Commons/Inputs/FormikDefaultInput";
import { FullScreenModal } from "../../../Commons/Modals/FullScreenModal";

export const DeleteProfile: React.FC = () => {
    const user = useTypedSelector((state) => state.userReducer.profile);
    const { DeleteProfile } = useActions();
    const nav = useNavigate();
    const [error, setError] = useState("");
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
                                    <div className="flex justify-center items-center w-screen h-full flex-col">
                                        <div className="flex flex-col gap-3 items-center">
                                            <div className="mt-4">
                                                <h1 className="text-black font-semibold text-lg">{error}</h1>
                                            </div>
                                        </div>
                                        <div className="flex flex-col w-full items-center">
                                            <FormikDefaultInput label="password" name="password" type="password" />
                                        </div>
                                        <div className="flex justify-center w-full mt-7">
                                            <ProfileButton text="submit" onClick={() => {  }} isSelect={true} />
                                        </div>
                                    </div>
                                </Form>
                            </Formik>
                        </FullScreenModal>
        </div>
    );
};