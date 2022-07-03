import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StorageVariables } from "../../../../../types";
import { IVerifyCodeByForgotForm, IVerifyCodeByForgotRequest } from "../../../../../Redux/Reducers/UserReducer/types";
import { useActions } from "../../../../../Hooks/useActions";
import { Helmet } from "react-helmet";
import PinInput from "react-pin-input";


export const PasswordVerifyCode: React.FC = () => {
    const { VerifyCodeForgot } = useActions();
    const nav = useNavigate();
    const [error, setError] = useState("");
    const initialValues: IVerifyCodeByForgotForm = {
        code: ""
    };
    const onHandleSubmit = async (code: string) => {
        try {
            const email = localStorage.getItem(StorageVariables.ForgotUser);
            if (email) {
                var request: IVerifyCodeByForgotRequest = {
                    email: email,
                    code: Number.parseInt(code),
                };
                await VerifyCodeForgot(request);
                const result = localStorage.getItem(StorageVariables.VerifyResponse);
                if (result === "true") {
                    nav("/authorizate/newPasswordChange");
                }
                else {
                    setError("Code not valid");
                }
            }
        } catch (error) {
        }
    };
    return (
        <div className="w-full h-full flex items-center justify-center text-white">
            <Helmet>
                <title>Soundwave | Step 2 - Verify Code</title>
            </Helmet>
            <div className="flex items-center flex-col gap-3 bg-dark-200/60 rounded-xl py-8 px-20">
                <h1 className="text-center font-medium text-2xl">Verify code</h1>
                {
                    error &&
                    <div className="flex flex-col gap-3 items-center bg-red-500 rounded-xl py-3 px-8">
                        <h1 className="text-white font-semibold text-center">{error}</h1>
                    </div>
                }
                <PinInput
                    length={4}
                    initialValue=""
                    onChange={(value, index) => { }}
                    type="numeric"
                    inputMode="number"
                    style={{ padding: '5px' }}
                    inputStyle={{ borderColor: `#434343`, margin: `0px 10px`, backgroundColor: `#434343`, borderWidth: `0.2rem`, borderRadius: '0.5rem', fontSize: `1.6rem`, width: '4rem', height: `4rem`, userSelect: `none` }}
                    onComplete={async (value, index) => { await onHandleSubmit(value) }}
                    autoSelect={true}

                    regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
                />
            </div>
        </div>
    );
};