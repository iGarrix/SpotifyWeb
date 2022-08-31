import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useTypedSelector } from "../../../../Hooks/useTypedSelector";
import { LinearStepper } from "../../../Commons/Steps/LinearStepper";
import { ILinearStepperItem } from "../../../Commons/Steps/LinearStepper/types";

export const UploadSinglePage: React.FC = () => {

    const history = useLocation();
    const reducer = useTypedSelector(state => state.uploadReducer);
    const { t } = useTranslation();
    const [steps] = useState<ILinearStepperItem[]>([
        {
            key: 1,
            title: t("Uploading")
        },
        {
            key: 2,
            title: t("Infromation")
        },
        {
            key: 3,
            title: t("Overview")
        },
    ]);

    return (
        <div className="w-full h-full flex flex-col">
            <div className="w-full flex flex-col justify-center pt-[3%] mm:pt-[50px] sm:pt-[50px] md:pt-[50px] lg:pt-[50px] xl:pt-[50px] gap-5">
                <LinearStepper isError={reducer.error.length > 0} paddingX={20} selectedIndex={history.pathname === "/upload/single" ? 1 :
                    history.pathname.includes("information") ? 2 : 3
                } stepsItem={steps} />
                <p className="text-center text-red-500 pb-[1%] px-[5%] h-5">{reducer.error}</p>
            </div>
            <Outlet />
        </div>
    )
}