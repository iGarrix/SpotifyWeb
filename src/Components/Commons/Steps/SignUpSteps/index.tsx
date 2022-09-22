import { Guid } from "guid-typescript";
import React, { useState } from "react";
import { LinearStepper } from "../LinearStepper";
import { ILinearStepperItem } from "../LinearStepper/types";
import { ISignUpStep, ISignUpSteps } from "./types";

export const SignUpStep: React.FC<ISignUpStep> = ({ title, description, children, ...props }) => {

    const [steps] = useState<ILinearStepperItem[]>([
        {
            key: 1,
            title: "Step 1"
        },
        {
            key: 2,
            title: "Step 2"
        },
        {
            key: 3,
            title: "Step 3"
        },
        {
            key: 4,
            title: "Step 4"
        },
        {
            key: 5,
            title: "Step 5"
        },
    ]);

    return (
        <div className="w-full flex flex-col justify-center items-center gap-8">
            <div className="flex flex-col gap-3 mm:gap-10 sm:gap-10 w-full items-center pt-5">
                <LinearStepper paddingX={10} selectedIndex={props.index} stepsItem={steps} />
                <p className="text-lg  text-center">{description}</p>
            </div>
            <div className="flex flex-col gap-2">
                {children}
            </div>
        </div>
    );
}

export const SignUpSteps: React.FC<ISignUpSteps> = ({ children, selectedIndex }) => {
    return (
        <div>
            {children.filter(f => f.index === selectedIndex).map(item => {
                return (
                    <SignUpStep key={Guid.create().toString()} description={item.description} index={item.index} title={item.title}>
                        {item.children}
                    </SignUpStep>
                )
            })}
        </div>
    );
}