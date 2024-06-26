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
      <div className="flex gap-2 flex-wrap">
                <p className="text-dark-200 dark:text-light-200 font-medium">{title}</p>
                <ErrorMessage component="p" name={field.name} render={(errorMessage: string) => {
                    return <p className="text-red-500 font-medium">{errorMessage}</p>;
                }} />
            </div>
      <select defaultValue={value}
        className="outline-0 rounded-xl py-3 px-5 pr-20 w-full text-dark-200 bg-light-100 dark:text-light-200 dark:bg-dark-100" 
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
