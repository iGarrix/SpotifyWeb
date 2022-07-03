import React from "react";
import { ISlider } from "./types";

import "./style.scss";

export const Slider: React.FC<ISlider> = ({ min, max, value, onChange, onKeyPress }) => {
    const EventUpdate = (e: any) => {
        onChange(e);
    }
    return (
        <input className="slider" type="range" min={min} max={max} value={value} name="slider"
            onKeyUp={onKeyPress}
            onChange={EventUpdate} />
    )
}