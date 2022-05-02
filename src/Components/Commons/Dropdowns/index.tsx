import React from "react";
import { FormikDefaultDropdownProps } from "./types";

export const FormikDefaultDropdown: React.FC<FormikDefaultDropdownProps> = ({
  field,
  placeholder,
  options,
  onChange,
  value = "",
  touched = null,
  error = null,
}) => {
  return (
    <div>
      <select
        name={field}
        className="outline-0 border-2 border-dark-1 rounded-md py-2 px-4"
        placeholder={placeholder}
        defaultValue={value}
        onChange={onChange}
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
      <h1>{touched && error ? error : ""}</h1>
      <h1>{touched && error ? true : false}</h1>
    </div>
  );
};
