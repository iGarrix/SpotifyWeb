import { ErrorMessage, useField } from "formik";
import React, { useEffect, useState } from "react";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

export type PhoneInputProps = {
    name: string;
    label: string;
    value: string,
    error: string,
    onChange: (e: any) => void,
  };
  

export const DefaultPhoneInput : React.FC<PhoneInputProps> = ({
    label,
    name,
    value,
    error,
    onChange,
  }) => {


    const [localError, setError] = useState("");

    const onLocalChange = (e : any) => {
      if (e) {
        if (e.length > 13) {
          setError("Invalid phone number");
        }
        else {
          onChange(e);
          if (localError.length !== 0) {
            setError("");
          }
        }
      }
      else {
        setError(error);
      }
    }
    
    return (
    <div className="flex flex-col gap-2">
      <div className="h-5">
        <h1 className="text-black font-medium">{localError}</h1>
      </div> 
      <PhoneInput                         
        onChange={onLocalChange}
        name={name}
        value={value}    
        className="text-black font-medium font-['Inter'] bg-white outline-0 py-3 px-5 rounded-xl focus:outline-0"
        placeholder="Enter phone number"/>
    </div>
    )
}