import React, { Fragment } from "react";
import { IQuadraticLoader } from "./types";

export const QuadraticLoader: React.FC<IQuadraticLoader> = ({ isVisisble, visibleIndex }) => {
    return (
        <Fragment>
            {isVisisble ? <div className={`flex flex-col gap-2 animate-spin ${visibleIndex !== null ? visibleIndex : null}`}>
                <div className="flex gap-2">
                    <div className="bg-white p-3 animate-pulse rounded-full"></div>
                    <div className="bg-primary-100 p-3 animate-pulse rounded-full"></div>
                </div>
                <div className="flex gap-2">
                    <div className="bg-primary-100 p-3 animate-pulse rounded-full"></div>
                    <div className="bg-white p-3 animate-pulse rounded-full"></div>
                </div>
            </div> : null}
        </Fragment>
    )
}