import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Guid } from "guid-typescript";
import React, { useEffect } from "react"
import { RemoveWithQueue } from "../../../Helpers/QueueHelper";
import { useActions } from "../../../Hooks/useActions";
import { useTypedSelector } from "../../../Hooks/useTypedSelector";
import { IQueue } from "../../../Redux/Reducers/SelectAlbumReducer/types";
import { StorageVariables, TempTake } from "../../../types";
import { SoundHistoryItem } from "../../Commons/Cards/SoundHistoryItem";

export const Queue: React.FC = () => {

    let rx = useTypedSelector(state => state.playingReducer);

    const {initQueue, clearQueue} = useActions();

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

    return (
        <div className="w-full flex flex-col gap-6 items-start text-white px-[3%] py-[2%]">
            {
                rx && rx.queue && rx.queue.soundobjs && rx.queue.soundobjs.length > 0 ?
                    <div className="flex flex-col gap-6">
                        <h1 className="font-semibold text-2xl">Selected track</h1>
                        {
                            rx.queue.soundobjs[0] &&
                            <>
                                <SoundHistoryItem options={[{
                                    title: "Save to library", icon: <FontAwesomeIcon icon={faHeart} />, onClick: () => { }
                                },
                                {
                                    title: "Remove with queue", icon: <FontAwesomeIcon icon={faTrash} />, onClick: () => { 
                                        if (rx && rx.queue && rx.queue.soundobjs ) {                 
                                            RmWithQueue(rx.queue.soundobjs[0].track?.returnId, rx.queue?.isPlay) 
                                        }
                                    }
                                }]} track={rx.queue.soundobjs[0].track} trackCreators={rx.queue.soundobjs[0].trackCreators} onClick={() => { }} />
                                {
                                    rx.queue.soundobjs.length === 1 ?
                                        <h1 className="font-semibold text-2xl mt-4">Queue is empty</h1>
                                        :
                                        <div className="flex flex-col gap-6 mt-4">
                                            <h1 className="font-semibold text-2xl">In queue</h1>
                                            <div className="flex flex-col gap-6">
                                                {
                                                    rx.queue.soundobjs.filter(f => f.track?.returnId !== rx.queue?.soundobjs[0].track?.returnId).map(item => {
                                                        return (
                                                            <SoundHistoryItem key={Guid.create().toString()}
                                                            options={[{
                                                                title: "Save to library", icon: <FontAwesomeIcon icon={faHeart} />, onClick: () => { }
                                                            }, {
                                                                title: "Remove with queue", icon: <FontAwesomeIcon icon={faTrash} />, onClick: () => { RmWithQueue(item.track?.returnId, rx.queue?.isPlay) }
                                                            }]}
                                                            track={item.track} trackCreators={item.trackCreators} onClick={() => { }} />
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                }
                            </>
                        }
                    </div>
                    :
                    <div className="rounded-xl bg-dark-200/60 px-12 py-6 flex flex-col gap-6">
                        <h1 className="font-semibold text-3xl">No playing song</h1>
                        <p className="text-xl">Turn on a song to add it to the queue</p>
                    </div>

            }
        </div>
    )
}