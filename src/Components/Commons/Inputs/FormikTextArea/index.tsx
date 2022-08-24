import React from "react";
import { ErrorMessage, useField } from "formik";
import { FormikTextAreaProps } from "./types";

export const FormikTextArea: React.FC<FormikTextAreaProps> = ({
    label,
    minHeight = 400,
    ...props
}) => {
    const [field] = useField(props);
    return (
        <div className="flex flex-col gap-1">
            <div className="min-h-5 flex gap-2 text-dark-200 dark:text-light-200">
                <h1 className="text-lg font-medium">{label}</h1>
                <ErrorMessage component="h1" name={field.name} className="error text-red-500 font-medium" />
            </div>
            <textarea
                placeholder={label}
                className={`outline-0 border-0 rounded-lg py-3 px-5 min-h-[${minHeight}px] text-dark-200 dark:text-light-200 bg-light-100 dark:bg-dark-100
                 autofill:bg-light-100 dark:autofill:bg-dark-100`}
                onChange={field.onChange}
                name={field.name}
            />
        </div>
    )
}