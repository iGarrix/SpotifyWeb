import { ErrorMessage, useField } from "formik";
import React from "react";
import { IFieldSettings } from "./types";


export const FieldSettings: React.FC<IFieldSettings> = ({ placeholder, value, type, onSumbit, isOutline, ...props }) => {

    const [field] = useField(props);
    return (
        <div className="flex flex-col gap-1">
            <div className="h-5 flex gap-4">
            <p className="text-white font-medium">{placeholder}</p>
                <ErrorMessage component="h1" name={field.name} className="error text-red-500 font-medium" />
            </div>
            <input placeholder={placeholder} type={type} defaultValue={value} onSubmit={(e: any) => {onSumbit(e)}}     
                onChange={field.onChange}
                name={field.name}
                className={`text-white rounded-lg py-2 px-4 w-auto outline-none border-0 bg-dark-100/60
                shadow-xl ${isOutline ? "border-[1px] border-white" : ""}`} />
            
        </div>
    )
}