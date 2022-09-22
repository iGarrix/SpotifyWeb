import { faClose, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useActions } from "../../../../Hooks/useActions";
import { useTypedSelector } from "../../../../Hooks/useTypedSelector";
import { DeleteProfileValidate, IDeleteProfileForm, IDeleteProfileRequest } from "../../../../Redux/Reducers/UserReducer/types";
import { ProfileButton } from "../../../Commons/Buttons/ProfileButton";
import { FormikField } from "../../../Commons/Inputs/FormikField";
import { FullScreenModal } from "../../../Commons/Modals/FullScreenModal";

export const DeleteProfile: React.FC = () => {
    const user = useTypedSelector((state) => state.userReducer.profile);
    const error = useTypedSelector((state) => state.userReducer.error);
    const { DeleteProfile } = useActions();
    const nav = useNavigate();
    const { t } = useTranslation();
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
        <div className="w-full h-full px-[5%] py-[50px] text-dark-200 dark:text-light-200">
            <Helmet>
                <title>Soundwave | Delete Account</title>
            </Helmet>
            <div className="flex justify-start items-center w-full">
                <div className="flex flex-col gap-4 w-auto">
                    <div className="flex mm:justify-center sm:text-center">
                        <h1 className="text-3xl mm:text-2xl mm:text-center sm:text-center font-bold">{t("Delete Profile")}</h1>
                    </div>
                    <div className="w-auto flex  mm:flex-col items-center gap-10 bg-light-200 dark:bg-dark-100 rounded-md px-4 py-2">
                        <h2 className="">{t("Your profile will be deleted and you will be able to restore it within 30 days")}</h2>
                        <div className="flex mm:w-full sm:w-full justify-end">
                            <ProfileButton text={t("Delete Profile")} onClick={() => { setOpenModal(true) }} isSelect={true} />
                        </div>
                    </div>
                </div>
            </div>
            <FullScreenModal visible={openModal} center>
                <Formik
                    initialValues={initialValues}
                    validationSchema={DeleteProfileValidate}
                    onSubmit={onHandleSubmit}>
                    <Form className="mm:w-full mm:h-full sm:w-full sm:h-full md:w-full md:h-full">
                        <div className="rounded-md py-8 mm:w-full mm:h-full sm:w-full sm:h-full md:w-full md:h-full
                             flex mm:bg-dark-200/60 sm:bg-dark-200/60 md:bg-dark-200/60 flex-col items-center justify-center gap-6 shadow-xl px-10 border border-light-200 dark:border-dark-100">
                            <div className="w-full flex justify-end"><FontAwesomeIcon className="text-dark-200 dark:text-light-100 font-medium text-2xl cursor-pointer hover:text-red-500 rounded-sm px-1" icon={faClose} onClick={() => { setOpenModal(false) }} /></div>
                            <h1 className="text-3xl font-medium ">{t("Delete account")}</h1>
                            {
                                error && error.length !== 0 ?
                                    <p className="text-red-500 font-medium flex gap-3 items-center"><FontAwesomeIcon className="text-xl" icon={faTriangleExclamation} />{error}</p> : null
                            }
                            <div className="flex justify-center items-center flex-col px-20">
                                <div className="flex flex-col w-full items-center">
                                    <FormikField placeholder={t("Password")} name="password" type="password" onSumbit={() => { }} />
                                </div>
                                <div className="flex justify-center w-full mt-7">
                                    <ProfileButton text={t("Delete")} onClick={() => { }} isSelect={true} />
                                </div>
                            </div>
                        </div>
                    </Form>
                </Formik>
            </FullScreenModal>
        </div>
    );
};