import { ErrorMessage, useField } from "formik";
import React from "react";
import { IDateDropdown } from "./types";

export const DateDropdown: React.FC<IDateDropdown> = ({
    value,
    title,
    ...props
}) => {
    const [field] = useField(props);

    return (
        <div className="flex flex-col gap-1">
            <div className="flex gap-2 flex-wrap">
                <p className="text-dark-200 dark:text-light-200 font-medium">{title}</p>
                <ErrorMessage component="p" name={field.name} render={(errorMessage: string) => {
                    return <p className="text-red-500 font-medium">{errorMessage}</p>;
                }} />
            </div>
            <input type={"date"} defaultValue={value} 
            className="outline-0 rounded-md py-3 px-5 pr-20 w-full text-dark-200 dark:text-light-100 bg-light-200 dark:bg-dark-100"
            onChange={field.onChange}
            name={field.name}/>        
        </div>
    );
};
