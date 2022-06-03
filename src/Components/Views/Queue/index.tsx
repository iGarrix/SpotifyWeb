import React from "react";

export const Queue : React.FC = () => {
    return (
        <div className="w-full px-10 py-5 flex flex-col gap-6">
            <h1 className="select-none text-3xl text-white font-semibold">Selected now</h1>
            <h1 className="select-none text-3xl text-white font-semibold">In Queue</h1>
        </div>
    )
}