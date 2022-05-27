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
import { DefaultButton } from "../../../Commons/DefaultButton";

var background1 = require("../../../../Assets/Background1.png");

export const Login: React.FC = () => {
  const { loginByEmailUser, externalLoginlUser } = useActions();

  const nav = useNavigate();

  const load = useTypedSelector((state) => state.userReducer.loading);
  const error = useTypedSelector((state) => state.userReducer.error);
  const [remember, setRemember] = useState(false);

  const initialValues: ILoginByEmailForm = {
    email: "",
    password: "",
  };

  useEffect(() => {

    function start()
    {
        gapi.client.init({
          clientId: "62751843627-3hvrb4vhojmd60im3q708b1usgoob3ka.apps.googleusercontent.com",
          scope: "",
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
      console.error(error);
    }
  };

  const responseGoogle = async (response : any) => {
    var request : IExternalRequest = {
      tokenId: response.tokenId,
      accessToken: response.accessToken,
    }
    await externalLoginlUser(request);
    nav("/profile");
  }

  const responseError = (error : any) => {
    console.log(error);
  }

  return (
    <div className="overflow-x-hidden w-full min-h-screen bg-gradient-to-b from-dark-100 to-dark-200 grid grid-cols-12 items-center relative">
      <div className="absolute w-full overflow-hidden bg-dark-200 h-screen grid grid-cols-12 grid-row-2 items-center">
        <div className="h-1/2 w-full col-span-8 bg-blue-400"></div>
        <div className="h-1/2 w-full col-span-4"></div>
        <div className="h-1/3 w-full col-span-1 bg-yellow-400"></div>
         {/* <img alt="background" src={background1} className="h-1/4 scale-110 bg-cover col-span-8" /> */}
        {/* <img alt="background" src={background1} className="p-2 w-3/4 h-1/4 ml-auto" /> */}
      </div>
      <div className="flex flex-col justify-center items-center py-10 px-20 border-4 rounded-2xl text-white shadow-lg col-span-4 col-start-5 relative">
        {load ?  <div className="absolute bg-black p-2 w-full h-full z-10 flex justify-center items-center opacity-30 transition-all rounded-xl"></div> : null}    
        {load ? <div className="flex flex-col gap-2 animate-spin absolute z-20">
                <div className="flex gap-2">
                  <div className="bg-primary-100 p-3 rounded-md"></div>
                  <div className="bg-primary-100 p-3 rounded-md"></div>
                </div>
                <div className="flex gap-2">
                  <div className="bg-primary-100 p-3 rounded-md"></div>
                  <div className="bg-primary-100 p-3 rounded-md"></div>
                </div>
              </div> : null}
        <h1 className="font-bold text-3xl">Log in</h1>
            <Formik
            initialValues={initialValues}
            validationSchema={emailLoginValidate}
            onSubmit={onHandleSubmit}>
            <Form>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-3 items-center">              
                  <div className="mt-4">
                    <h1 className="text-red-500 font-semibold text-lg">{error}</h1>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <FormikDefaultInput label="email" name="email" type="email" />
                  <FormikDefaultInput
                    label="password"
                    name="password"
                    type="password"
                  />
                </div>
                <DefaultButton text="Login" onClick={() => {console.log("Login")} }/>
                <div className="flex justify-between">
                  <div className="flex gap-1">
                  <input
                    type="checkbox"
                    className="checked:bg-primary-100"
                    defaultChecked={remember}
                    onClick={() => {
                      setRemember(!remember);
                    }}                
                  />
                  <h1>Remember me</h1>
                  </div>
                  <button>Forgot password</button>
                </div>
              </div>
            </Form>
          </Formik>
      </div>
    </div>
  );
};


{/* <div className="flex w-screen h-screen justify-center items-center">
      <Formik
        initialValues={initialValues}
        validationSchema={emailLoginValidate}
        onSubmit={onHandleSubmit}>
        <Form>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              {load ? <h1>Loading</h1> : null}
              <h1>{error}</h1>
            </div>
            <FormikDefaultInput label="email" name="email" type="email" />
            <FormikDefaultInput
              label="password"
              name="password"
              type="password"
            />
            <input
              type="checkbox"
              defaultChecked={remember}
              onClick={() => {
                setRemember(!remember);
              }}
            />
            <button className="btn btn-dark mt-3" type="submit">
              Register
            </button>
            <GoogleLogin
        clientId="62751843627-3hvrb4vhojmd60im3q708b1usgoob3ka.apps.googleusercontent.com"
        onSuccess={responseGoogle}
              onFailure={responseError}
        cookiePolicy={'single_host_origin'}><h1 className="font-bold">Gooogle login</h1></GoogleLogin>
          </div>
        </Form>
      </Formik>
    </div> */}