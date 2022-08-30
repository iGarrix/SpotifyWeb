import { faMusic } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Guid } from "guid-typescript";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { AddToHistory, SetPlayingTrack } from "../../../../Helpers/QueueHelper";
import { useActions } from "../../../../Hooks/useActions";
import { useTypedSelector } from "../../../../Hooks/useTypedSelector";
import { IGetAllMySingleRequest } from "../../../../Redux/Reducers/MySingleReducer/types";
import { IQueue, ITrackResponse } from "../../../../Redux/Reducers/PlayingReducer/types";
import { StorageVariables } from "../../../../types";
import { DefaultButton } from "../../../Commons/Buttons/DefaultButton";
import { SoundItem } from "../../../Commons/Cards/SoundItem";

export const MyMediaLibrarySingle: React.FC = () => {
    const { getMyMediaLibrarySingle, addMyMediaLibrarySingle, initQueue } = useActions();
    const rx = useTypedSelector(state => state.myMediaLibraryReducer);
    const singles = useTypedSelector(state => state.myMediaLibraryReducer.singles);
    const user = useTypedSelector(state => state.userReducer.profile);
    const playingReducer = useTypedSelector(state => state.playingReducer);
    const [isInited, setInited] = useState(false);
    const nav = useNavigate();
    const { t } = useTranslation();

    const InitQueueSingles = (play: boolean) => {
        if (playingReducer.tracks && !isInited && singles) {
            const newQueue: IQueue = { soundobjs: singles, isPlay: play, playedIndex: 0, };
            localStorage.setItem(StorageVariables.Queue, JSON.stringify(newQueue));
            initQueue(newQueue);
            setInited(true);
        }
    }

    const scrollHadler = async () => {
        if (document.documentElement.scrollHeight - (document.documentElement.scrollTop + window.innerHeight) <= 0) {
            if (rx.nextPage && !rx.loading) {
                const top = document.documentElement.scrollTop;
                await FetchNext();
                if (playingReducer?.queue?.isPlay) {
                    InitQueueSingles(playingReducer.queue.isPlay);
                }
                else {
                    InitQueueSingles(false);
                }
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
                await getMyMediaLibrarySingle(rq);
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
            await addMyMediaLibrarySingle(rq);
        }
    }
    const onSelectTrack = (item: ITrackResponse | null) => {
        if (playingReducer?.queue && playingReducer.queue.soundobjs[playingReducer.queue.playedIndex].track?.returnId === item?.track?.returnId) {
            InitQueueSingles(true);
        }
        const response = SetPlayingTrack(item);
        if (response) {
            initQueue(response);
            AddToHistory(item);
        }
    }

    return (
        <div className="w-full h-full flex flex-col justify-start items-center py-8 gap-12 relative">
            <Helmet>
                <title>Soundwave | MyMediaLibrarySingle</title>
            </Helmet>
            {
                    singles && rx.error.length === 0 ?
                        <div className="w-full h-full flex flex-col gap-[18px] px-[330px] mm:px-0 sm:px-0 md:px-0 lg:px-0 xl:px-0 2xl:px-[15%]">
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
                            <FontAwesomeIcon className="text-7xl font-medium text-dark-200 dark:text-light-200" icon={faMusic} />
                            <div className="flex flex-col items-center gap-8 text-dark-200 dark:text-light-200">
                                <div className="flex flex-col gap-3 items-center">
                                    <h1 className="font-medium text-3xl mm:text-2xl text-center">{t("Save you first single song")}</h1>
                                    <p className="font-medium text-xl mm:text-lg text-center">{t("You can also login your account")}</p>
                                </div>
                                <div>
                                    <DefaultButton onClick={() => { nav("/search") }} text={t("Save you first single song")} />
                                </div>
                            </div>
                        </>
            }
        </div>
    );
};
