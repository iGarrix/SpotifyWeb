import { faArrowLeft, faHeart, faMusic, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Guid } from "guid-typescript";
import React, { useEffect } from "react"
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { AddToHistory, RemoveWithQueue, SetPlayingTrack } from "../../../Helpers/QueueHelper";
import { useActions } from "../../../Hooks/useActions";
import { useTypedSelector } from "../../../Hooks/useTypedSelector";
import { IQueue, ITrackResponse } from "../../../Redux/Reducers/PlayingReducer/types";
import { StorageVariables, TempTake } from "../../../types";
import { DefaultButton } from "../../Commons/Buttons/DefaultButton";
import { FilterButton } from "../../Commons/Buttons/FilterButton";
import { SoundHistoryItem } from "../../Commons/Cards/SoundHistoryItem";

export const Queue: React.FC = () => {
    let rx = useTypedSelector(state => state.playingReducer);
    const { initQueue, clearQueue } = useActions();
    const nav = useNavigate();
    let page = TempTake;
    const RmWithQueue = (id: any, isPlay: boolean | any) => {
        if (id) {
            var response = RemoveWithQueue(id, isPlay);
            if (response) {
                initQueue(response);
            }
            else {
                clearQueue();
            }
        }
    }
    const scrollHadler = () => {
        if (document.documentElement.scrollHeight - (document.documentElement.scrollTop + window.innerHeight) <= 0) {
            const storage_queue = localStorage.getItem(StorageVariables.Queue);
            if (storage_queue) {
                let stor_queue = JSON.parse(storage_queue) as IQueue;
                const size = stor_queue.soundobjs.length;
                page += TempTake;
                stor_queue.soundobjs.splice(page, size);
                initQueue(stor_queue);
            }
        }
    }
    useEffect(() => {
        document.documentElement.scrollTo(0, 0);

        document.addEventListener("scroll", scrollHadler);

        return function () {
            document.removeEventListener("scroll", scrollHadler);
        }
    }, []);

    const onSelectTrack = (item: ITrackResponse | null) => {
        const response = SetPlayingTrack(item);
        if (response) {
            initQueue(response);
            AddToHistory(item);
        }
    }

    const onClearQueue = () => {
        clearQueue();
        localStorage.removeItem(StorageVariables.Queue);
    }
    
    return (
        <div className="w-full mm:min-h-[65vh] flex flex-col gap-6 items-start text-dark-200 dark:text-light-200 px-[3%] py-[2%] mm:py-[4%]">
            <Helmet>
                <title>Soundwave | Playing Queue</title>
            </Helmet>
            <div className="hidden mm:flex w-full px-[5%] pb-[15px] border-b border-b-dark-100">
                <FontAwesomeIcon className="text-xl text-dark-200 dark:text-light-200" icon={faArrowLeft} onClick={() => {nav(-1)}} />
            </div>
            {
                rx && rx.queue && rx.queue.soundobjs && rx.queue.soundobjs.length > 0 ?
                    <div className="flex flex-col gap-6 w-full">
                        {
                            rx.queue.soundobjs[0] &&
                            <>
                                <div className="flex flex-col gap-6 w-full">
                                    <div className="flex flex-col items-start mm:items-center gap-2">
                                        <h1 className="font-semibold text-2xl mm:text-center sm:text-center">In queue</h1>
                                        <FilterButton onClick={onClearQueue} text={"Clear all queue"} />
                                    </div>
                                    <div className="flex flex-col gap-6 w-full">
                                        {
                                            rx.queue.soundobjs.map((item: ITrackResponse, index: number) => {
                                                return (
                                                    <SoundHistoryItem key={Guid.create().toString()} index={index + 1} selected={rx.queue?.playedIndex === index}
                                                        options={[{
                                                            title: "Remove with queue", icon: <FontAwesomeIcon icon={faTrash} />, onClick: () => { RmWithQueue(item.track?.returnId, rx.queue?.isPlay) }
                                                        }]}
                                                        track={item.track} trackCreators={item.trackCreators} onClick={() => { onSelectTrack(item) }} />
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </>
                        }
                    </div>
                    :
                    <div className="flex flex-col gap-6 w-full h-full pt-[10%]">
                    <FontAwesomeIcon className="text-7xl font-medium text-dark-200 dark:text-light-200" icon={faMusic} />
                    <div className="flex flex-col items-center gap-8 text-dark-200 dark:text-light-200">
                        <div className="flex flex-col gap-3 items-center">
                            <h1 className="font-medium text-3xl">Queue is empty</h1>
                            <p className="font-medium text-xl text-center">You can also listening your favorite songs using search</p>
                        </div>
                        <div>
                            <DefaultButton onClick={() => { nav("/search") }} text={"Search songs"} />
                        </div>
                    </div>
                </div>

            }
        </div>
    )
}