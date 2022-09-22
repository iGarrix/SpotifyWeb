import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { ClearStorage } from "../../../Redux/GlobalReduxFunc";
import { store } from "../../../Redux/store";
import { changeLanguage, LanguageVars, StorageVariables, Theme } from "../../../types";
import { ProfileButton } from "../../Commons/Buttons/ProfileButton";
import { ToggleButton } from "../../Commons/Buttons/ToggleButton";
import { DefaultSettingsDropdown } from "../../Commons/DefaultSettingsDropdown";
import { initTheme } from "../../../Redux/Reducers/GlobalReducer/action"
import { useActions } from "../../../Hooks/useActions";
import { useTranslation } from "react-i18next";

export const WebSettings: React.FC = () => {


    const { initLangDispath } = useActions();

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
        changeLanguage(value);
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

    const { t } = useTranslation();

    return (
        <div className="flex flex-col h-full py-[50px] px-[150px] mm:px-2 mm:py-[8%] sm:px-4 sm:py-[6%] md:px-6 md:py-[4%] lg:px-6 lg:py-[4%] text-dark-200 dark:text-light-200 gap-10">
            <Helmet>
                <title>Soundwave | Settings</title>
            </Helmet>
            <h1 className="text-3xl font-bold mm:text-center sm:text-center md:text-center">{t('Settings')}</h1>
            <div className="flex mm:flex-col mm:gap-2 items-center justify-between mm:w-full">
                <div className="flex flex-col mm:w-full">
                    <p className="text-2xl font-medium">{t('Language')}</p>
                    <p className="mm:hidden">{t('Choose language')}</p>
                </div>
                <div className="mm:w-full">
                    <DefaultSettingsDropdown title={t('Choose language')} options={[LanguageVars.EN, LanguageVars.UA]} value={lang} onChange={(e: any) => { onChangeLanguage(e.target.value) }} />
                </div>
            </div>
            <div className="flex mm:flex-col mm:gap-2 items-center justify-between mm:w-full">
                <div className="flex flex-col mm:w-full">
                    <p className="text-2xl font-medium">{t('Theme')}</p>
                    <p className="mm:hidden">{t('Choose theme')}</p>
                </div>
                <div className="mm:w-full">
                    <ToggleButton onCheck={onChangeTheme} isSelected={dark === Theme.dark ? true : false} text={t('Active light')} checkedText={t('Active dark')} />
                </div>
            </div>
            <div className="flex mm:flex-col mm:gap-2 items-center justify-between">
                <div className="flex flex-col mm:w-full">
                    <p className="text-2xl font-medium">{t('Storage & Cookies')}</p>
                    <p>{t('ClearTitle')}</p>
                </div>
                <div className="mm:w-full">
                    <ProfileButton text={t('Clear')} isSelect={false} onClick={clearAllStorage} />
                </div>
            </div>
            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-3">
                        <p className="text-2xl font-medium">{t('Cookie & Storage Rules')}</p>
                        <hr className="w-full" />
                    </div>
                    <ol>
                        <li className="flex flex-col gap-2">
                            <p className="text-xl">{t('• OAuth2 Authorizate')}</p>
                            <div className="px-[2%] flex flex-col">
                                <p className="">{t('OAuth2 Authorizate 1')}</p>
                                <p className="">{t('OAuth2 Authorizate 2')}</p>
                                <p>{t('OAuth2 Authorizate 3')}</p>
                                <p className="text-red-500">{t('OAuth2 Authorizate 4')}</p>
                            </div>
                        </li>
                    </ol>
                    <ol>
                        <li className="flex flex-col gap-2">
                            <p className="text-xl">{t('• Queue & History')}</p>
                            <div className="px-[2%] flex flex-col">
                                <p className="">{t('Queue & History 1')}</p>
                                <p className="">{t('Queue & History 2')}</p>
                                <p className="text-red-500">{t('Queue & History 3')}</p>
                            </div>
                        </li>
                    </ol>
                    <ol>
                        <li className="flex flex-col gap-2">
                            <p className="text-xl">{t('• Language')}</p>
                            <div className="px-[2%] flex flex-col">
                                <p className="">{t('Language 1')}</p>
                                <p className="text-red-500">{t('Language 2')}</p>
                            </div>
                        </li>
                    </ol>
                    <ol>
                        <li className="flex flex-col gap-2">
                            <p className="text-xl">{t('• Theme')}</p>
                            <div className="px-[2%] flex flex-col">
                                <p className="">{t('Theme 1')}</p>
                                <p className="text-red-500">{t('Theme 2')}</p>
                            </div>
                        </li>
                    </ol>
                    <ol>
                        <li className="flex flex-col gap-2">
                            <p className="text-xl">{t('• Save Volume')}</p>
                            <div className="px-[2%] flex flex-col">
                                <p className="">{t('Save Volume 1')}</p>
                                <p className="text-red-500">{t('Save Volume 2')}</p>
                            </div>
                        </li>
                    </ol>
                </div>
            </div>
        </div>
    )
}