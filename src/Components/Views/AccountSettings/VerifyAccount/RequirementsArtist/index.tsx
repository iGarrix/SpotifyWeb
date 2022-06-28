import React from "react";
import { useTypedSelector } from "../../../../../Hooks/useTypedSelector";
import { fillingUser, monthDiff, VerifyType } from "../../../../../types";

export const RequirementsArtist = () => {

    const user = useTypedSelector(state => state.userReducer.profile);

    return (
        <div className="flex flex-col gap-[15px]">
            <h1 className="font-medium text-lg">Requirements</h1>
            <div className="grid grid-cols-2 w-full bg-dark-200/60">
                <div className="flex justify-center border-b-[1px] border-white">
                    <h1 className="text-xl font-semibold py-3">Filling profile</h1>
                </div>
                <div className="flex justify-center border-b-[1px] border-white">
                    <h1 className="text-xl font-semibold py-3">Visiting</h1>
                </div>
                <div className="flex flex-col pl-[10%] py-[3%]">
                    <div className="py-[3%] flex items-center gap-2">
                        <p className={`text-lg ${user?.verify === VerifyType.verify ? "text-green-500" : "text-red-500"}`}>You need to verify profile</p>
                    </div>
                    <div className="py-[3%] flex items-center gap-2">
                        <p className="text-lg text-red-500">You need to verify phone</p>
                    </div>
                    <div className="py-[3%] flex items-center gap-2">
                        <p className="text-lg text-green-500">You don't have to be blocked account</p>
                    </div>
                    <div className="py-[3%] flex items-center gap-2">
                        <p className={`text-lg ${user?.phone && user.phone.toString().length === 13 ? "text-green-500" : "text-red-500"}`}>You must have a phone number</p>
                    </div>
                    <div className="py-[3%] flex items-center gap-2">
                        <p className={`text-lg ${fillingUser(user) ? "text-green-500" : "text-red-500"}`}>You must have completed the entire profile</p>
                    </div>
                </div>
                <div className="flex flex-col px-[10%] py-[3%]">
                    <div className="py-[3%] flex items-center gap-2">
                        <p className={`text-lg ${monthDiff(new Date(), new Date(user ? user.create: "")) >= 6 ? "text-green-500" : "text-red-500"}`}>You must use the service for more than 6 months</p>
                    </div>
                </div>
            </div>


        </div>
    )
}