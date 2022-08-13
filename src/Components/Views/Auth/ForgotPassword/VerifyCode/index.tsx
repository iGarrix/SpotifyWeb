import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StorageVariables } from "../../../../../types";
import { IVerifyCodeByForgotForm, IVerifyCodeByForgotRequest } from "../../../../../Redux/Reducers/UserReducer/types";
import { useActions } from "../../../../../Hooks/useActions";
import { Helmet } from "react-helmet";
import PinInput from "react-pin-input";

const logo = require('../../../../../Assets/Logo.png');
const background1 = require('../../../../../Assets/Background1.png');
const background2 = require('../../../../../Assets/Background2.png');

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
        <div className="overflow-x-hidden w-full min-h-screen mm:h-full bg-gradient-to-b from-dark-100 to-dark-200 flex justify-center items-center mm:items-start relative">
            <Helmet>
                <title>Soundwave | Step 2 - Verify Code</title>
            </Helmet>
            <div className="fixed w-full h-full overflow-hidden grid grid-cols-15 grid-rows-51 mm:hidden sm:hidden md:hidden lg:hidden xl:grid">
                <div className="w-full h-full rounded-tr-2xl rounded-br-2xl col-[span_10] row-start-[15] row-[span_9/span_30] bg-no-repeat bg-cover" style={{ backgroundImage: `url(${background1})` }}></div>
            </div>
            <div className="fixed w-full h-full overflow-hidden grid grid-cols-15 grid-rows-51 mm:hidden sm:hidden md:hidden lg:hidden xl:grid">
                <div className="col-span-full h-full flex flex-col items-center justify-end pb-[20px] row-[span_10/span_10]">
                    <img alt="logo" className="w-[260px]" src={logo} />
                </div>
                <div className="w-full h-full loginbackground rounded-tl-2xl rounded-bl-2xl col-start-[6] col-[span_10/span_10] row-start-[11] row-[span_9/span_27] bg-no-repeat bg-cover"
                    style={{ backgroundImage: `url(${background2})` }}></div>
            </div>
            <div className="flex flex-col h-full justify-center py-10 border-4 mm:border-0 shadow-xl rounded-2xl text-white w-full relative mx-96 lg:mx-80 md:mx-40 sm:mx-10 mm:mx-0 z-20">
                <div className="absolute w-full h-full rounded-xl p-2 opacity-98 bg-gradient-to-r from-blue-600 to-blue-400"></div>
                <div className="z-10 flex flex-col gap-6 mm:gap-10 mm:h-full mm:justify-between">
                    <div className="w-full mm:h-full flex flex-col justify-center items-center gap-8 mm:gap-10">
                    <div className="w-full flex justify-center mm:flex sm:hidden">
                        <img alt="logo" className="w-[200px]" src={logo} />
                    </div>
                        <div className="flex flex-col gap-3 w-full items-center">
                            <h1 className="text-3xl font-['Lexend'] text-center">Check your email</h1>
                            <p className="text-lg font-['Lexend'] text-center">We sent a 4-digit code to {localStorage.getItem(StorageVariables.ForgotUser)}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                                    {
                                        error &&
                                        <div className="flex flex-col gap-3 items-center bg-red-500 rounded-xl py-3 px-8">
                                            <h1 className="text-white font-semibold text-center">{error}</h1>
                                        </div>
                                    }
                            <div className="flex items-center flex-col gap-3 rounded-xl py-8 px-20 mm:px-2">
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
                    </div>
                </div>
            </div>
        </div>
    );
};