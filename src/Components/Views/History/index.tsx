import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { AddToHistory, RemoveWithHistory, SetPlayingTrack } from "../../../Helpers/QueueHelper";
import { useActions } from "../../../Hooks/useActions";
import { useTypedSelector } from "../../../Hooks/useTypedSelector";
import { ITrackResponse } from "../../../Redux/Reducers/SelectAlbumReducer/types";
import { IHistory, StorageVariables, TempTake } from "../../../types";
import { SoundHistoryItem } from "../../Commons/Cards/SoundHistoryItem";

export const History: React.FC = () => {
    const { initHistory, initQueue } = useActions();
    let rx = useTypedSelector(state => state.playingReducer);
    let page = TempTake;
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
    useEffect(() => {
        const storage_history = localStorage.getItem(StorageVariables.History);
        if (storage_history) {
            let stor_history = JSON.parse(storage_history) as IHistory;
            const size = stor_history.soundobjs.length;
            stor_history.soundobjs.splice(TempTake, size);
            initHistory(stor_history);
        }
        document.documentElement.scrollTo(0, 0);

        document.addEventListener("scroll", scrollHadler);

        return function () {
            document.removeEventListener("scroll", scrollHadler);
        }
    }, []);
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
    return (
        <div className="w-full px-[3%] py-[2%] flex flex-col gap-6 items-start text-dark-200 bg-no-repeat h-full">
            <Helmet>
                <title>Soundwave | Your history</title>
            </Helmet>
            {rx && rx.history && rx.history.soundobjs.length > 0 ?
                <div className="flex flex-col gap-8 w-full">
                    <h1 className="font-semibold text-2xl">Listening history</h1>
                    <div className="flex flex-col gap-10 w-full">
                        {
                            rx.history.soundobjs?.map((item: ITrackResponse, index: number) => {
                                return (
                                    <div key={index} className="grid grid-cols-12 w-full">
                                        <div className="col-span-12 w-full">
                                            <SoundHistoryItem index={index} options={[{
                                                title: "Remove", icon: <FontAwesomeIcon icon={faTrash} />, onClick: () => { RemovingItemWithHistory(item.track?.returnId) }
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
                <div className="border border-gray-400 rounded-xl px-6 py-2 flex flex-col gap-2 items-center justify-center">
                    <h1 className="font-semibold text-3xl">History is empty</h1>
                    <p className="text-xl">Listen to songs to add to the story</p>
                </div>

            }
        </div>
    )
}