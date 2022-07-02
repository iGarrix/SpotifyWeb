import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useActions } from "../../../../../Hooks/useActions";
import { IVerifyCodeByForgotRequest, IVerifyEmailRequest } from "../../../../../Redux/Reducers/UserReducer/types";
import { DeviceType, StorageVariables } from "../../../../../types";
import PinInput from 'react-pin-input';



export const VerifyCodEmail: React.FC = () => {

    const { VerifyCodeForgot, VerifyEmailUser } = useActions();

    const nav = useNavigate();
    const [error, setError] = useState("");

    const onHandleSubmit = async (code : string) => {
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
                            <h2 className="text-center">Please enter the 4 digit code sent to <br /> {localStorage.getItem(StorageVariables.ForgotUser)}</h2>
                        </div>
                        <div className="flex flex-col">
                            {
                                error &&
                                <div className="flex flex-col gap-3 items-center">
                                    <div className="my-4 rounded-xl bg-red-500/60 py-3 px-4">
                                        <h1 className="text-white font-semibold text-lg">{error}</h1>
                                    </div>
                                </div>
                            }
                            <div className="flex flex-col w-full items-center">
                                <PinInput
                                    length={4}
                                    initialValue=""
                                    onChange={(value, index) => { }}
                                    type="numeric"
                                    inputMode="number"
                                    style={{ padding: '5px' }}
                                    inputStyle={{ borderColor: `#434343`, margin: `0px 10px`, backgroundColor: `#434343` , borderWidth: `0.2rem`, borderRadius: '0.5rem', fontSize: `1.6rem`, width: '4rem', height: `4rem`, userSelect: `none` }}
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