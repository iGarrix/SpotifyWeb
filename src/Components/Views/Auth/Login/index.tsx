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

import "./styles.scss";

const logo = require('../../../../Assets/Logo.png');

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
      <div className="absolute w-full overflow-hidden grid grid-cols-12 grid-row-3 items-center">
        <img alt="logo" src={logo} className="z-10 col-start-6 col-span-4" width={350} height={350} />
        <div className="w-full h-96 loginbackground overflow-hidden col-span-8 rounded-tr-3xl row-start-2"></div>
        <div className="w-full h-80 loginbackground loginbackground2 overflow-hidden col-start-5 rounded-tr-3xl row-start-3 col-span-8"></div>
      </div>
      <div className="flex flex-col justify-center py-16 border-4 shadow-xl rounded-2xl text-white shadow-lg col-span-4 col-start-5 relative">
        <div className="absolute w-full h-full bg-gradient-to-r from-blue-400 to-indigo-400 rounded-xl p-2 opacity-98"></div>
        {load ?  <div className="absolute bg-black p-2 w-full h-full z-20 flex justify-center items-center opacity-30 transition-all rounded-xl"></div> : null}    
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
            <div className="w-full flex flex-col px-32">        
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
                </div>
              </Form>
              </Formik>
              <div className="flex justify-between">
                        <div className="flex gap-1 justify-center items-center">
                          <input
                            type="checkbox"
                            className="checked:bg-primary-100 w-5 h-5 border-0 outline-hidden"
                            defaultChecked={remember}
                            onClick={() => {
                              setRemember(!remember);
                            }}                
                          />
                          <h1>Remember me</h1>
                        </div>
                        <button onClick={() => {console.log("first")}}>Forgot password</button>
              </div>
              <div className="flex justify-center gap-3">
              <div className="flex flex-col gap-4 w-full">
              <hr className="w-full" />
              <GoogleLogin
                  clientId="62751843627-3hvrb4vhojmd60im3q708b1usgoob3ka.apps.googleusercontent.com"
                  onSuccess={responseGoogle}
                  onFailure={responseError}
                  cookiePolicy={'single_host_origin'}><h1 className="font-semibold text-md">Sign in with Google</h1></GoogleLogin>
              </div>
              </div>
              </div>
            </div>
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