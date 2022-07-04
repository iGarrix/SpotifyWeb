import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faArrowCircleRight, faArrowLeft, faArrowRight, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import GoogleLogin from "react-google-login";
import { Helmet } from "react-helmet";
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

const logo = require('../../../../Assets/LogoLight.png');
const background1 = require('../../../../Assets/Background1.png');
const background2 = require('../../../../Assets/Background2.png');

export const Register: React.FC = () => {
  const { registerUser, externalLoginlUser } = useActions();
  const nav = useNavigate();
  const error = useTypedSelector((state) => state.userReducer.error);
  const phone: any = localStorage.getItem("tempphone");
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
  }

  return (
    <div className="overflow-x-hidden w-full min-h-screen bg-light-200 flex justify-center items-center relative">
      <Helmet>
        <title>Soundwave | Register</title>
      </Helmet>
      <div className="fixed w-full h-full overflow-hidden grid grid-cols-15 grid-rows-51">
        <div className="w-full h-full rounded-tr-2xl rounded-br-2xl col-[span_10] row-start-[15] row-[span_9/span_30] bg-no-repeat bg-cover" style={{ backgroundImage: `url(${background1})` }}></div>
      </div>
      <div className="fixed w-full h-full overflow-hidden grid grid-cols-15 grid-rows-51">
        <div className="col-span-full h-full flex flex-col items-center justify-end pb-[20px] row-[span_10/span_10]">
          <img alt="logo" className="w-[260px]" src={logo} />
        </div>
        <div className="w-full h-full loginbackground rounded-tl-2xl rounded-bl-2xl col-start-[6] col-[span_10/span_10] row-start-[11] row-[span_9/span_27] bg-no-repeat bg-cover"
          style={{ backgroundImage: `url(${background2})` }}></div>
      </div>
      <div className="flex flex-col h-full justify-center py-10 border-4 shadow-xl rounded-2xl text-white w-full relative mx-96 z-20">
        <div className="absolute w-full h-full rounded-xl p-2 opacity-98 bg-gradient-to-r from-blue-600 to-blue-400"></div>
        <div className="z-10 flex flex-col gap-6">
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
            <Form>
              <div className="flex flex-col gap-6">
                <SignUpSteps selectedIndex={step} children={[
                  {
                    title: "Step 1",
                    description: "Enter email and phone",
                    index: 1,
                    children: <>
                      <FormikField placeholder="Email" name="email" type="email" />
                      <DefaultPhoneInput label="Phone" name="phone" value={phone} onChange={(e: any) => { localStorage.setItem("tempphone", e) }} error={"Phone is required"} />
                    </>
                  },
                  {
                    title: "Step 2",
                    description: "Enter NS and nickname",
                    index: 2,
                    children: <>
                      <FormikField placeholder="Name" name="name" type="text" />
                      <FormikField placeholder="Surname" name="surname" type="text" />
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
                        value="Ukraine"
                        options={["Ukraine", "USA", "Other"]}
                      />
                      <FormikDefaultDropdown
                        title="Select your gender"
                        label="gender"
                        name="gender"
                        value="Male"
                        options={["Male", "Female", "Other"]}
                      />
                    </>
                  },
                  {
                    title: "Step 4",
                    description: "Enter your nickname",
                    index: 4,
                    children: <>
                      <FormikField placeholder="Username" name="username" type="text" />
                      <div className='grid grid-cols-3 gap-3'>
                        <FormikField placeholder='Day' type="text" name={'date'} />
                        <FormikField placeholder='Month' type="text" name={'month'} />
                        <FormikField placeholder='Years' type="text" name={'years'} />
                      </div>
                      {/* <FormikField placeholder="Age" name="age" type="text" /> */}
                    </>
                  },
                  {
                    title: "Step 5",
                    description: "Enter your password and confirm password",
                    index: 5,
                    children: <>
                      <FormikField
                        placeholder="Password"
                        name="password"
                        type="password"
                      />
                      <FormikField
                        placeholder="Confirm password"
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