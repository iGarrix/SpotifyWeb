import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useActions } from "../../../../Hooks/useActions";
import { useTypedSelector } from "../../../../Hooks/useTypedSelector";
import {
  emailLoginValidate,
  ILoginByEmailForm,
  ILoginByEmailRequest,
} from "../../../../Redux/Reducers/UserReducer/types";
import { DeviceType } from "../../../../types";
import { FormikDefaultInput } from "../../../Commons/Inputs/FormikDefaultInput";

export const Login: React.FC = () => {
  const { loginByEmailUser } = useActions();

  const nav = useNavigate();

  const load = useTypedSelector((state) => state.userReducer.loading);
  const error = useTypedSelector((state) => state.userReducer.error);
  const [remember, setRemember] = useState(false);

  const initialValues: ILoginByEmailForm = {
    email: "",
    password: "",
  };

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
          </div>
        </Form>
      </Formik>
    </div>
  );
};
