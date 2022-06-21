import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { RemoveWithHistory } from "../../../Helpers/QueueHelper";
import { useActions } from "../../../Hooks/useActions";
import { useTypedSelector } from "../../../Hooks/useTypedSelector";
import { ITrackResponse } from "../../../Redux/Reducers/SelectAlbumReducer/types";
import { baseUrl, IHistory, StorageVariables } from "../../../types";
import { SoundHistoryItem } from "../../Commons/Cards/SoundHistoryItem";

export const History: React.FC = () => {

    const {initHistory} = useActions();

    let rx = useTypedSelector(state => state.playingReducer);


    useEffect(() => {
        const storage_history = localStorage.getItem(StorageVariables.History);
        if (storage_history) {
            initHistory(JSON.parse(storage_history) as IHistory);
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

    return (
        <div className="w-full px-[3%] py-[2%] flex flex-col gap-6 items-start text-white bg-no-repeat h-full">
            { rx && rx.history && rx.history.soundobjs.length > 0 ?
                <div className="flex flex-col gap-8">
                    <h1 className="font-semibold text-2xl">Listening history</h1>
                    <div className="flex flex-col gap-10">
                        {
                            rx.history.soundobjs.map((item : ITrackResponse, index: number) => {
                                return (
                                    <div key={index} className="grid grid-cols-12">
                                        <div className="col-span-12">
                                            <SoundHistoryItem options={[{
                                                    title: "Save to library", icon: <FontAwesomeIcon icon={faHeart} />, onClick: () => { }
                                                },{
                                                    title: "Remove", icon: <FontAwesomeIcon icon={faTrash} />, onClick: () => { RemovingItemWithHistory(item.track?.returnId) }
                                                }]} track={item.track} trackCreators={item.trackCreators} onClick={() => {
                                                
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