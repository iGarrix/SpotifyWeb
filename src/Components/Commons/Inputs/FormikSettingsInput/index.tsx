import React from "react";
import { FormikSettingsInputProps } from "./types";
import { ErrorMessage, useField } from "formik";

export const FormikSettingsInput : React.FC<FormikSettingsInputProps> = ({
    label,
    type,
    ...props
  }) => {
    const [field] = useField(props);
    return (
        <div className="flex flex-col gap-1">
        <div className="h-5">
            <ErrorMessage component="h1" name={field.name} className="error text-red-500 font-medium" />
        </div>
        <input type={type}
            placeholder={label}
            className={`outline-0 border-2 rounded-xl py-3 px-5 text-dark-200 autofill:bg-white`}
            onChange={field.onChange}
            name={field.name}
        />
    </div>
    )
}