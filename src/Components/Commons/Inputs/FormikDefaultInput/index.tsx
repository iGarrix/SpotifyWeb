import { ErrorMessage, useField } from "formik";
import React from "react";
import { FormikDefaultInputProps } from "./types";

export const FormikDefaultInput: React.FC<FormikDefaultInputProps> = ({
  label,
  ...props
}) => {
  const [field, meta] = useField(props);
  return (
    <div className="flex flex-col gap-2">
      <ErrorMessage component="h1" name={field.name} className="error text-red-600 font-medium  " />
      <input
        placeholder={label}
        className={`outline-0 border-2 rounded-xl py-3 px-5 text-dark-200 autofill:bg-white`}
        {...field}
        {...props}
      />
    </div>
  );
};
