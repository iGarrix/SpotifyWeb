import { ErrorMessage, useField } from "formik";
import React from "react";
import { FormikDefaultDropdownProps } from "./types";

export const FormikDefaultDropdown: React.FC<FormikDefaultDropdownProps> = ({
  label,
  options,
  title,
  ...props
}) => {
  const [field] = useField(props);

  return (
    <div className="flex flex-col gap-2">
      <div className="h-5">
        <ErrorMessage component="h1" name={field.name} className="error text-black font-medium" />
      </div>
      <select
        className="outline-0 border-4 rounded-xl py-3 px-5 pr-20 w-full text-black autofill:bg-white"
        {...field}
        {...props}
      >
        <option value="" disabled className="text-black">
          {title}
        </option>
        {options.map((item) => {
          return (
            <option key={item} value={item} className="text-black">
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
};
