import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useActions } from "../../../../../Hooks/useActions";
import { IVerifyCodeByForgotForm, IVerifyCodeByForgotRequest, IVerifyPhoneRequest, verifyCodeForgotValidate } from "../../../../../Redux/Reducers/UserReducer/types";
import { DeviceType, StorageVariables } from "../../../../../types";
import { ProfileButton } from "../../../../Commons/Buttons/ProfileButton";
import { FormikDefaultInput } from "../../../../Commons/Inputs/FormikDefaultInput";

export const VerifyCodePhone: React.FC = () => {

    const { VerifyCodeForgot, VerifyPhoneUser } = useActions();

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
                if (result === "true") {
                    var requests: IVerifyPhoneRequest = {
                        findEmail: email,
                        verify: true,
                        device: DeviceType.desktop,
                    };
                    await VerifyPhoneUser(requests);
                    nav("/accountsettings/");
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
                        <img alt="verifyImage" src={require("../../../../../Assets/Device.png")} />
                    </div>
                </div>
                <div className="flex justify-start items-center w-full col-span-3">
                    <div className="flex flex-col gap-4 w-[80%]">
                        <div className="flex justify-center">
                            <h1 className="text-3xl font-bold">Verify Phone</h1>
                        </div>
                        <div className="flex justify-center">
                            <h2>Please enter the 4 digit code sent to <br/> {localStorage.getItem(StorageVariables.ForgotUser)}</h2>
                        </div>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={verifyCodeForgotValidate}
                            onSubmit={onHandleSubmit}>
                            <Form>
                                <div className="flex flex-col">
                                    <div className="flex flex-col gap-3 items-center">
                                        <div className="mt-4">
                                            <h1 className="text-black font-semibold text-lg">{error}</h1>
                                        </div>
                                    </div>
                                    <div className="flex flex-col w-full items-center">
                                        <FormikDefaultInput label="code" name="code" type="text" />
                                    </div>
                                    <div className="flex flex-col w-full items-center mt-4">
                                        <h1>Resent code</h1>
                                    </div>
                                    <div className="flex justify-center w-full mt-7">
                                        <ProfileButton text="submit" onClick={() => { } } isSelect={true} />
                                    </div>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    );
};