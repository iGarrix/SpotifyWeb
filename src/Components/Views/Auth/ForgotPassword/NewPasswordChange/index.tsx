import React from "react";
import { Form, Formik } from "formik";
import { useTypedSelector } from "../../../../../Hooks/useTypedSelector";
import { useNavigate } from "react-router-dom";
import { DeviceType, StorageVariables } from "../../../../../types";
import { IForgotNewPasswordForm, IForgotNewPasswordRequest, newPasswordChangeValidate } from "../../../../../Redux/Reducers/UserReducer/types";
import { useActions } from "../../../../../Hooks/useActions";
import { Helmet } from "react-helmet";
import { FormikField } from "../../../../Commons/Inputs/FormikField";
import { ProfileButton } from "../../../../Commons/Buttons/ProfileButton";
import { DefaultButton } from "../../../../Commons/Buttons/DefaultButton";

const logo = require('../../../../../Assets/Logo.png');
const background1 = require('../../../../../Assets/Background1.png');
const background2 = require('../../../../../Assets/Background2.png');

export const NewPasswordChange: React.FC = () => {
    const { updateRecoveryPasswordUser } = useActions();
    const nav = useNavigate();
    const error = useTypedSelector((state) => state.userReducer.error);
    const initialValues: IForgotNewPasswordForm = {
        newPassword: "",
        confirmPassword: "",
    };
    const onHandleSubmit = async (values: IForgotNewPasswordForm) => {
        try {
            const email = localStorage.getItem(StorageVariables.ForgotUser);
            if (email) {
                var request: IForgotNewPasswordRequest = {
                    findEmail: email,
                    newPassword: values.newPassword,
                    device: DeviceType.desktop,
                };
                await updateRecoveryPasswordUser(request);
                localStorage.removeItem(StorageVariables.ForgotUser);
                localStorage.removeItem(StorageVariables.VerifyResponse);
                nav("/authorizate");
            }
        } catch (error) {
        }
    };
    return (
        <div className="overflow-x-hidden w-full min-h-screen bg-gradient-to-b from-dark-100 to-dark-200 flex justify-center items-center relative">
            <Helmet>
                <title>Soundwave | Step 3 - New Password</title>
            </Helmet>
            <div className="fixed w-full h-full overflow-hidden grid grid-cols-15 grid-rows-51">
                <div className="w-full h-full rounded-tr-2xl rounded-br-2xl col-[span_10] row-start-[15] row-[span_9/span_30] bg-no-repeat bg-cover" style={{ backgroundImage: `url(${background1})` }}></div>
            </div>
            <div className="fixed w-full h-full overflow-hidden grid grid-cols-15 grid-rows-51">
                <div className="col-span-full h-full flex flex-col items-center justify-end pb-[20px] row-[span_10/span_10]">
                    <img alt="logo" className="w-[260px]" src={logo} />
                </div>
                <div className="w-full h-full loginbackground rounded-tl-2xl rounded-bl-2xl col-start-[6] col-[span_10/span_10] row-start-[11] row-[span_9/span_27] bg-no-repeat bg-cover"
                    style={{ backgroundImage: `url(${background2})` }}></div>
            </div>
            <div className="flex flex-col h-full justify-center py-10 border-4 shadow-xl rounded-2xl text-white w-full relative mx-96 z-20">
                <div className="absolute w-full h-full rounded-xl p-2 opacity-98 bg-gradient-to-r from-blue-600 to-blue-400"></div>
                <div className="z-10 flex flex-col gap-6">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={newPasswordChangeValidate}
                        onSubmit={onHandleSubmit}>
                        <div className="flex flex-col gap-6">
                            <Form>
                                <div className="w-full flex flex-col justify-center items-center gap-8">
                                    <div className="flex flex-col gap-3 w-full items-center">
                                        <h1 className="text-3xl font-['Lexend']">Change password</h1>
                                        {
                                            error &&
                                            <div className="flex flex-col gap-3 items-center bg-red-500 rounded-xl py-3 px-8">
                                                <h1 className="text-white font-semibold text-center">{error}</h1>
                                            </div>
                                        }
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        <FormikField placeholder="New password" name="newPassword" type="password" onSumbit={() => { }} />
                                        <FormikField placeholder="Confirm password" name="confirmPassword" type="password" onSumbit={() => { }} />
                                    </div>
                                    <div className="flex items-center justify-end w-full py-2 px-20">
                                        <DefaultButton text="Confirm" onClick={() => { }} />
                                    </div>
                                </div>
                                {/* <div className="flex items-center flex-col gap-6 bg-light-100 shadow-xl rounded-xl py-8 px-20">
                                <h1 className="text-center font-medium text-2xl">Enter new password</h1>
                                {
                                    error &&
                                    <div className="flex flex-col gap-3 items-center bg-red-500 rounded-xl py-3 px-8">
                                        <h1 className="text-white font-semibold text-center">{error}</h1>
                                    </div>
                                }
                                <div className="flex flex-col gap-4">
                                    <FormikField placeholder="New password" name="newPassword" type="password" onSumbit={() => { }} />
                                    <FormikField placeholder="Confirm password" name="confirmPassword" type="password" onSumbit={() => { }} />
                                </div>
                                <ProfileButton isSelect text="Change password" onClick={() => { }} />
                            </div> */}
                            </Form>
                        </div>
                    </Formik>
                </div>
            </div>
        </div>
    );
};