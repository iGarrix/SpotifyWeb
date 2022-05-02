import { Form, FormikProvider, useFormik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useActions } from "../../../../Hooks/useActions";
import { useTypedSelector } from "../../../../Hooks/useTypedSelector";
import {
  IRegisterForm,
  IRegisterRequest,
  registerValidate,
} from "../../../../Redux/Reducers/UserReducer/types";
import { DeviceType } from "../../../../types";
import { FormikDefaultDropdown } from "../../../Commons/Dropdowns";
import { FormikDefaultInput } from "../../../Commons/Inputs/FormikDefaultInput";

export const Register: React.FC = () => {
  const { registerUser } = useActions();
  const nav = useNavigate();

  const load = useTypedSelector((state) => state.userReducer.loading);
  const error = useTypedSelector((state) => state.userReducer.error);

  const initialValues: IRegisterForm = {
    username: "",
    email: "",
    phone: 0,
    name: "",
    surname: "",
    gender: "",
    password: "",
    passwordConfirm: "",
  };

  const onHandleSubmit = async (values: IRegisterForm) => {
    try {
      var request: IRegisterRequest = {
        username: values.username,
        email: values.email,
        phone: values.phone,
        name: values.name,
        surname: values.surname,
        gender: values.gender,
        country: "My Country",
        device: DeviceType.desktop,
        password: values.passwordConfirm,
      };
      await registerUser(request);
      nav("/profile");
    } catch (error) {
      console.error(error);
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: registerValidate,
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
              field={"username"}
              placeholder="Enter username"
              error={errors.username}
              touched={touched.username}
              onChange={handleChange}
            />
            <FormikDefaultInput
              type="email"
              field={"email"}
              placeholder="Enter email"
              error={errors.email}
              touched={touched.email}
              onChange={handleChange}
            />
            <FormikDefaultInput
              field={"phone"}
              placeholder="Enter phone"
              error={errors.phone}
              touched={touched.phone}
              onChange={handleChange}
            />
            <FormikDefaultInput
              field={"name"}
              placeholder="Enter name"
              error={errors.name}
              touched={touched.name}
              onChange={handleChange}
            />
            <FormikDefaultInput
              field={"surname"}
              placeholder="Enter surname"
              error={errors.surname}
              touched={touched.surname}
              onChange={handleChange}
            />
            <FormikDefaultDropdown
              field={"gender"}
              placeholder="Enter gender"
              error={errors.gender}
              touched={touched.gender}
              options={["Male", "Female", "Other"]}
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
            <FormikDefaultInput
              type="password"
              field={"passwordConfirm"}
              placeholder="Enter confirm password"
              error={errors.passwordConfirm}
              touched={touched.passwordConfirm}
              onChange={handleChange}
            />
            <button type="submit">Register</button>
          </div>
        </Form>
      </FormikProvider>
    </div>
  );
};
