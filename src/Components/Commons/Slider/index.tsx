import React from "react";
import { ISlider } from "./types";

import "./style.scss";

export const Slider : React.FC<ISlider> = ({min, max, value, onChange}) => {
    return (
        <input className="slider" type="range" min={min} max={max} value={value} name="slider" onChange={onChange} />
    )
}