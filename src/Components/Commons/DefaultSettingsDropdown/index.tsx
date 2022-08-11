import React from "react";
import { DefaultSettingsDropdownProps } from "./types";

export const DefaultSettingsDropdown: React.FC<DefaultSettingsDropdownProps> = ({
  value,
  options,
  title,
  onChange
}) => {

  return (
      <div className="flex flex-col gap-1">
        <div className="flex gap-2 flex-wrap">
          <p className="text-dark-200 dark:text-light-200 font-medium">{title}</p>
        </div>
            <div className="bg-light-100 dark:bg-dark-100 pr-2 rounded-xl">
        <select defaultValue={value}
          className="outline-0 w-full pr-20 text-dark-200 dark:text-light-200 flex flex-col bg-light-100 autofill:bg-light-100 dark:bg-dark-100 dark:autofill:dark:bg-dark-100 rounded-xl py-3 px-5"
          onChange={onChange}
        >
          <option value="" disabled className="text-dark-200 dark:text-light-200">
            {title}
          </option>
          {options.map((item) => {
            return (
              <option key={item} value={item} className="text-dark-200 dark:text-light-200">
                {item}
              </option>
            );
          })}
        </select>
            </div>
      </div>
  );
};