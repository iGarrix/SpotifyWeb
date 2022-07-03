import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AnalyticsSideBar } from "../../Commons/AnalyticsSideBar";
import { Header } from "../../Commons/Header";
import { SideBarItem } from "../../Commons/SideBar/SideBarItem";

const icon_settings = require('../../../Assets/Icons/Settings.png');

export const LayAnalytics: React.FC = () => {
    const nav = useNavigate();
    return (
        <div className="grid grid-cols-8 w-full nin-h-screen">
            {
                false &&
                <div className="bg-blue-400 animate-pulse w-screen h-1 rounded-b-md fixed top-0 left-0 z-[10000]"></div>
            }
            <div className="col-span-1 w-full h-full z-[100]">
                <AnalyticsSideBar />
            </div>
            <div className={`col-span-7 w-full h-full flex flex-col`}>
                <Header />
                <Outlet />
            </div>
            <div className="fixed bottom-0 w-full grid grid-cols-8 z-[100]">
                <div className={`col-span-1 w-full mb-6`}>
                    <SideBarItem text="Settings" icon={icon_settings} onClick={() => { nav("/settings") }} />
                </div>
            </div>
        </div>
    )
}