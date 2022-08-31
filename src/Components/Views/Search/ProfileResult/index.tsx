import { faCircleUser, faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Guid } from "guid-typescript";
import React, { useEffect, useTransition } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useActions } from "../../../../Hooks/useActions";
import { useTypedSelector } from "../../../../Hooks/useTypedSelector";
import { UserOverviever } from "../../../Commons/Cards/UserOverviever";

export const ProfileResult: React.FC = () => {
    const nav = useNavigate();
    const { getAllSearchProfile, addAllSearchProfile } = useActions();
    const rx = useTypedSelector(state => state.searchReducer);
    const [searchParams, setSearchParams] = useSearchParams();
    const { t } = useTranslation();
    const [isPending, startTransition] = useTransition();
    const scrollHadler = async () => {
        if (document.documentElement.scrollHeight - (document.documentElement.scrollTop + window.innerHeight) <= 0) {
            if (rx.nextPage && !rx.loading) {
                const top = document.documentElement.scrollTop;
                await FetchNext();
                document.documentElement.scrollTop = top;
            }
        }
    }
    useEffect(() => {
        const query = searchParams.get('query');
        if (query) {
            const fetchData = async () => {
                await getAllSearchProfile(query, 1);
            }
            startTransition(() => {
                fetchData();
            });
            const addNew = async () => {
                if (document.documentElement.scrollTop === 0) {
                    await FetchNext();
                }
            }
            startTransition(() => {
                addNew();
            });
        }
    }, [searchParams]);
    useEffect(() => {
        const listener = () => {
            document.addEventListener("scroll", scrollHadler);
        }
        listener();

        return function () {
            document.removeEventListener("scroll", scrollHadler);
        }

    }, [rx.nextPage && rx.loading])
    const FetchNext = async () => {
        const query = searchParams.get('query');
        if (rx.profiles && rx.nextPage && query) {
            await addAllSearchProfile(query, rx.nextPage);
        }
    }
    return (
        <div className="w-full h-full flex flex-col justify-start items-center relative">
            <Helmet>
                <title>Soundwave | Search Profiles</title>
            </Helmet>
            {
                rx.profiles && rx.profiles.length > 0 ?
                    <div className="w-full flex flex-col gap-5">
                        <h1 className="font-semibold text-2xl">{t("Profiles All")}</h1>
                        <div className="flex gap-6 mm:gap-[10px] flex-wrap">
                            {
                                rx.profiles?.map(item => {
                                    return (
                                        <UserOverviever key={Guid.create().toString()} avatar={item.avatar} username={item.username} />
                                    )
                                })
                            }
                        </div>
                    </div>
                    :
                    <div className="flex flex-col gap-6">
                        <FontAwesomeIcon className="text-7xl mm:text-5xl sm:text-5xl md:text-6xl font-medium text-dark-200 dark:text-light-200" icon={faCircleUser} />
                        <div className="flex flex-col items-center gap-8 text-dark-200 dark:text-light-200">
                            <div className="flex flex-col gap-3 items-center">
                                <h1 className="font-medium text-3xl mm:text-xl sm:text-xl md:text-2xl dark:text-light-200">{t("Profiles not found")}</h1>
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}