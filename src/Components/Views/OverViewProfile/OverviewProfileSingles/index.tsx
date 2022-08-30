import { faMusic } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Guid } from "guid-typescript";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { AddToHistory, SetPlayingTrack } from "../../../../Helpers/QueueHelper";
import { useActions } from "../../../../Hooks/useActions";
import { useTypedSelector } from "../../../../Hooks/useTypedSelector";
import { IGetAllMySingleRequest } from "../../../../Redux/Reducers/MySingleReducer/types";
import { ITrackResponse } from "../../../../Redux/Reducers/PlayingReducer/types";
import { SoundItem } from "../../../Commons/Cards/SoundItem";

export const OverviewProfileSingles : React.FC = () => {
    const nav = useNavigate();
    const { t } = useTranslation();
    const { getMySingle, addMySingle, initQueue } = useActions();
    const rx = useTypedSelector(state => state.mySingleReducer);
    const singles = useTypedSelector(state => state.mySingleReducer.singles);
    const user = useTypedSelector(state => state.userReducer.overviewer);
    const playingReducer = useTypedSelector(state => state.playingReducer);
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
        const fetchData = async () => {
            if (user) {
                const rq: IGetAllMySingleRequest = {
                    email: user.email,
                    page: 1
                }
                await getMySingle(rq);
            }
        }
        fetchData();

    }, [user]);
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
        if (rx.singles && rx.nextPage && user) {
            const rq: IGetAllMySingleRequest = {
                email: user?.email,
                page: rx.nextPage,
            }
            await addMySingle(rq);
        }
    }
    const onSelectTrack = (item: ITrackResponse | null) => {
        const response = SetPlayingTrack(item);
        if (response) {
            initQueue(response);
            AddToHistory(item);
        }
    }

    const onSubscribe = async () => {
        
    }

    const onUnsubscribe = async () => {

    }

    return (
        <div className="w-full h-full flex flex-col justify-start items-center py-8 gap-12 relative">
            <Helmet>
                <title>Soundwave | Singles</title>
            </Helmet>
            {
                    singles && rx.error.length === 0 ?
                        <div className="w-full h-full flex flex-col gap-[15px] px-[330px] mm:px-0 sm:px-0 md:px-0 lg:px-[10%] xl:px-[15%] 2xl:px-[20%]">
                            {
                                singles.map(item => {
                                    return (
                                        <SoundItem key={Guid.create().toString()}
                                            onClick={() => { onSelectTrack(item) }}
                                            isPlay={playingReducer.queue && item.track ? playingReducer.queue.soundobjs[playingReducer.queue.playedIndex].track?.returnId === item.track.returnId && playingReducer.queue?.isPlay : false}
                                            item={item}
                                        />
                                    )
                                })
                            }
                        </div>
                        :
                        <>
                            <hr className="w-full" />
                            <div className="flex flex-col items-center gap-6">
                                <FontAwesomeIcon className="text-7xl font-medium text-dark-200 dark:text-light-200" icon={faMusic} />
                                <h1 className="font-medium text-2xl text-dark-200 dark:text-light-200">{t("Singles not found")}</h1> 
                            </div>
                        </>
            }

        </div>
    )
} 