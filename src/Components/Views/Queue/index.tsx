import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Guid } from "guid-typescript";
import React, { useEffect } from "react"
import { Helmet } from "react-helmet";
import { AddToHistory, RemoveWithQueue, SetPlayingTrack } from "../../../Helpers/QueueHelper";
import { useActions } from "../../../Hooks/useActions";
import { useTypedSelector } from "../../../Hooks/useTypedSelector";
import { IQueue, ITrackResponse } from "../../../Redux/Reducers/PlayingReducer/types";
import { StorageVariables, TempTake } from "../../../types";
import { SoundHistoryItem } from "../../Commons/Cards/SoundHistoryItem";

export const Queue: React.FC = () => {
    let rx = useTypedSelector(state => state.playingReducer);
    const { initQueue, clearQueue } = useActions();
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
    
    return (
        <div className="w-full flex flex-col gap-6 items-start text-dark-200 px-[3%] py-[2%]">
            <Helmet>
                <title>Soundwave | Playing Queue</title>
            </Helmet>
            {
                rx && rx.queue && rx.queue.soundobjs && rx.queue.soundobjs.length > 0 ?
                    <div className="flex flex-col gap-6 w-full">
                        {
                            rx.queue.soundobjs[0] &&
                            <>
                                <div className="flex flex-col gap-6 w-full">
                                    <h1 className="font-semibold text-2xl">In queue</h1>
                                    <div className="flex flex-col gap-6 w-full">
                                        {
                                            rx.queue.soundobjs.map((item: ITrackResponse, index: number) => {
                                                return (
                                                    <SoundHistoryItem key={Guid.create().toString()} index={index} selected={rx.queue?.playedIndex === index}
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
                    <div className="rounded-xl bg-light-200 px-12 py-6 flex flex-col gap-6">
                        <h1 className="font-semibold text-3xl">No playing song</h1>
                        <p className="text-xl">Turn on a song to add it to the queue</p>
                    </div>

            }
        </div>
    )
}