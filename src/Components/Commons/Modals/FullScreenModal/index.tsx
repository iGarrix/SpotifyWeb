import React from "react";

export interface IFullScreenModal {
    visible?: boolean,
    center?: boolean,
    children: any,
}

export const FullScreenModal : React.FC<IFullScreenModal> = ({center, children, visible = false}) => {
    return (
        <div className={`${visible ? "fixed top-0 left-0 h-screen w-screen overflow-x-hidden bg-black/70" : "hidden"}`} style={{zIndex: '400'}}>
            <div className={`w-full h-full flex ${center ? "justify-center items-center" : ""}`}>
                {children}
            </div>
        </div>
    )
}