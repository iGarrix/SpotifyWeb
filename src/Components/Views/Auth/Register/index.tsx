import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faArrowCircleRight, faArrowLeft, faArrowRight, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import GoogleLogin from "react-google-login";
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
import { FormikDefaultInput } from "../../../Commons/Inputs/FormikDefaultInput";
import { DefaultPhoneInput } from "../../../Commons/Inputs/PhoneInput";
import { SignUpSteps } from "../../../Commons/Steps/SignUpSteps";

const logo = require('../../../../Assets/Logo.png');
const background1 = require('../../../../Assets/Background1.png');
const background2 = require('../../../../Assets/Background2.png');

export const Register: React.FC = () => {
  const { registerUser, externalLoginlUser } = useActions();
  const nav = useNavigate();

  const load = useTypedSelector((state) => state.userReducer.loading);
  const error = useTypedSelector((state) => state.userReducer.error);
  const phone : any = localStorage.getItem("tempphone");

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
    gender: "",
    password: "",
    passwordConfirm: "",
    country: "",
    age: ""
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
        birthday: new Date(new Date().getFullYear() - Number.parseInt(values.age), new Date().getMonth(), new Date().getDay()),
        gender: values.gender,
        country: values.country,
        device: DeviceType.desktop,
        password: values.passwordConfirm,
      };
      await registerUser(request);
      localStorage.removeItem("tempphone");
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
  }

  return (
    <div className="overflow-x-hidden w-full min-h-screen bg-gradient-to-b from-dark-100 to-dark-200 flex justify-center items-center relative">
      <div className="fixed w-full h-full overflow-hidden grid grid-cols-15 grid-rows-51">     
        <div className="w-full h-full rounded-tr-2xl rounded-br-2xl col-[span_10] row-start-[15] row-[span_9/span_30] bg-no-repeat bg-cover" style={{backgroundImage: `url(${background1})`}}></div>
      </div>
      <div className="fixed w-full h-full overflow-hidden grid grid-cols-15 grid-rows-51">
        <div className="col-span-full h-full flex items-center justify-center row-[span_10/span_10]">
          <img alt="logo" src={logo} width={400} height={400} />
        </div>
        <div className="w-full h-full loginbackground rounded-tl-2xl rounded-bl-2xl col-start-[6] col-[span_10/span_10] row-start-[11] row-[span_9/span_27] bg-no-repeat bg-cover"
        style={{backgroundImage: `url(${background2})`}}></div>
        </div>
        <div className="flex flex-col justify-center py-10 border-4 shadow-xl rounded-2xl text-white w-full relative mx-96 z-20">
          <div className="absolute w-full h-full rounded-xl p-2 opacity-98 bg-gradient-to-r from-blue-600 to-blue-400"></div>
          <div className="z-10 flex flex-col gap-6">
            {
              localError !== "" ?
                <div className="flex flex-col gap-3 items-center">
                  <div className="text-black text-xl flex items-center gap-2">
                    <FontAwesomeIcon icon={faTriangleExclamation} />
                    <h1 className="font-semibold">{localError}</h1>
                  </div>
                </div> : null
            }
            <Formik
              initialValues={initialValues}
              validationSchema={registerValidate}
              onSubmit={onHandleSubmit}>
              <Form>
                <div className="flex flex-col gap-6">
                  <SignUpSteps selectedIndex={step} children={[
                      {
                        title: "Step 1",
                        description: "Enter email and nickname",
                        index: 1,
                        children: <>
                          <FormikDefaultInput label="email" name="email" type="email" />
                          <DefaultPhoneInput label="phone" name="phone" value={phone} onChange={(e: any) => { localStorage.setItem("tempphone", e) } } error={"Phone is required"} />
                        </>
                      },
                      {
                        title: "Step 2",
                        description: "Enter NS and nickname",
                        index: 2,
                        children: <>
                          <FormikDefaultInput label="name" name="name" type="text" />
                          <FormikDefaultInput label="surname" name="surname" type="text" />
                        </>
                      },
                      {
                        title: "Step 3",
                        description: "Select your country and gender",
                        index: 3,
                        children: <>
                          <FormikDefaultDropdown
                            title="Select your country"
                            label="country"
                            name="country"
                            options={["Ukraine", "USA", "Other"]}
                          />
                          <FormikDefaultDropdown
                            title="Select your gender"
                            label="gender"
                            name="gender"
                            options={["Male", "Female", "Other"]}
                          />
                        </>
                      },
                      {
                        title: "Step 4",
                        description: "Enter your nickname",
                        index: 4,
                        children: <>
                          <FormikDefaultInput label="username" name="username" type="text" />
                          <FormikDefaultInput label="age" name="age" type="text" />
                        </>
                      },
                      {
                        title: "Step 5",
                        description: "Enter your password and confirm password",
                        index: 5,
                        children: <>
                          <FormikDefaultInput
                            label="password"
                            name="password"
                            type="password"
                          />
                          <FormikDefaultInput
                            label="passwordConfirm"
                            name="passwordConfirm"
                            type="password"
                          />
                        </>
                      },
                    ]} />
                  <div className="flex items-center justify-between w-full py-2 px-40">
                    <button type="button" onClick={onPrevious}>
                      <FontAwesomeIcon className="text-3xl cursor-pointer hover:text-primary-100 transition-all" icon={faArrowLeft} />
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
                          <FontAwesomeIcon className="text-3xl cursor-pointer hover:text-primary-100 transition-all" icon={faArrowRight} />
                        </button>
                        :
                        step > 0 ?
                        <button type="submit"><FontAwesomeIcon className="text-3xl cursor-pointer hover:text-primary-100 transition-all" icon={faArrowCircleRight} /></button> : null
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