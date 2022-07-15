import React from "react";
import { Form, Formik } from "formik";
import { useActions } from "../../../../../Hooks/useActions";
import { useNavigate } from "react-router-dom";
import { useTypedSelector } from "../../../../../Hooks/useTypedSelector";
import { emailForgotValidate, IForgotByEmailForm, ISendVerifyCodeByForgotRequest } from "../../../../../Redux/Reducers/UserReducer/types";
import { ProfileButton } from "../../../../Commons/Buttons/ProfileButton";
import { Helmet } from "react-helmet";
import { Field } from "../../../../Commons/Inputs/Field";

export const VerifyEmail: React.FC = () => {
    const { CheckUserByEmail, SendCodeForgot } = useActions();
    const nav = useNavigate();
    const user = useTypedSelector((state) => state.userReducer.profile);
    const error = useTypedSelector((state) => state.userReducer.error);
    const initialValues: IForgotByEmailForm = {
        email: user ? user.email : "",
    };
    const onHandleSubmit = async (values: IForgotByEmailForm) => {
        if (user) {
            try {
                var request: ISendVerifyCodeByForgotRequest = {
                    emailClient: user.email
                };
                await CheckUserByEmail(user.email);
                await SendCodeForgot(request);
                nav("/accountsettings/verifycodeemail");
            } catch (error) {
            }
        }
    };
    return (
        <div className="w-full h-full text-dark-200 flex flex-col py-[50px] px-[150px] gap-10">
            <Helmet>
                <title>Soundwave | Verify Email</title>
            </Helmet>
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold">Verify Email</h1>
                <h2 className="">We will send a code to your mail for verification</h2>
            </div>
                {
                    error &&
                    <div className="flex flex-col gap-3 items-center bg-red-500/80 rounded-xl py-6 px-4">
                        <h1 className="text-light-100 font-semibold text-center">{error}</h1>
                    </div>
                }
            {user?.emailconfirm ? <div className="flex items-center justify-center">
                <h1 className="bg-green-500 text-white rounded-xl py-3 px-10 text-xl">Email Verify</h1></div> : 
                <Formik
                initialValues={initialValues}
                validationSchema={emailForgotValidate}
                onSubmit={onHandleSubmit}>
                <Form>
                    <div className="grid grid-rows-1 grid-cols-3 w-full px-[20%] gap-[20px]">
                        <div className="col-span-2">
                            <Field placeholder="Email" value={user?.email} onChange={() => { }} />
                        </div>
                        <div className="flex items-end col-span-1">
                            <ProfileButton text="Send verify code" onClick={() => { }} isSelect={true} />
                        </div>
                    </div>
                </Form>
            </Formik>}
        </div>
    );
};