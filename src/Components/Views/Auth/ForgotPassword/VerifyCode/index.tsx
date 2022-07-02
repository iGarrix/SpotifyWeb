import React, { useState } from "react";
import { useTypedSelector } from "../../../../../Hooks/useTypedSelector";
import { useNavigate } from "react-router-dom";
import { DefaultButton } from "../../../../Commons/Buttons/DefaultButton";
import { FormikDefaultInput } from "../../../../Commons/Inputs/FormikDefaultInput";
import { StorageVariables } from "../../../../../types";
import { IVerifyCodeByForgotForm, IVerifyCodeByForgotRequest, verifyCodeForgotValidate } from "../../../../../Redux/Reducers/UserReducer/types";
import { Form, Formik } from "formik";
import { useActions } from "../../../../../Hooks/useActions";
import { Helmet } from "react-helmet";


export const PasswordVerifyCode: React.FC = () => {

    const { VerifyCodeForgot } = useActions();

    const nav = useNavigate();
    const [error, setError] = useState("");

    const initialValues: IVerifyCodeByForgotForm = {
        code: ""
    };

    const onHandleSubmit = async (values: IVerifyCodeByForgotForm) => {
        try {
            const email = localStorage.getItem(StorageVariables.ForgotUser);
            if (email) {
                var request: IVerifyCodeByForgotRequest = {
                    email: email,
                    code: Number.parseInt(values.code),
                };
                await VerifyCodeForgot(request);
                const result = localStorage.getItem(StorageVariables.VerifyResponse);
                if (result === "true"){
                    nav("/authorizate/newPasswordChange");
                }
                else{
                    setError("Code not valid");
                }
            }
        } catch (error) {
        }
    };


    return (
        <div className="w-full h-full">
            <Helmet>
                <title>Soundwave | Step 2 - Verify Code</title>
            </Helmet>
            <Formik
                initialValues={initialValues}
                validationSchema={verifyCodeForgotValidate}
                onSubmit={onHandleSubmit}>
                <Form>
                    <div className="flex items-center flex-col gap-6">
                        <div className="flex flex-col gap-3 items-center">
                            <div className="mt-4">
                                <h1 className="text-black font-semibold text-lg">{error}</h1>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <FormikDefaultInput label="code" name="code" type="text" />
                        </div>
                        <DefaultButton type="submit" text="Verify" onClick={() => { }} />
                    </div>
                </Form>
            </Formik>
        </div>
    );
};