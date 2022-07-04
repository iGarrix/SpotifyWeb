import React from "react";
import { Outlet } from "react-router-dom";
import { useTypedSelector } from "../../../Hooks/useTypedSelector";
import { AccountSettingsSideBar } from "../../Commons/AccountSettingsSideBar";
import { Header } from "../../Commons/Header";
import { QuadraticLoader } from "../../Commons/Loaders/QuadraticLoader";

export const LayAccountSettings: React.FC = () => {
    const loading = useTypedSelector(state => state.userReducer.loading);
    return (
        <div className="grid grid-cols-12 w-full nin-h-screen">
            {
                false &&
                <div className="bg-blue-400 animate-pulse w-screen h-1 rounded-b-md fixed top-0 left-0 z-[10000]"></div>
            }
            <div className="col-span-2 w-full h-full z-[100]">
                <AccountSettingsSideBar />
            </div>
            <div className={`col-span-10 w-full h-full flex flex-col relative`}>
                {
                    loading ?
                        <div className="w-full h-full absolute top-0 left-0 bg-light-100 flex justify-center items-center z-[10]" style={{ zIndex: 5000 }}>
                            <QuadraticLoader isVisisble={true} />
                        </div> : null
                }
                <Header />
                <Outlet />
            </div>
        </div>
    )
}