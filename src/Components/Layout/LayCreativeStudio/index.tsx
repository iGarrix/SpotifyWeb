import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useTypedSelector } from "../../../Hooks/useTypedSelector";
import { CreativeStudioSideBar } from "../../Commons/CreativeStudioSideBar";
import { PlayingFooter } from "../../Commons/Footers/PlayingFooter";
import { Header } from "../../Commons/Header";

const icon_settings = require('../../../Assets/Icons/Settings.png');

export const LayCreativeStudio: React.FC = () => {
    const loading = useTypedSelector(state => state.userReducer.loading);
    return (
        <div className="grid grid-cols-12 w-full nin-h-screen">
            {
                loading &&
                <div className="bg-blue-400 animate-pulse w-screen h-1 rounded-b-md fixed top-0 left-0 z-[10000]"></div>
            }
            <div className="col-span-2 w-full h-full z-[100]">
                <CreativeStudioSideBar />
            </div>
            <div className={`col-span-10 w-full h-full flex flex-col relative`}>
                <Header />
                <Outlet />
            </div>
        </div>
    )
}