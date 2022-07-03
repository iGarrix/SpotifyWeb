import React from "react";
import { ErrorMessage, useField } from "formik";
import { FormikTextAreaProps } from "./types";

export const FormikTextArea: React.FC<FormikTextAreaProps> = ({
    label,
    ...props
}) => {
    const [field] = useField(props);
    return (
        <div className="flex flex-col gap-1">
            <div className="h-5">
                <ErrorMessage component="h1" name={field.name} className="error text-red-500 font-medium" />
            </div>
            <textarea
                placeholder={label}
                className={`outline-0 border-0 rounded-xl py-3 px-5 min-h-[400px] text-white bg-dark-200/60 autofill:bg-white`}
                onChange={field.onChange}
                name={field.name}
            />
        </div>
    )
}