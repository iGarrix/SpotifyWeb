import { faCheck, faUser } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Outlet, useNavigate } from "react-router-dom";
import { useActions } from "../../../../Hooks/useActions";
import { useTypedSelector } from "../../../../Hooks/useTypedSelector";
import { IVerifiedAccountRequest } from "../../../../Redux/Reducers/UserReducer/types";
import { baseUrl, DeviceType, VerifyType } from "../../../../types";
import { ProfileButton } from "../../../Commons/Buttons/ProfileButton";
import { PreviewCardAccount } from "../../../Commons/Cards/PreviewCardAccount";

export const VerifyAccount: React.FC = () => {
    const { t } = useTranslation();
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
    const onVerifySubmit = async () => {
        try {
            if (user) {
                const request: IVerifiedAccountRequest = {
                    findEmail: user.email,
                    status: VerifyType.verify,
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
                <div className="flex flex-col h-full py-[50px] px-[150px] mm:px-[3%] sm:px-[5%] md:px-[10%] lg:px-[10%] xl:px-[10%] text-dark-200 dark:text-light-200">
                    <h1 className="text-3xl font-bold">{t("Verify your account")}</h1>
                    <div className="flex flex-col mt-[40px] w-full gap-[20px]">
                        <div className="grid grid-cols-2 mm:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 w-full gap-10">
                            <PreviewCardAccount ImageSrc={ImageSrc} BackgroundSrc={BackgroundSrc} title={t("Client profile")}
                                isSelect={currentItem === "/accountsettings/verifyaccount"} nickname={user.username} email={user.email} icon={faUser} onSelect={() => { setCurrentItem("/accountsettings/verifyaccount"); nav(""); }} />
                            <PreviewCardAccount ImageSrc={ImageSrc} BackgroundSrc={BackgroundSrc} title={t("Verified profile")}
                                isSelect={currentItem === "/accountsettings/verifyaccount/verified"} nickname={user.username} email={user.email} icon={faCheck} onSelect={() => { setCurrentItem("/accountsettings/verifyaccount/verified"); nav("verified"); }} />
                        </div>
                    </div>
                    <div className="flex flex-col w-full gap-[40px] mt-[50px]">
                        {
                            error &&
                            <div className="flex flex-col py-5 items-center justify-center bg-red-500/80 rounded-xl">
                                <h1 className="text-light-100 text-center">{error}</h1>
                            </div>
                        }
                        <Outlet />
                        <div className="flex w-full justify-end">
                            <ProfileButton onClick={async () => { await onVerifySubmit() }} text={t("Verify")} isSelect={true} />
                        </div>
                    </div>
                </div>
            }
        </>
    )
}