import { Form, Formik } from "formik";
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
        birthday: new Date(),
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

  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <Formik
        initialValues={initialValues}
        validationSchema={registerValidate}
        onSubmit={onHandleSubmit}
      >
        <Form>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              {load ? <h1>Loading</h1> : null}
              <h1>{error}</h1>
            </div>
            <FormikDefaultInput label="username" name="username" type="text" />
            <FormikDefaultInput label="email" name="email" type="email" />
            <FormikDefaultInput label="phone" name="phone" type="text" />
            <FormikDefaultInput label="name" name="name" type="text" />
            <FormikDefaultInput label="surname" name="surname" type="text" />
            <FormikDefaultDropdown
              label="gender"
              name="gender"
              options={["Male", "Female", "Other"]}
            />
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
            <button className="btn btn-dark mt-3" type="submit">
              Register
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};
