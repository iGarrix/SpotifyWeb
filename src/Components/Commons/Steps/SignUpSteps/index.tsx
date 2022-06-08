import { Guid } from "guid-typescript";
import React from "react";

export interface ISignUpSteps {
    children: ISignUpStep[],
    selectedIndex: number,
}

export interface ISignUpStep {
    title: string,
    description: string,
    index: number,
    children: any,
}

export const SignUpStep : React.FC<ISignUpStep> = ({title, description, children}) => {
    return (
        <div className="w-full flex flex-col justify-center items-center gap-8">
            <div className="flex flex-col gap-3 w-full items-center">
                <h1 className="text-3xl font-['Lexend']">{title}</h1>
                <p className="text-lg font-['Lexend']">{description}</p>
            </div>
            <div className="flex flex-col gap-2">
                {children}
            </div>
        </div>
    );
}

export const SignUpSteps : React.FC<ISignUpSteps> = ({children, selectedIndex}) => {
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