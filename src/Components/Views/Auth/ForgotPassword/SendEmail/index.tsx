import React from "react";
import { Form, Formik } from "formik";
import { emailForgotValidate, IForgotByEmailForm, ISendVerifyCodeByForgotRequest } from "../../../../../Redux/Reducers/UserReducer/types";
import { useTypedSelector } from "../../../../../Hooks/useTypedSelector";
import { useNavigate } from "react-router-dom";
import { useActions } from "../../../../../Hooks/useActions";
import { Helmet } from "react-helmet";
import { FieldSettings } from "../../../../Commons/Inputs/FieldSettings";
import { ProfileButton } from "../../../../Commons/Buttons/ProfileButton";

export const PasswordSendEmail: React.FC = () => {
    const {CheckUserByEmail, SendCodeForgot} = useActions();
    const nav = useNavigate();
    const error = useTypedSelector((state) => state.userReducer.error);
    const user = useTypedSelector((state) => state.userReducer.profile);

    const initialValues: IForgotByEmailForm = {
        email: "",
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
        <div className="w-full h-full text-white flex justify-center items-center">
            <Helmet>
                <title>Soundwave | Step 1 - Send Code</title>
            </Helmet>
            <Formik
                initialValues={initialValues}
                validationSchema={emailForgotValidate}
                onSubmit={onHandleSubmit}>
                <Form>
                    <div className="flex items-center flex-col gap-6 bg-dark-200/60 rounded-xl py-8 px-20">
                        <h1 className="text-center font-medium text-2xl">Forgot password</h1>
                        {
                            error &&
                            <div className="flex flex-col gap-3 items-center bg-red-500 rounded-xl py-3 px-8">
                                <h1 className="text-white font-semibold text-center">{error}</h1>
                            </div>
                        }
                        <div className="flex flex-col gap-2">
                            <FieldSettings placeholder="Email" name="email" type="email" onSumbit={() => {}} />
                        </div>
                        <ProfileButton isSelect text="Send verify code" onClick={() => { }} />
                    </div>
                </Form>
            </Formik>
        </div>
    );
};