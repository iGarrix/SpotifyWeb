import { ErrorMessage, useField } from "formik";
import React from "react";
import { SettingsDropdownFormikProps } from "./types";

export const SettingsDropdownFormik: React.FC<SettingsDropdownFormikProps> = ({
  value,
  options,
  title,
  ...props
}) => {
  const [field] = useField(props);

  return (
    <div className="flex flex-col gap-2">
      <div className="h-5 flex gap-4">
        <p className="text-dark-200 dark:text-light-200 font-medium">{title}</p>
        <ErrorMessage component="h1" name={field.name} className="error text-red-500 font-medium" />
      </div>
      <select defaultValue={value}
        className="outline-0 rounded-xl py-3 px-5 pr-20 w-full text-dark-200 dark:text-light-200 bg-light-200 dark:bg-dark-100
        border-0 autofill:bg-light-100 shadow-xl dark:shadow-none"
        onChange={field.onChange}
        name={field.name}
      >
        <option value="" disabled className="text-dark-200 dark:text-light-200">
          {title}
        </option>
        {options.map((item) => {
          return (
            <option key={item} value={item} className="text-dark-200 dark:text-light-200">
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
};
