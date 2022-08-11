import { ErrorMessage, useField } from "formik";
import React from "react";
import { IFormikField } from "./types";

export const FormikField: React.FC<IFormikField> = ({ placeholder, value, type, onSumbit, isOutline, ...props }) => {

    const [field] = useField(props);
    return (
        <div className="flex flex-col gap-1">
            <div className="flex gap-2 flex-wrap">
                <p className="text-dark-200 dark:text-light-200 font-medium">{placeholder}</p>
                <ErrorMessage component="p" name={field.name} render={(errorMessage: string) => {
                    return <p className="text-red-500 font-medium">{errorMessage}</p>;
                }} />
            </div>
            <input placeholder={placeholder} disabled={props.disable} type={type} defaultValue={value} onSubmit={onSumbit}
                onChange={field.onChange}
                name={field.name}
                className={`text-dark-200 dark:text-light-200 rounded-lg py-2.5 px-4 outline-none border-0 bg-light-200 dark:bg-dark-100
                shadow-xl dark:shadow-none ${isOutline ? "border-[1px] border-dark-200" : ""} ${props.className}`} />
        </div>
    )
}