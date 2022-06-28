import React from "react";
import { Outlet } from "react-router-dom";
import { AccountSettingsSideBar } from "../../Commons/AccountSettingsSideBar";
import { Header } from "../../Commons/Header";

export const LayAccountSettings : React.FC = () => {
    

    return (
        <div className="grid grid-cols-12 w-full nin-h-screen">
        {
            false &&
            <div className="bg-blue-400 animate-pulse w-screen h-1 rounded-b-md fixed top-0 left-0 z-[10000]"></div>
        }
        <div className="col-span-2 w-full h-full z-[100]">
            <AccountSettingsSideBar />
        </div>
        <div className={`col-span-10 w-full h-full flex flex-col`}>
            <Header />
            <Outlet />
        </div>
    </div>
    )
}