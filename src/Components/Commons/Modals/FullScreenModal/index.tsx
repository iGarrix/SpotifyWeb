import React from "react";
import { IFullScreenModal } from "./types";

export const FullScreenModal: React.FC<IFullScreenModal> = ({ center, children, visible = false }) => {
    return (
        <div className={`${visible ? "fixed top-0 left-0 h-screen w-screen overflow-hidden z-[8001] bg-light-100/80" : "hidden"}`}>
            <div className={`w-full h-full flex ${center ? "justify-center items-center" : ""}`}>
                {children}
            </div>
        </div>
    )
}