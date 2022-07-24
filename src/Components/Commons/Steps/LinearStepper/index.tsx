import { Guid } from "guid-typescript";
import React from "react";
import { ILinearStepper } from "./types";

const selectStep = require('../../../../Assets/Icons/SelectedStep.png');
const selectStepError = require('../../../../Assets/Icons/SelectedStepError.png');
const nonselectStep = require('../../../../Assets/Icons/NonselectedStep.png');



export const LinearStepper: React.FC<ILinearStepper> = ({ ...props }) => {
    return (
        <div className={`w-full grid grid-flow-col grid-rows-1 px-[${props.paddingX}%]`}>
            {
                props.stepsItem.map(item => {
                    return (
                        <div key={Guid.create().toString()} className="relative flex items-center">
                            <p className={`absolute top-[-150%] flex justify-center w-full font-medium text-lg ${props.selectedIndex === item.key && `${props.isError ? "text-red-500" : "text-primary-100"}`}`}>{item.title}</p>
                            <hr className={`w-full border-[1.5px] ${props.selectedIndex >= item.key ? `${props.isError ? "border-red-500" : "border-blue-500"}` : "border-light-300"}`} />
                            <img alt="step" src={props.selectedIndex === item.key ? props.isError ? selectStepError : selectStep : nonselectStep} />
                            <hr className={`w-full border-[1.5px] ${props.selectedIndex > item.key || props.selectedIndex === props.stepsItem.length ? `${props.isError ? "border-red-500" : "border-blue-500"}` : "border-light-300"}`} />
                        </div>
                    )
                })
            }
        </div>
    )
}