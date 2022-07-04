import { ErrorMessage, useField } from "formik";
import React from "react";
import { FormikDefaultDropdownProps } from "./types";

export const FormikDefaultDropdown: React.FC<FormikDefaultDropdownProps> = ({
  value,
  label,
  options,
  title,
  ...props
}) => {
  const [field] = useField(props);

  return (
    <div className="flex flex-col gap-2">
      <div className="h-5">
        <ErrorMessage component="h1" name={field.name} className="error text-red-500 font-medium" />
      </div>
      <select defaultValue={value}
        className="outline-0 rounded-xl py-3 px-5 pr-20 w-full text-dark-200 bg-light-200"
        onChange={field.onChange}
        name={field.name}
      >
        <option value="" disabled className="text-dark-200">
          {title}
        </option>
        {options.map((item) => {
          return (
            <option key={item} value={item} className="text-dark-200">
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
};
