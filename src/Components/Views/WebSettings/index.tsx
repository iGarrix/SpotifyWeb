import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { ClearStorage } from "../../../Redux/GlobalReduxFunc";
import { store } from "../../../Redux/store";
import { StorageVariables, Theme } from "../../../types";
import { ProfileButton } from "../../Commons/Buttons/ProfileButton";
import { ToggleButton } from "../../Commons/Buttons/ToggleButton";
import { DefaultSettingsDropdown } from "../../Commons/DefaultSettingsDropdown";
import { initTheme } from "../../../Redux/Reducers/GlobalReducer/action"

export const WebSettings: React.FC = () => {

    const [lang, setLang] = useState(() => {
        const lang = localStorage.getItem(StorageVariables.Language);
        if (lang === null || lang === undefined) {
            return "English";
        }
        return lang;
    });

    const [dark, setDark] = useState(() => {
        const theme = localStorage.getItem(StorageVariables.Theme);
        if (theme === null || theme === undefined) {
            return Theme.light;
        }
        return theme;
    });


    const onChangeLanguage = (value: string) => {
        switch (value) {
            case 'English':             
                localStorage.setItem(StorageVariables.Language, "English");
                break;
            case 'Ukraine':             
                localStorage.setItem(StorageVariables.Language, "Ukraine");
                break;
            default:
                break;
        }
    }
    
    const onChangeTheme = () => {
        const theme = dark === Theme.dark ? Theme.light : Theme.dark;
        switch (theme) {
            case Theme.dark:
                localStorage.setItem(StorageVariables.Theme, Theme.dark);
                setDark(theme);
                initTheme(theme, store.dispatch);
                break;
            case Theme.light:
                localStorage.setItem(StorageVariables.Theme, Theme.light);
                setDark(theme);
                initTheme(theme, store.dispatch);
                break;
            default:
                break;
        }
    }

    const clearAllStorage = () => {
        ClearStorage(store.dispatch);
        window.location.reload();
    }

    return (
        <div className="flex flex-col h-full py-[50px] px-[150px] text-dark-200 dark:text-light-200 gap-10">
            <Helmet>
                <title>Soundwave | Settings</title>
            </Helmet>
            <h1 className="text-3xl font-bold">Settings</h1>
            <div className="flex items-center justify-between">
                <div className="flex flex-col">
                    <p className="text-2xl font-medium">Language</p>
                    <p>Choose language</p>
                </div>
                <div>
                    <DefaultSettingsDropdown title={"Choose language"} options={["English", "Ukraine"]} value={lang} onChange={(e: any) => {onChangeLanguage(e.target.value)}} />
                </div>
            </div>
            <div className="flex items-center justify-between">
                <div className="flex flex-col">
                    <p className="text-2xl font-medium">Theme</p>
                    <p>Choose theme</p>
                </div>
                <div>
                   <ToggleButton onCheck={onChangeTheme} isSelected={dark === Theme.dark ? true : false} text={"Active light"} checkedText={"Active dark"}/>
                </div>
            </div>
            <div className="flex items-center justify-between">
                <div className="flex flex-col">
                    <p className="text-2xl font-medium">Storage & Cookies</p>
                    <p>Clear all data in storage and cookies</p>
                </div>
                <div className="">
                   <ProfileButton text={"Clear All"} isSelect={false} onClick={clearAllStorage} />
                </div>
            </div>
            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-3">
                        <p className="text-2xl font-medium">Cookie & Storage Rules</p>
                        <hr className="w-full" />
                    </div>
                    <ol>
                        <li className="flex flex-col gap-1">
                            <p className="text-xl">• OAuth2 Authorizate</p>
                            <div className="px-[2%] flex flex-col">
                                <p className="">When you authorize using Google, your authorization session will be created in the cookie</p>
                                <p className="">!At authorization, your data remains completely confidential!</p>
                                <p>Registration using Google is very simple, your data is automatically adjusted to your new profile</p>
                                <p className="text-red-500">If you delete your session, you will need to log in to your profile again</p>
                            </div>
                        </li>
                    </ol>
                    <ol>
                        <li className="flex flex-col gap-1">
                            <p className="text-xl">• Queue & History</p>
                            <div className="px-[2%] flex flex-col">
                                <p className="">The history of your listening to songs and the queue is recorded in the local storage</p>
                                <p className="">!Audition data and queues remain completely confidential!</p>
                                <p className="text-red-500">If you clear your local storage, your listening data and queues will be cleared automatically</p>
                            </div>
                        </li>
                    </ol>
                    <ol>
                        <li className="flex flex-col gap-1">
                            <p className="text-xl">• Language</p>
                            <div className="px-[2%] flex flex-col">
                                <p className="">The interface language is written to local storage</p>
                                <p className="text-red-500">If you clear your local storage, your chosed language data will be cleared automatically</p>
                            </div>
                        </li>
                    </ol>
                    <ol>
                        <li className="flex flex-col gap-1">
                            <p className="text-xl">• Theme</p>
                            <div className="px-[2%] flex flex-col">
                                <p className="">The interface language is written to local storage</p>
                                <p className="text-red-500">If you clear your local storage, your chosed theme data will be cleared automatically</p>
                            </div>
                        </li>
                    </ol>
                    <ol>
                        <li className="flex flex-col gap-1">
                            <p className="text-xl">• Save Volume</p>
                            <div className="px-[2%] flex flex-col">
                                <p className="">If you change the sound, it will remain as you left it in the future use of the service</p>
                                <p className="text-red-500">If you clear your local storage, your volume data will be cleared automatically</p>
                            </div>
                        </li>
                    </ol>
                </div>
            </div>
        </div>
    )
}