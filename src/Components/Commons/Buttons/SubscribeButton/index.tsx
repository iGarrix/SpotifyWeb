import React from "react";
import { ISubscribeButton } from "./types";

export const SubscribeButton : React.FC<ISubscribeButton> = ({...props}) => {
    return (
        <button className={` rounded-lg py-3 transition-all hover:shadow-2xl
        text-center flex items-center justify-center px-16 border
        ${props.isSubscribe ? "border-0 bg-gradient-to-br from-blue-500 via-indigo-500 to-primary-100" : "border-light-100"}`}
        onClick={props.onClick}>{props.isSubscribe ? props.subscribedText : props.text}</button>
    )
}