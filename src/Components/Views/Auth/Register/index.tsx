import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faArrowLeft, faArrowRight, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import GoogleLogin from "react-google-login";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useActions } from "../../../../Hooks/useActions";
import { useTypedSelector } from "../../../../Hooks/useTypedSelector";
import {
  IExternalRequest,
  IRegisterForm,
  IRegisterRequest,
  registerValidate,
} from "../../../../Redux/Reducers/UserReducer/types";
import { DeviceType } from "../../../../types";
import { FormikDefaultDropdown } from "../../../Commons/Dropdowns";
import { FormikField } from "../../../Commons/Inputs/FormikField";
import { DefaultPhoneInput } from "../../../Commons/Inputs/PhoneInput";
import { SignUpSteps } from "../../../Commons/Steps/SignUpSteps";

const logo = require('../../../../Assets/Logo.png');
const background1 = require('../../../../Assets/Background1.png');
const background2 = require('../../../../Assets/Background2.png');

export const Register: React.FC = () => {
  const { registerUser, externalLoginlUser } = useActions();
  const nav = useNavigate();
  const error = useTypedSelector((state) => state.userReducer.error);
  const phone: any = localStorage.getItem("tempphone");
  const { t } = useTranslation();
  const [localError, setLocalError] = useState("");
  useEffect(() => {
    if (error) {
      setLocalError(error);
    }
  }, [error]);
  const [step, setStep] = useState(1);
  const initialValues: IRegisterForm = {
    username: "",
    email: "",
    phone: "",
    name: "",
    surname: "",
    gender: "Male",
    password: "",
    passwordConfirm: "",
    country: "Ukraine",
    date: "",
    month: "",
    years: ""
  };
  const onHandleSubmit = async (values: IRegisterForm) => {
    try {
      const storagePhone = localStorage.getItem("tempphone")
      if (!storagePhone) {
        return;
      }
      var request: IRegisterRequest = {
        username: values.username,
        email: values.email,
        phone: phone,
        name: values.name,
        surname: values.surname,
        birthday: new Date(Number.parseInt(values.years), Number.parseInt(values.month), Number.parseInt(values.date)),
        gender: values.gender,
        country: values.country,
        device: DeviceType.desktop,
        password: values.passwordConfirm,
      };
      localStorage.removeItem("tempphone");
      await registerUser(request);
      nav("/profile");
    } catch (error) {
      console.error(error);
    }
  };
  const responseGoogle = async (response: any) => {
    var request: IExternalRequest = {
      tokenId: response.tokenId,
      accessToken: response.accessToken,
    }
    await externalLoginlUser(request);
    localStorage.removeItem("tempphone");
    nav("/profile");
  }
  const responseError = (error: any) => {
    console.log(error);
  }
  const onNext = () => {
    if (step < 5) {
      setStep(step + 1);
    }
  }
  const onPrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
    else {
      nav("/authorizate");
    }
  }

  return (
    <div className="overflow-x-hidden w-full min-h-screen mm:h-full bg-gradient-to-b from-dark-200/80 to-dark-200 flex justify-center items-center mm:items-start relative">
      <Helmet>
        <title>Soundwave | Register</title>
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
      <div className="flex flex-col h-full justify-center py-10 border-4 mm:border-0 shadow-xl rounded-2xl text-white w-full relative mx-96 lg:mx-80 md:mx-40 sm:mx-16 mm:mx-0 z-20">
        <div className="absolute w-full h-full object-cover bg-cover rounded-xl mm:rounded-none sm:rounded-xl md:rounded-xl p-2 bg-gradient-to-r from-primary-100 to-sky-400" style={{ backgroundImage: `url(${background1})` }}></div>
        <div className="z-10 flex flex-col gap-6 mm:justify-center mm:h-full sm:h-full">
          {
            localError !== "" ?
              <div className="flex flex-col gap-3 items-center">
                <div className="text-red-500 text-xl flex flex-col justify-center items-center gap-2">
                  <FontAwesomeIcon icon={faTriangleExclamation} />
                  <h1 className="font-semibold">{localError}</h1>
                </div>
              </div> : null
          }
          <Formik
            initialValues={initialValues}
            validationSchema={registerValidate}
            onSubmit={onHandleSubmit}>
            <Form className="mm:h-full sm:h-full">
              <div className="flex flex-col h-full mm:pt-[15%] mm:justify-between gap-6 mm:gap-12 sm:gap-6">
                <div className="w-full flex justify-center mm:flex sm:hidden">
                  <img alt="logo" className="w-[200px]" src={logo} />
                </div>
                <SignUpSteps selectedIndex={step} children={[
                  {
                    title: t("Step 1"),
                    description: t("Enter email and phone"),
                    index: 1,
                    children: <>
                      <FormikField placeholder={t("Email")} name="email" type="email" />
                      <DefaultPhoneInput label={t("Phone")} name="phone" value={phone} onChange={(e: any) => { localStorage.setItem("tempphone", e) }} error={"Phone is required"} />
                    </>
                  },
                  {
                    title: t("Step 2"),
                    description: t("Enter Name and Surname"),
                    index: 2,
                    children: <>
                      <FormikField placeholder={t("Name")} name="name" type="text" />
                      <FormikField placeholder={t("Surname")} name="surname" type="text" />
                    </>
                  },
                  {
                    title: t("Step 3"),
                    description: t("Select your country and gender"),
                    index: 3,
                    children: <>
                      <FormikDefaultDropdown
                        title={t("Select your country")}
                        label={t("country")}
                        name="country"
                        value="Ukraine"
                        options={[t("Ukraine"), t("USA"), t("Other")]}
                      />
                      <FormikDefaultDropdown
                        title={t("Select your gender")}
                        label={t("gender")}
                        name="gender"
                        value="Male"
                        options={[t("Male"), t("Female"), t("Other")]}
                      />
                    </>
                  },
                  {
                    title: t("Step 4"),
                    description: t("Enter your nickname"),
                    index: 4,
                    children: <div className="flex flex-col gap-2 px-10">
                      <FormikField placeholder={t("Username")} name="username" type="text" />
                      <div className='grid grid-cols-3 mm:grid-cols-1 mm:grid-rows-3 sm:grid-cols-1 sm:grid-rows-3 md:grid-cols-1 md:grid-rows-3 lg:grid-cols-1 lg:grid-rows-3 gap-3'>
                        <FormikField placeholder={t('Day')} type="text" name={'date'} />
                        <FormikField placeholder={t('Month')} type="text" name={'month'} />
                        <FormikField placeholder={t('Years')} type="text" name={'years'} />
                      </div>
                    </div>
                  },
                  {
                    title: t("Step 5"),
                    description: t("Enter your password and confirm password"),
                    index: 5,
                    children: <>
                      <FormikField
                        placeholder={t("Password")}
                        name="password"
                        type="password"
                      />
                      <FormikField
                        placeholder={t("Confirm password")}
                        name="passwordConfirm"
                        type="password"
                      />
                    </>
                  },
                ]} />
                <div className="flex items-center justify-between w-full mm:mt-auto sm:mt-auto py-2 px-40 mm:px-8 sm:px-8 md:px-10 lg:px-10">
                  <button type="button" onClick={onPrevious}>
                    <FontAwesomeIcon className="bg-dark-100 rounded-2xl shadow-2xl px-5 py-2 text-3xl cursor-pointer hover:text-primary-100 transition-all" icon={faArrowLeft} />
                  </button>
                  <GoogleLogin
                    clientId="62751843627-3hvrb4vhojmd60im3q708b1usgoob3ka.apps.googleusercontent.com"
                    onSuccess={responseGoogle}
                    onFailure={responseError}
                    theme="dark"
                    render={props => (<button onClick={props.onClick} disabled={props.disabled}><FontAwesomeIcon className="text-3xl" icon={faGoogle} /></button>)}
                    cookiePolicy={'single_host_origin'}></GoogleLogin>
                  {
                    step < 5 ?
                      <button type="button" onClick={onNext}>
                        <FontAwesomeIcon className="bg-dark-100 rounded-2xl shadow-2xl px-5 py-2 text-3xl cursor-pointer hover:text-primary-100 transition-all" icon={faArrowRight} />
                      </button>
                      :
                      step > 0 ?
                        <button type="submit"><FontAwesomeIcon className="bg-dark-100 rounded-2xl shadow-2xl px-5 py-2 text-3xl cursor-pointer hover:text-primary-100 transition-all" icon={faArrowRight} /></button> : null
                  }
                </div>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};