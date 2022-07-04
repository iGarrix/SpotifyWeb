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
        <div className="w-full h-full text-dark-200 flex items-center justify-center">
            <Helmet>
                <title>Soundwave | Verify Email</title>
            </Helmet>
            <div className="flex gap-[190px]">
                <img alt="verifyImage" src={require("../../../../../Assets/Envelope.png")} />
                <div className="flex flex-col justify-center gap-2 w-full">
                    <h1 className="text-3xl font-bold text-center">Verify Email</h1>
                    <h2 className="text-center">We will send a code to your mail for verification</h2>
                    {user?.emailconfirm ? <div className="flex items-center justify-center"><h1 className="bg-green-500 text-white rounded-xl py-3 px-10 text-xl">Email Verify</h1></div> : <Formik
                        initialValues={initialValues}
                        validationSchema={emailForgotValidate}
                        onSubmit={onHandleSubmit}>
                        <Form>
                            <div className="flex flex-col w-full h-full mt-7">
                                {
                                    error &&
                                    <div className="flex flex-col gap-3 items-center">
                                        <div className="my-4 rounded-xl bg-red-500/60 py-3 px-4">
                                            <h1 className="text-white font-semibold text-lg">{error}</h1>
                                        </div>
                                    </div>
                                }
                                <Field placeholder="Email" value={user?.email} onChange={() => { }} />
                                <div className="flex justify-end mt-7">
                                    <ProfileButton text="Send verify code" onClick={() => { }} isSelect={true} />
                                </div>
                            </div>
                        </Form>
                    </Formik>}
                </div>
            </div>

        </div>
    );
};