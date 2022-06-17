import React from "react";
import { useNavigate } from "react-router-dom";
import { RedirectButton } from "../../Commons/Buttons/RedirectButton";

const logo = require('../../../Assets/Logo.png');
const bg = require('../../../Assets/Background2.png');
const icon_studio = require('../../../Assets/Icons/Studio.png');
const icon_analytics = require('../../../Assets/Icons/Analytics.png');
export const StudioIntro: React.FC = () => {

    const nav = useNavigate();

    const navigate = (path: string) => {
        nav(path, {replace: true});
    }

    return (
        <div className="overflow-hidden w-screen h-screen text-white flex justify-center items-center bg-black relative">
            <div className="absolute top-0 w-screen h-1 rounded-br-lg rounded-bl-lg animate-pulse bg-blue-500 z-[10]"></div>
            <div className="absolute top-0 w-screen h-screen bg-no-repeat bg-cover object-cover opacity-10" style={{backgroundImage: `url('${bg}')`}}></div>
            <div className="flex flex-col items-center gap-4 z-[10]">
                <div className="flex flex-col items-center gap-2 px-10">
                    <img alt="logo" className="scale-110 contrast-200" src={logo} />
                    <h1 className="font-semibold text-2xl font-['Lexend']">Creative Studio</h1>
                </div>
                <div className="w-full flex gap-2 items-center">
                    <hr className="border-white w-full" />
                    <img alt="logo" className="w-[24px] h-[24px]" src={icon_studio} />
                    <hr className="border-white w-full" />
                </div>
                <p className="font-thin text-lg">Full manage your uploaded content & analytics</p>
                <div className="w-full flex flex-col gap-4">
                    <RedirectButton text="Creative Studio" icon={icon_studio} onClick={() => {navigate('creativestudio')}} />
                    <RedirectButton text="Analytics albums & singles" icon={icon_analytics} onClick={() => {navigate('analytics')}} />
                </div>
            </div>
        </div>
    )
}