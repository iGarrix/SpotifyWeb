import { faCheck, faCompactDisc, faUser } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useActions } from "../../../../Hooks/useActions";
import { useTypedSelector } from "../../../../Hooks/useTypedSelector";
import { IVerifiedAccountRequest } from "../../../../Redux/Reducers/UserReducer/types";
import { baseUrl, DeviceType, VerifyType } from "../../../../types";
import { ProfileButton } from "../../../Commons/Buttons/ProfileButton";
import { PreviewCardAccount } from "../../../Commons/Cards/PreviewCardAccount";
import { DefaultSettingsDropdown } from "../../../Commons/DefaultSettingsDropdown";

export const VerifyAccount: React.FC = () => {

    const nav = useNavigate();
    const user = useTypedSelector(state => state.userReducer.profile);
    const error = useTypedSelector(state => state.userReducer.error);
    const { verifiedUser } = useActions();
    const [ImageSrc, setImageSrc] = useState("");
    const [BackgroundSrc, setBackgroundSrc] = useState("");
    useEffect(() => {
        if (user != null) {
            setImageSrc(user.avatar.includes("http") ? user.avatar
                : baseUrl + "Images/Users/" + user.avatar);
            if (user.background && user.background.length !== 0) {
                if (user.background.includes("http")) {
                    setBackgroundSrc(user.background);
                }
                else {
                    setBackgroundSrc(baseUrl + "Images/Users/" + user.background);
                }
            }
            else {
                setBackgroundSrc('https://www.rmets.org/sites/default/files/cloud%2520to%2520cloud%2520lightning_0.jpg');
            }
        }
    }, [user]);
    const [currentItem, setCurrentItem] = useState(window.location.pathname);
    const [value, setValue] = useState(VerifyType.artist);
    const onVerifySubmit = async () => {
        try {
            if (value && user) {
                const request: IVerifiedAccountRequest = {
                    findEmail: user.email,
                    status: value,
                    device: DeviceType.desktop
                }
                await verifiedUser(request);
                document.documentElement.scrollTo(0, 0);
            }
        } catch (error) {

        }
    }

    return (
        <>
            {
                user &&
                <div className="flex flex-col h-full py-[50px] px-[150px] text-white">
                    <h1 className="text-3xl font-bold">Verify your account</h1>
                    <div className="flex flex-col mt-[40px] w-full gap-[20px]">
                        <div className="grid grid-cols-3 w-full gap-10">
                            <PreviewCardAccount ImageSrc={ImageSrc} BackgroundSrc={BackgroundSrc} title={"Client profile"}
                                isSelect={currentItem === "/accountsettings/verifyaccount"} nickname={user.username} email={user.email} icon={faUser} onSelect={() => { setCurrentItem("/accountsettings/verifyaccount"); nav(""); }} />
                            <PreviewCardAccount ImageSrc={ImageSrc} BackgroundSrc={BackgroundSrc} title={"Artist & creator"}
                                isSelect={currentItem === "/accountsettings/verifyaccount/artist"} nickname={user.username} email={user.email} icon={faCompactDisc} onSelect={() => { setCurrentItem("/accountsettings/verifyaccount/artist"); nav("artist"); }} />
                            <PreviewCardAccount ImageSrc={ImageSrc} BackgroundSrc={BackgroundSrc} title={"Verified profile"}
                                isSelect={currentItem === "/accountsettings/verifyaccount/verified"} nickname={user.username} email={user.email} icon={faCheck} onSelect={() => { setCurrentItem("/accountsettings/verifyaccount/verified"); nav("verified"); }} />
                        </div>
                    </div>
                    <div className="flex flex-col w-full gap-[40px] mt-[50px]">
                        {
                            error &&
                            <div className="flex flex-col py-5 items-center justify-center bg-red-500/60 rounded-xl">
                                <h1 className="text-center text-lg">{error}</h1>
                            </div>
                        }
                        <Outlet />
                        <DefaultSettingsDropdown title={"Verified type"} value={VerifyType.artist} options={[VerifyType.artist, VerifyType.verify]} onChange={(e: any) => { setValue(e.target.value) }} />
                        <div className="flex w-full justify-end">
                            <ProfileButton onClick={async () => { await onVerifySubmit() }} text={"Verify"} isSelect={true} />
                        </div>
                    </div>
                </div>
            }
        </>
    )
}