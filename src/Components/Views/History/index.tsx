import { faSave, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { ITrackResponse } from "../../../Redux/Reducers/SelectAlbumReducer/types";
import { IHistory, StorageVariables } from "../../../types";
import { SoundHistoryItem } from "../../Commons/Cards/SoundHistoryItem";

export const History: React.FC = () => {

    const [history, setHistory] = useState<IHistory | null>(null);

    useEffect(() => {
        const storage_history = localStorage.getItem(StorageVariables.History);
        if (storage_history) {
            setHistory(JSON.parse(storage_history) as IHistory);
        }
    }, []);

    return (
        <div className="w-full px-[3%] py-[2%] flex flex-col gap-6 items-start text-white">
            { history ?
                <div className="flex flex-col gap-8">
                    <h1 className="font-semibold text-2xl">Listening history</h1>
                    <div className="flex flex-col gap-10">
                        {
                            history.soundobjs.map((item : ITrackResponse, index: number) => {
                                return (
                                    <div key={index} className="grid grid-cols-12">
                                        <div className="col-span-12">
                                            <SoundHistoryItem options={[{
                                                    title: "Save", icon: <FontAwesomeIcon icon={faSave} />, onClick: () => { }
                                                },{
                                                    title: "Remove", icon: <FontAwesomeIcon icon={faTrash} />, onClick: () => { }
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