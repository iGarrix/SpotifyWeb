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
        <div className="w-full h-full">
            <Helmet>
                <title>Soundwave | Step 3 - New Password</title>
            </Helmet>
            <Formik
                initialValues={initialValues}
                validationSchema={newPasswordChangeValidate}
                onSubmit={onHandleSubmit}>
                <Form>
                    <div className="flex items-center flex-col gap-6">
                        <div className="flex flex-col gap-3 items-center">
                            <div className="mt-4">
                                <h1 className="text-black font-semibold text-lg">{error}</h1>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <FormikDefaultInput label="newPassword" name="newPassword" type="password" />
                            <FormikDefaultInput label="confirmPassword" name="confirmPassword" type="password" />
                        </div>
                        <DefaultButton type="submit" text="Change password" onClick={() => { }} />
                    </div>
                </Form>
            </Formik>
        </div>
    );
};