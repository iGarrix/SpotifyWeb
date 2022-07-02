import React from "react";
import { Form, Formik } from "formik";
import { useActions } from "../../../../../Hooks/useActions";
import { useNavigate } from "react-router-dom";
import { useTypedSelector } from "../../../../../Hooks/useTypedSelector";
import { emailForgotValidate, IForgotByEmailForm, ISendVerifyCodeByForgotRequest } from "../../../../../Redux/Reducers/UserReducer/types";
import { FormikDefaultInput } from "../../../../Commons/Inputs/FormikDefaultInput";
import { DefaultButton } from "../../../../Commons/Buttons/DefaultButton";
import { ProfileButton } from "../../../../Commons/Buttons/ProfileButton";
import { StorageVariables } from "../../../../../types";


export const VerifyEmail: React.FC = () => {
    const { CheckUserByEmail, SendCodeForgot } = useActions();
    const nav = useNavigate();
    const user = useTypedSelector((state) => state.userReducer.profile);
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
            nav("/accountsettings/verifycodeemail");
        } catch (error) {
        }
    };

    return (
        <div className="w-full h-full pt-[12%] text-white">
            <div className="grid grid-cols-5">
                <div className="flex col-span-2 justify-end items-center">
                    <div className="flex flex-col">
                        <img alt="verifyImage" src={require("../../../../../Assets/Envelope.png")} />
                    </div>
                </div>
                <div className="flex justify-start items-center w-full col-span-3">
                    <div className="flex flex-col gap-4 w-[80%]">
                        <div className="flex justify-center">
                            <h1 className="text-3xl font-bold">Verify Email</h1>
                        </div>
                        <div className="flex justify-center">
                            <h2>We will send a code to your mail for verification</h2>
                        </div>
                        {user?.emailconfirm ? <div className="flex items-center justify-center"><h1>Email Verify</h1></div> : <Formik
                            initialValues={initialValues}
                            validationSchema={emailForgotValidate}
                            onSubmit={onHandleSubmit}>
                            <Form>
                                <div className="flex flex-col">
                                    <div className="flex flex-col gap-3 items-center">
                                        <div className="mt-4">
                                            <h1 className="text-black font-semibold text-lg">{error}</h1>
                                        </div>
                                    </div>
                                    <div className="flex flex-col w-[80%] items-center">
                                        <FormikDefaultInput label="email" name="email" type="email" />
                                    </div>
                                    <div className="flex justify-end w-[80%] mt-7">
                                        <ProfileButton text="Send verify code" onClick={() => { } } isSelect={true} />
                                    </div>
                                </div>
                            </Form>
                        </Formik>}
                        
                    </div>
                </div>
            </div>
        </div>
    );
};