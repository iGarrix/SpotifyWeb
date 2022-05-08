import { ErrorMessage, useField } from "formik";
import React from "react";
import { FormikDefaultDropdownProps } from "./types";

export const FormikDefaultDropdown: React.FC<FormikDefaultDropdownProps> = ({
  label,
  options,
  ...props
}) => {
  const [field, meta] = useField(props);

  return (
    <div>
      <select
        className="outline-0 border-2 border-dark-1 rounded-md py-2 px-4"
        {...field}
        {...props}
      >
        <option value="" disabled>
          Select your gender
        </option>
        {options.map((item) => {
          return (
            <option key={item} value={item}>
              {item}
            </option>
          );
        })}
      </select>
      <ErrorMessage component="div" name={field.name} className="error" />
    </div>
  );
};
