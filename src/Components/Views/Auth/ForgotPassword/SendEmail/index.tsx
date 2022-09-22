import React from "react";
import { Form, Formik } from "formik";
import { emailForgotValidate, IForgotByEmailForm, ISendVerifyCodeByForgotRequest } from "../../../../../Redux/Reducers/UserReducer/types";
import { useTypedSelector } from "../../../../../Hooks/useTypedSelector";
import { useNavigate } from "react-router-dom";
import { useActions } from "../../../../../Hooks/useActions";
import { Helmet } from "react-helmet";
import { FormikField } from "../../../../Commons/Inputs/FormikField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { DefaultButton } from "../../../../Commons/Buttons/DefaultButton";
import { useTranslation } from "react-i18next";

const logo = require('../../../../../Assets/Logo.png');
const background1 = require('../../../../../Assets/Background1.png');
const background2 = require('../../../../../Assets/Background2.png');

export const PasswordSendEmail: React.FC = () => {
    const { CheckUserByEmail, SendCodeForgot } = useActions();
    const nav = useNavigate();
    const { t } = useTranslation();
    const error = useTypedSelector((state) => state.userReducer.error);
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
        <div className="overflow-x-hidden w-full min-h-screen mm:h-full bg-gradient-to-b from-dark-100 to-dark-200 flex justify-center items-center mm:items-start relative">
            <Helmet>
                <title>Soundwave | Step 1 - Send Code</title>
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
                <div className="absolute w-full h-full rounded-xl mm:rounded-none sm:rounded-xl md:rounded-xl p-2 opacity-98 bg-gradient-to-r from-blue-600 to-blue-400"></div>
                <div className="z-10 flex flex-col gap-6 mm:gap-10 mm:justify-center mm:h-full sm:h-full mm:mt-[5%]">
                    <div className="w-full flex justify-center mm:flex sm:hidden">
                        <img alt="logo" className="w-[200px]" src={logo} />
                    </div>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={emailForgotValidate}
                        onSubmit={onHandleSubmit}>
                        <div className="flex flex-col gap-6 mm:gap-10 mm:h-full mm:justify-between">
                            <Form className="mm:h-full sm:h-full">
                                <div className="w-full mm:h-full flex flex-col justify-center items-center gap-8">
                                    <div className="flex flex-col gap-3 w-full items-center">
                                        <h1 className="text-3xl  text-center">{t("Forgot password?")}</h1>
                                        <p className="text-lg  text-center">{t("Enter your email address and we’ll send you a link to reset your password")}</p>
                                        {
                                            error &&
                                            <div className="flex flex-col gap-3 items-center bg-red-500 rounded-xl py-3 px-8">
                                                <h1 className="text-white font-semibold text-center">{error}</h1>
                                            </div>
                                        }
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <FormikField placeholder={t("Email")} name="email" type="email" onSumbit={() => { }} />
                                    </div>

                                    <div className="flex items-center justify-between w-full mm:mt-auto sm:mt-auto py-2 px-40 mm:px-16 sm:px-16 md:px-20 lg:px-20">
                                        <button type="button" onClick={() => { nav("/authorizate") }}>
                                            <FontAwesomeIcon className="bg-dark-100 rounded-2xl shadow-2xl px-5 py-2 text-3xl cursor-pointer hover:text-primary-100 transition-all" icon={faArrowLeft} />
                                        </button>
                                        <DefaultButton text={t("Send code")} onClick={() => { }} />
                                    </div>
                                </div>
                            </Form>
                        </div>
                    </Formik>
                </div>
            </div>
        </div>
    );
};