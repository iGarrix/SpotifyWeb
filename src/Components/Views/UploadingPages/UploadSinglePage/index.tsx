import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useTypedSelector } from "../../../../Hooks/useTypedSelector";
import { LinearStepper } from "../../../Commons/Steps/LinearStepper";
import { ILinearStepperItem } from "../../../Commons/Steps/LinearStepper/types";

export const UploadSinglePage : React.FC = () => {

    const history = useLocation();
    const reducer = useTypedSelector(state => state.uploadReducer);

    const [steps] = useState<ILinearStepperItem[]>([
        {
            key: 1,
            title: "Uploading"
        },
        {
            key: 2,
            title: "Infromation"
        },
        {
            key: 3,
            title: "Overview"
        },
    ]);

    return (
        <div className="w-full h-full flex flex-col">
            <div className="w-full flex flex-col justify-center pt-[3%] gap-5">
                <LinearStepper isError={reducer.error.length > 0} paddingX={20} selectedIndex={history.pathname === "/upload/single" ? 1 : 
                history.pathname.includes("information") ? 2 : 3
            } stepsItem={steps} />
            <p className="text-center text-red-500 pb-[1%] px-[5%]">{reducer.error}</p>
            </div>
            <Outlet />
        </div>
    )
}