import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import GoogleLogin from "react-google-login";
import { useNavigate } from "react-router-dom";
import { useActions } from "../../../../Hooks/useActions";
import { useTypedSelector } from "../../../../Hooks/useTypedSelector";
import {
  emailLoginValidate,
  IExternalRequest,
  ILoginByEmailForm,
  ILoginByEmailRequest,
} from "../../../../Redux/Reducers/UserReducer/types";
import { DeviceType } from "../../../../types";
import { FormikDefaultInput } from "../../../Commons/Inputs/FormikDefaultInput";

import { gapi } from "gapi-script";
import { DefaultButton } from "../../../Commons/Buttons/DefaultButton";

import "./styles.scss";
import { CustomCheckbox } from "../../../Commons/Checkboxs/CustomCheckbox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

const logo = require('../../../../Assets/Logo.png');
const background1 = require('../../../../Assets/Background1.png');
const background2 = require('../../../../Assets/Background2.png');

export const Login: React.FC = () => {
  const { loginByEmailUser, externalLoginlUser } = useActions();

  const nav = useNavigate();

  const error = useTypedSelector((state) => state.userReducer.error);
  const [remember, setRemember] = useState(false);

  const initialValues: ILoginByEmailForm = {
    email: "",
    password: "",
  };

  useEffect(() => {

    function start() {
      gapi.client.init({
        clientId: "62751843627-3hvrb4vhojmd60im3q708b1usgoob3ka.apps.googleusercontent.com",
        scope: "",
        uxMode: "redirect",
      })
    }
    gapi.load('client:auth2', start);

  }, []);

  const onHandleSubmit = async (values: ILoginByEmailForm) => {
    try {
      var request: ILoginByEmailRequest = {
        email: values.email,
        password: values.password,
        rememberMe: remember,
        device: DeviceType.desktop,
      };
      await loginByEmailUser(request);
      nav("/profile");
    } catch (error) {
      
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

  return (
    <div className="overflow-x-hidden w-full min-h-screen bg-gradient-to-b from-dark-100 to-dark-200 grid grid-cols-12 items-center relative">
      <div className="fixed w-full h-full overflow-hidden grid grid-cols-15 grid-rows-39">
        <div className="col-span-full h-full flex items-center justify-center row-span-6">
          <img alt="logo" src={logo} width={360} height={360} />
        </div>
        <div className="w-full h-full rounded-tr-2xl rounded-br-2xl col-[span_10] row-start-[7] row-[span_9/span_24] bg-no-repeat bg-cover" style={{backgroundImage: `url(${background2})`}}></div>
      </div>
      <div className="fixed w-full h-full overflow-hidden grid grid-cols-15 grid-rows-39">
        <div className="w-full h-full loginbackground rounded-tl-2xl rounded-bl-2xl col-start-[6] col-[span_10/span_10] row-start-[12] row-[span_9/span_24] bg-no-repeat bg-cover"
        style={{backgroundImage: `url(${background1})`}}></div>
      </div>
      <div className="col-span-4 col-start-5 z-10 relative">
        <div className="flex flex-col justify-center py-10 border-4 shadow-xl rounded-2xl text-white col-span-4 col-start-5 relative overflow-hidden">
          <div className="absolute w-[300%] h-[300%] blur-[20px] rounded-xl p-2 opacity-98 bg-no-repeat bg-cover -translate-x-[25%] translate-y-[10%]" style={{backgroundImage: `url(${background1})`}}></div>
          <div className="w-full flex flex-col px-32 z-20">
            <h1 className="font-bold text-3xl z-10 text-center">Log in</h1>
            <div className="z-10 flex flex-col gap-6">
              <Formik
                initialValues={initialValues}
                validationSchema={emailLoginValidate}
                onSubmit={onHandleSubmit}>
                <Form>
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-3 items-center">
                      <div className="mt-4">
                        <h1 className="text-black font-semibold text-lg">{error}</h1>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <FormikDefaultInput label="email" name="email" type="email" />
                      <FormikDefaultInput
                        label="password"
                        name="password"
                        type="password"
                      />
                    </div>
                    <DefaultButton text="Login" onClick={() => {}} />
                  </div>
                </Form>
              </Formik>
              <div className="flex justify-between">
                <CustomCheckbox value={remember} text="Remember me" onCheck={() => { setRemember(!remember) }} />
                <button onClick={() => { console.log("first") }}>Forgot password</button>
              </div>
              <div className="flex justify-center gap-3">
                <div className="flex flex-col gap-5 w-full">
                  <hr className="w-full" />
                  <button onClick={() => { nav("/authorizate/register") }}>Don't have an account</button>
                </div>
              </div>
            </div>
          </div>
          <div className="border-4 absolute bottom-[200%] w-full p-2"></div>
        </div>
        <div className="absolute w-full flex justify-center px-12">
          <div className="border-4 border-t-0 rounded-br-xl rounded-bl-xl w-full py-3 flex justify-center">
          <GoogleLogin
            clientId="62751843627-3hvrb4vhojmd60im3q708b1usgoob3ka.apps.googleusercontent.com"
            onSuccess={responseGoogle}
            onFailure={responseError}
            theme="dark"                   
            render={props => (<button className="flex items-center gap-3 text-lg text-white font-medium" onClick={props.onClick} disabled={props.disabled}><FontAwesomeIcon className="text-white text-3xl" icon={faGoogle}/>Sign in with google</button>)}           
            cookiePolicy={'single_host_origin'}></GoogleLogin>
          </div>
        </div>
      </div>
    </div>
  );
};