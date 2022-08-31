import { faMusic } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Guid } from "guid-typescript";
import React, { useEffect, useTransition } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useActions } from "../../../../Hooks/useActions";
import { useTypedSelector } from "../../../../Hooks/useTypedSelector";
import { DefaultButton } from "../../../Commons/Buttons/DefaultButton";
import { SoundItem } from "../../../Commons/Cards/SoundItem";
import { UserOverviever } from "../../../Commons/Cards/UserOverviever";

export const WeeklyArtist: React.FC = () => {

    const { getMainArtist, addMainArtist } = useActions();
    const mainReducer = useTypedSelector(state => state.mainReducer);
    const [isPending, startTransition] = useTransition();
    const nav = useNavigate();
    const { t } = useTranslation();
    const scrollHadler = async () => {
        if (document.documentElement.scrollHeight - (document.documentElement.scrollTop + window.innerHeight) <= 0) {
            if (mainReducer.nextPage && !mainReducer.loading) {
                await FetchNext();
            }
        }
    }

    useEffect(() => {

        startTransition(() => {
            const initLocalAsync = async (page: number) => {
                await getMainArtist(page);
            }
            initLocalAsync(1);
            const addNew = async () => {
                if (document.documentElement.scrollTop === 0) {
                    await FetchNext();
                }
            }
            addNew();
        })
        document.documentElement.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const listener = () => {
            document.addEventListener("scroll", scrollHadler);
        }
        listener();

        return function () {
            document.removeEventListener("scroll", scrollHadler);
        }

    }, [mainReducer.nextPage && mainReducer.loading])

    const FetchNext = async () => {
        if (mainReducer.artists && mainReducer.nextPage) {
            await addMainArtist(mainReducer.nextPage);
        }
    }

    return (
        <div className="w-full h-full flex flex-col justify-start py-8 px-12 mm:px-3 text-dark-200 dark:text-light-200 items-center relative">
            <Helmet>
                <title>Soundwawe | Top artist</title>
            </Helmet>
            {
                mainReducer.artists ?
                    <div className="w-full h-full flex flex-col gap-5 z-10">
                        <h1 className="font-semibold text-2xl mm:text-center">{t("Weekly artists & creators")}</h1>
                        <div className="flex items-center gap-6 mm:gap-4 flex-wrap">
                            {
                                mainReducer.artists.map(item => {
                                    return (
                                        <UserOverviever key={Guid.create().toString()} avatar={item.avatar} username={item.username} />
                                    )
                                })
                            }
                        </div>
                    </div>
                    :
                    <div className="flex flex-col items-center justify-center w-full gap-5 h-full">
                        <FontAwesomeIcon className="text-7xl font-medium text-dark-200 dark:text-light-200" icon={faMusic} />
                        <div className="flex flex-col items-center gap-8 text-dark-200 dark:text-light-200">
                            <div className="flex flex-col gap-3 items-center">
                                <h1 className="font-medium text-3xl">{t("Weekly creators not found")}</h1>
                                <p className="font-medium text-xl">{t("You can jump to main page")}</p>
                            </div>
                            <div>
                                <DefaultButton onClick={() => { nav("/") }} text={t("Jump")} />
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}