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
    <div className="flex w-screen h-screen justify-center items-center">
      <Formik
        initialValues={initialValues}
        validationSchema={emailLoginValidate}
        onSubmit={onHandleSubmit}
      >
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
    </div>
  );
};
