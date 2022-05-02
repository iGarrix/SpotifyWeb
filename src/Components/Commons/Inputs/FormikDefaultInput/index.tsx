import React from "react";
import { FormikDefaultInputProps } from "./types";

export const FormikDefaultInput: React.FC<FormikDefaultInputProps> = ({
  field,
  placeholder,
  onChange,
  value = "",
  touched = null,
  error = null,
  type = "text",
}) => {
  return (
    <div>
      <input
        placeholder={placeholder}
        type={type}
        name={field}
        className="outline-0 border-2 border-dark-1 rounded-md py-2 px-4"
        defaultValue={value}
        onChange={onChange}
      />
      <h1>{touched && error ? error : ""}</h1>
      <h1>{touched && error ? true : false}</h1>
    </div>
  );
};
