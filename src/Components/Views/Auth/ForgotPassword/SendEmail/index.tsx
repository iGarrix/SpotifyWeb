import React from "react";
import { Form, Formik } from "formik";
import { emailForgotValidate, IForgotByEmailForm, ISendVerifyCodeByForgotRequest } from "../../../../../Redux/Reducers/UserReducer/types";
import { useTypedSelector } from "../../../../../Hooks/useTypedSelector";
import { useNavigate } from "react-router-dom";
import { DefaultButton } from "../../../../Commons/Buttons/DefaultButton";
import { FormikDefaultInput } from "../../../../Commons/Inputs/FormikDefaultInput";
import { DeviceType } from "../../../../../types";
import { useActions } from "../../../../../Hooks/useActions";

export const PasswordSendEmail: React.FC = () => {
    const {CheckUserByEmail, SendCodeForgot} = useActions();
    const nav = useNavigate();
    const error = useTypedSelector((state) => state.userReducer.error);

    const initialValues: IForgotByEmailForm = {
        email: ""
    };

    const onHandleSubmit = async (values: IForgotByEmailForm) => {
        try {
            var request: ISendVerifyCodeByForgotRequest = {
                emailClient: values.email
            };
            await CheckUserByEmail(values.email);
            await SendCodeForgot(request);
            nav("/authorizate/passwordVerifyCode");
        } catch (error) {
        }
    };

    return (
        <div className="w-full h-full">
            <Formik
                initialValues={initialValues}
                validationSchema={emailForgotValidate}
                onSubmit={onHandleSubmit}>
                <Form>
                    <div className="flex items-center flex-col gap-6">
                        <div className="flex flex-col gap-3 items-center">
                            <div className="mt-4">
                                <h1 className="text-black font-semibold text-lg">{error}</h1>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <FormikDefaultInput label="email" name="email" type="email" />
                        </div>
                        <DefaultButton type="submit" text="Send verify code" onClick={() => { }} />
                    </div>
                </Form>
            </Formik>
        </div>
    );
};