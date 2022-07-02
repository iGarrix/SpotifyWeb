import React from "react";
import { Form, Formik } from "formik";
import { useTypedSelector } from "../../../../../Hooks/useTypedSelector";
import { useNavigate } from "react-router-dom";
import { DefaultButton } from "../../../../Commons/Buttons/DefaultButton";
import { FormikDefaultInput } from "../../../../Commons/Inputs/FormikDefaultInput";
import { DeviceType, StorageVariables } from "../../../../../types";
import { IForgotNewPasswordForm, IForgotNewPasswordRequest, newPasswordChangeValidate } from "../../../../../Redux/Reducers/UserReducer/types";
import { useActions } from "../../../../../Hooks/useActions";
import { Helmet } from "react-helmet";
import { FieldSettings } from "../../../../Commons/Inputs/FieldSettings";
import { ProfileButton } from "../../../../Commons/Buttons/ProfileButton";

export const NewPasswordChange: React.FC = () => {
    const {updateRecoveryPasswordUser} = useActions();
    const nav = useNavigate();
    const error = useTypedSelector((state) => state.userReducer.error);

    const initialValues: IForgotNewPasswordForm = {
        newPassword: "",
        confirmPassword: "",
    };

    const onHandleSubmit = async (values: IForgotNewPasswordForm) => {
        try {
            const email = localStorage.getItem(StorageVariables.ForgotUser);
            if(email){
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
        <div className="w-full h-full text-white flex justify-center items-center">
            <Helmet>
                <title>Soundwave | Step 3 - New Password</title>
            </Helmet>
            <Formik
                initialValues={initialValues}
                validationSchema={newPasswordChangeValidate}
                onSubmit={onHandleSubmit}>
                <Form>
                    <div className="flex items-center flex-col gap-6 bg-dark-200/60 rounded-xl py-8 px-20">
                        <h1 className="text-center font-medium text-2xl">Enter new password</h1>
                        {
                            error &&
                            <div className="flex flex-col gap-3 items-center bg-red-500 rounded-xl py-3 px-8">
                                <h1 className="text-white font-semibold text-center">{error}</h1>
                            </div>
                        }
                        <div className="flex flex-col gap-4">
                            <FieldSettings placeholder="newPassword" name="newPassword" type="password" onSumbit={() => {}} />
                            <FieldSettings placeholder="confirmPassword" name="confirmPassword" type="password" onSumbit={() => {}} />
                        </div>
                        <ProfileButton isSelect text="Change password" onClick={() => { }} />
                    </div>
                </Form>
            </Formik>
        </div>
    );
};