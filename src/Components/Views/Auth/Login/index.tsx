import { Form, FormikHelpers, FormikProvider, useFormik } from "formik";
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

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: emailLoginValidate,
    onSubmit: onHandleSubmit,
  });

  const { errors, touched, handleChange, handleSubmit } = formik;

  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <FormikProvider value={formik}>
        <Form onSubmit={handleSubmit}>
          <div className="flex flex-col justify-center items-center gap-2">
            {load ? <h1>Loading</h1> : null}
            <h1>{error}</h1>
            <FormikDefaultInput
              type="email"
              field={"email"}
              placeholder="Enter email"
              error={errors.email}
              touched={touched.email}
              onChange={handleChange}
            />
            <FormikDefaultInput
              type="password"
              field={"password"}
              placeholder="Enter password"
              error={errors.password}
              touched={touched.password}
              onChange={handleChange}
            />
            <input
              type="checkbox"
              defaultChecked={remember}
              onClick={() => {
                setRemember(!remember);
              }}
            />
            <button type="submit">Login</button>
          </div>
        </Form>
      </FormikProvider>
    </div>
  );
};
