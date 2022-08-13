import React from "react";
import { Outlet } from "react-router-dom";
import { useTypedSelector } from "../../../Hooks/useTypedSelector";
import { AccountSettingsSideBar } from "../../Commons/AccountSettingsSideBar";
import { Header } from "../../Commons/Header";

export const LayAccountSettings: React.FC = () => {
    const loading = useTypedSelector(state => state);
    return (
        <div className="grid grid-cols-12 mm:flex mm:flex-col sm:flex sm:flex-col w-full">
            {
                loading.notificationReducer.loading || loading.userReducer.loading &&
                <div className="bg-blue-400 animate-pulse w-screen h-1 rounded-b-md fixed top-0 left-0 z-[10000]"></div>
            }
            <div className="col-span-2 2xl:col-span-2 xl:col-span-2 lg:col-span-3 md:col-span-3 w-full h-full mm:h-auto sm:h-auto z-[100]">
                <AccountSettingsSideBar />
            </div>
            <div className={`col-span-10 2xl:col-span-10 xl:col-span-10 lg:col-span-9 md:col-span-9 w-full h-full flex flex-col relative`}>
                <Header />
                <Outlet />
            </div>
        </div>
    )
}