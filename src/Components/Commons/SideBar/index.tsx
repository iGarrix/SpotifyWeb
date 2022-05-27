import React from "react";
import { useNavigate } from "react-router-dom";
import { SideBarItem } from "./SideBarItem";
const logo = require("../../../Assets/Logo.png");

export const SideBar : React.FC = () => {

    const nav = useNavigate();

    return (
        <div className="overflow-hidden h-screen py-3 px-6 bg-dark-200 flex flex-col gap-12">
            <img alt="avatar" src={logo} className="rounded-xl contrast-125 cursor-pointer transition-all" height={170} width={170} onClick={() => {nav("/")}} />
            <div className="flex flex-col gap-6">
                <SideBarItem text="Home" onClick={() => {console.log("HOme")}} />
                <SideBarItem text="Home" onClick={() => {console.log("HOme")}} />
                <SideBarItem text="Home" onClick={() => {console.log("HOme")}} />
                <SideBarItem text="Home" onClick={() => {console.log("HOme")}} />
            </div>
        </div>
    )
}