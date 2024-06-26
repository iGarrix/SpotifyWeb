import { faArrowLeft, faMusic, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState, useTransition } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AddToHistory, RemoveWithHistory, SetPlayingTrack } from "../../../Helpers/QueueHelper";
import { useActions } from "../../../Hooks/useActions";
import { useTypedSelector } from "../../../Hooks/useTypedSelector";
import { ITrackResponse } from "../../../Redux/Reducers/PlayingReducer/types";
import { IHistory, StorageVariables, TempTake } from "../../../types";
import { DefaultButton } from "../../Commons/Buttons/DefaultButton";
import { FilterButton } from "../../Commons/Buttons/FilterButton";
import { SoundHistoryItem } from "../../Commons/Cards/SoundHistoryItem";
import { SearchField } from "../../Commons/Inputs/SearchField";

const icon_search = require('../../../Assets/Icons/Search.png');

export const History: React.FC = () => {
    const { initHistory, initQueue, clearHistory } = useActions();
    const { t } = useTranslation();
    const [searchParams, setSearchParams] = useSearchParams();
    const [isPending, startTransition] = useTransition();
    const [foundedHistory, setFoundedHistory] = useState<ITrackResponse[]>();
    const [searchQuery, setSearchQuery] = useState<string>(() => {
        const initQuery = searchParams.get('query');
        if (initQuery) {
            return initQuery;
        }
        return "";
    });

    let rx = useTypedSelector(state => state.playingReducer);
    let page = TempTake;
    const nav = useNavigate();
    const scrollHadler = () => {
        if (document.documentElement.scrollHeight - (document.documentElement.scrollTop + window.innerHeight) <= 0) {
            const storage_history = localStorage.getItem(StorageVariables.History);
            if (storage_history) {
                let stor_history = JSON.parse(storage_history) as IHistory;
                const size = stor_history.soundobjs.length;
                page += TempTake;
                stor_history.soundobjs.splice(page, size);
                initHistory(stor_history);
            }
        }
    }

    const GetHistory = (query: string | any) => {
        startTransition(() => {
            const storage_history = localStorage.getItem(StorageVariables.History);
            if (storage_history) {
                let stor_history = JSON.parse(storage_history) as IHistory;
                const size = stor_history.soundobjs.length;
                if (query && query.length != 0) {
                    const filtererHistory = stor_history.soundobjs.filter(f => f.track?.name.includes(query));
                    filtererHistory.splice(TempTake, size);
                    if (filtererHistory.length != 0) {
                        setFoundedHistory(filtererHistory);
                    }
                }

                initHistory(stor_history);
            }
        })
    }

    useEffect(() => {
        GetHistory("");
        document.documentElement.scrollTo(0, 0);

        document.addEventListener("scroll", scrollHadler);

        return function () {
            document.removeEventListener("scroll", scrollHadler);
        }
    }, []);

    useEffect(() => {
        if (searchQuery && searchQuery.length != 0) {
            onSearch(searchQuery)
        }
        else {
            onSearch("");
        }
    }, [searchQuery]);

    const RemovingItemWithHistory = (id: any) => {
        if (id) {
            const response = RemoveWithHistory(id);
            if (response) {
                initHistory(response);
            }
        }
    }
    const onSelectTrack = (item: ITrackResponse | null) => {
        const response = SetPlayingTrack(item);
        if (response) {
            initQueue(response);
            AddToHistory(item);
        }
    }

    const onClearHistory = () => {
        clearHistory();
        localStorage.removeItem(StorageVariables.History);
    }

    const onSearch = (value: string) => {
        setSearchParams({ query: value });
        GetHistory(value);
    }

    return (
        <div className="w-full px-[3%] py-[2%] mm:py-[4%] flex flex-col gap-6 items-start overflow-hidden text-dark-200 dark:text-light-200 bg-no-repeat h-full mm:min-h-[65vh]">
            <Helmet>
                <title>Soundwave | Your history</title>
            </Helmet>
            <div className="hidden mm:flex w-full px-[5%] pb-[15px] border-b border-b-dark-100">
                <FontAwesomeIcon className="text-xl text-dark-200 dark:text-light-200" icon={faArrowLeft} onClick={() => { nav(-1) }} />
            </div>
            {rx && rx.history && rx.history.soundobjs.length > 0 ?
                <div className="flex flex-col gap-8 w-full">
                    <div className="flex flex-col items-start mm:items-center gap-4">
                        <h1 className="font-semibold text-2xl mm:text-center sm:text-center">{t("Listening history")}</h1>
                        <div className="flex w-[40%] mm:w-full sm:w-full md:w-[90%] lg:w-[90%] xl:w-[80%]">
                            <SearchField placeholder={t("Search")} value={searchQuery} onChange={(e: any) => {
                                setSearchQuery(e.target.value)
                            }} icon={<img alt="icon" className="invert dark:invert-0 w-[28px]" src={icon_search} />} />
                        </div>
                        <div className="flex mm:w-full">
                            <FilterButton onClick={onClearHistory} text={t("Clear all history")} />
                        </div>
                    </div>
                    <div className="flex flex-col gap-10 w-full">
                        {
                            searchQuery && foundedHistory &&
                            <div className="flex flex-col gap-4">
                                <h1 className="text-medium text-xl">Found by '{searchQuery}'</h1>
                                <hr className="w-full border dark:border-dark-100" />
                                {
                                    foundedHistory.map((item: ITrackResponse, index: number) => {
                                        return (
                                            <div key={index} className="grid grid-cols-12 w-full">
                                                <div className="col-span-12 w-full">
                                                    <SoundHistoryItem index={index + 1} options={[{
                                                        title: t("Remove"), icon: <FontAwesomeIcon icon={faTrash} />, onClick: () => { RemovingItemWithHistory(item.track?.returnId) }
                                                    }]} track={item.track} trackCreators={item.trackCreators} onClick={() => {
                                                        onSelectTrack(item)
                                                    }} />
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                <hr className="w-full border dark:border-dark-100" />
                            </div>
                        }
                        {
                            searchQuery &&
                            <h1 className="text-medium text-xl">All songs</h1>
                        }
                        {
                            rx.history.soundobjs?.map((item: ITrackResponse, index: number) => {
                                return (
                                    <div key={index} className="grid grid-cols-12 w-full">
                                        <div className="col-span-12 w-full">
                                            <SoundHistoryItem index={index + 1} options={[{
                                                title: t("Remove"), icon: <FontAwesomeIcon icon={faTrash} />, onClick: () => { RemovingItemWithHistory(item.track?.returnId) }
                                            }]} track={item.track} trackCreators={item.trackCreators} onClick={() => {
                                                onSelectTrack(item)
                                            }} />
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                :
                <div className="flex flex-col gap-6 w-full h-full pt-[10%]">
                    <FontAwesomeIcon className="text-7xl font-medium text-dark-200 dark:text-light-200" icon={faMusic} />
                    <div className="flex flex-col items-center gap-8 text-dark-200 dark:text-light-200">
                        <div className="flex flex-col gap-3 items-center">
                            <h1 className="font-medium text-3xl">{t("History is empty")}</h1>
                            <p className="font-medium text-xl text-center">{t("You can also listening your favorite songs using search")}</p>
                        </div>
                        <div>
                            <DefaultButton onClick={() => { nav("/search") }} text={t("Search songs")} />
                        </div>
                    </div>
                </div>

            }
        </div>
    )
}