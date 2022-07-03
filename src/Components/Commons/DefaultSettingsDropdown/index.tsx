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
        className="outline-0 rounded-xl py-3 px-5 pr-20 w-full text-white bg-dark-200/50 autofill:bg-dark-100/60"
        onChange={onChange}
      >
        <option value="" disabled className="text-white">
          {title}
        </option>
        {options.map((item) => {
          return (
            <option key={item} value={item} className="text-white">
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
};
