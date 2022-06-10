import { faMusic } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { DefaultButton } from "../../../Commons/Buttons/DefaultButton";

export const ProfileSingles : React.FC = () => {
    return (
        <div className="w-full h-full flex flex-col justify-center items-center py-8 gap-12">
            <FontAwesomeIcon className="text-7xl font-medium" icon={faMusic}  />
            <div className="flex flex-col items-center gap-8">
                <div className="flex flex-col gap-3 items-center">
                    <h1 className="font-medium text-3xl">Create you first single song</h1>
                    <p className="font-medium text-xl">You can also apply to verify your account as an artist</p>
                </div>
                <div>
                    <DefaultButton onClick={() => { } } text={"Upload you first single song"}/>
                </div>
            </div>
        </div>
    )
}