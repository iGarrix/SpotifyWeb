import React, { useState } from "react";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { PhoneInputProps } from "./types";

import "./style.scss";

export const DefaultPhoneInput: React.FC<PhoneInputProps> = ({
  label,
  name,
  value,
  error,
  onChange,
}) => {


  const [localError, setError] = useState("");

  const onLocalChange = (e: any) => {
    if (e) {
      if (e.length > 13 || e.length < 13) {
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
    <div className="flex flex-col gap-1">
      <div className="flex gap-2 flex-wrap">
        <p className="text-dark-200 dark:text-light-200 font-medium">{label}</p>
        <h1 className="text-red-500 font-medium">{localError}</h1>
      </div>
      <PhoneInput
        onChange={onLocalChange}
        name={name}
        value={value}
        className="defphone bg-light-100 dark:bg-dark-100 shadow-xl text-dark-200 dark:text-light-200"
        placeholder="Enter phone number" />
    </div>
  )
}