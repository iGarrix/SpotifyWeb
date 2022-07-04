import React from "react";
import { DefaultSettingsDropdownProps } from "./types";

export const DefaultSettingsDropdown: React.FC<DefaultSettingsDropdownProps> = ({
  value,
  options,
  title,
  onChange
}) => {

  return (
    <div className="flex flex-col gap-2">
      <select defaultValue={value}
        className="outline-0 rounded-xl py-3 px-5 pr-20 w-full text-dark-200 bg-light-200 autofill:bg-light-100"
        onChange={onChange}
      >
        <option value="" disabled className="text-dark-200">
          {title}
        </option>
        {options.map((item) => {
          return (
            <option key={item} value={item} className="text-dark-200">
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
};
