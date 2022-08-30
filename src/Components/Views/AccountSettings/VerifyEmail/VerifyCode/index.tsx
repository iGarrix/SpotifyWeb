import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useActions } from "../../../../../Hooks/useActions";
import { IVerifyCodeByForgotRequest, IVerifyEmailRequest } from "../../../../../Redux/Reducers/UserReducer/types";
import { DeviceType, StorageVariables } from "../../../../../types";
import PinInput from 'react-pin-input';
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

export const VerifyCodEmail: React.FC = () => {
    const { VerifyCodeForgot, VerifyEmailUser } = useActions();
    const nav = useNavigate();
    const { t } = useTranslation();
    const [error, setError] = useState("");
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
                    var requests: IVerifyEmailRequest = {
                        findEmail: email,
                        verify: true,
                        device: DeviceType.desktop,
                    };
                    await VerifyEmailUser(requests);
                    nav("/accountsettings/verifyemail");
                }
                else {
                    setError("Code not valid");
                }
            }
        } catch (error) {
        }
    };
    return (
        <div className="w-full h-full text-dark-200 dark:text-light-200">
            <Helmet>
                <title>Soundwave | Enter Code</title>
            </Helmet>
            <div className="grid grid-cols-5 h-full">       
                <div className="flex justify-end mm:justify-center sm:justify-center md:justify-center items-center w-full col-span-3 mm:col-span-full sm:col-span-full md:col-span-full">
                    <div className="flex flex-col gap-4 w-full mm:py-[20%] sm:py-[20%]">
                        <div className="flex justify-center">
                            <h1 className="text-3xl mm:text-2xl font-bold">{t("Verify Email")}</h1>
                        </div>
                        <div className="flex justify-center">
                            <h2 className="text-center">{t("Please enter the 4 digit code sent to")} <br /> {localStorage.getItem(StorageVariables.ForgotUser)}</h2>
                        </div>
                        <div className="flex flex-col">
                            {
                                error &&
                                <div className="flex flex-col gap-3 items-center">
                                    <div className="my-4 rounded-xl bg-red-500/80 py-3 px-4">
                                        <h1 className="text-light-100 font-semibold">{error}</h1>
                                    </div>
                                </div>
                            }
                            <div className="flex flex-col items-center dark:text-dark-200">
                                {
                                    1 === 1 ?
                                    <PinInput
                                        length={4}
                                        initialValue=""
                                        onChange={(value, index) => { }}
                                        type="numeric"
                                        inputMode="number"
                                        style={{ padding: '5px' }}
                                        inputStyle={{ borderColor: `#e6e6e6`, margin: `0px 10px`, backgroundColor: `#e6e6e6`, borderWidth: `0.2rem`, borderRadius: '0.5rem', fontSize: `1.6rem`, width: '4rem', height: `4rem`, userSelect: `none` }}
                                        onComplete={async (value, index) => { await onHandleSubmit(value) }}
                                        autoSelect={true}
    
                                        regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
                                    />
                                    :
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
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex col-span-2 justify-start items-center mm:hidden sm:hidden md:hidden lg:flex xl:flex 2xl:flex">
                    <div className="flex flex-col">
                        <img alt="verifyImage" className="scale-[1] lg:scale-[0.7]" src={require("../../../../../Assets/Envelope.png")} />
                    </div>
                </div>
            </div>
        </div>
    );
};