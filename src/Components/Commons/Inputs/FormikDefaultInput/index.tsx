import { ErrorMessage, useField } from "formik";
import React from "react";
import { FormikDefaultInputProps } from "./types";

export const FormikDefaultInput: React.FC<FormikDefaultInputProps> = ({
  label,
  ...props
}) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <input
        placeholder={label}
        className="outline-0 border-2 border-dark-1 rounded-md py-2 px-4"
        {...field}
        {...props}
      />
      <ErrorMessage component="div" name={field.name} className="error" />
    </div>
  );
};
