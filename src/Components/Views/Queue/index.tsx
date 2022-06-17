import React from "react";
import { useTypedSelector } from "../../../Hooks/useTypedSelector";
import { baseUrl } from "../../../types";

const icon_play = require('../../../Assets/Icons/Play.png');

export const Queue: React.FC = () => {

    const rx = useTypedSelector(state => state.playingReducer);

    return (
        <div className="w-full px-10 py-5 flex flex-col gap-6 items-start text-white">
            {
                rx.queue ?
                    <div className="flex flex-col gap-6">
                        <h1 className="font-semibold text-3xl">Playing track</h1>
                        <div className="rounded-xl overflow-hidden bg-black relative">
                            <div className="absolute top-0 w-full h-full bg-cover object-cover bg-no-repeat opacity-20" style={{ backgroundImage: `url('${baseUrl + "Images/Tracks/" + rx.queue.soundobjs[0].track?.image}')` }}></div>
                            <div className="py-6 px-8 flex gap-4">
                                <img alt="image" className="w-[128px] h-[128px] rounded-xl bg-cover object-cover bg-no-repeat" src={baseUrl + "Images/Tracks/" + rx.queue.soundobjs[0].track?.image} />
                                <div className="flex flex-col gap-2">
                                    <h1 className="text-2xl font-semibold font-['Lexend']">{rx.queue.soundobjs[0].track?.name}</h1>
                                    {
                                        rx.queue.soundobjs[0].trackCreators ?
                                            <p className="text-medium text-xl">{rx.queue.soundobjs[0].trackCreators[0]}</p>
                                            :
                                            <p className="text-medium text-lg">Unknown</p>
                                    }
                                </div>
                                <div className="flex items-end ml-[64px]">
                                    <h1 className="text-xl font-semibold animate-pulse">Current</h1>
                                </div>
                            </div>
                        </div>
                        {
                            rx.queue.soundobjs.length === 1 ?
                                <h1 className="font-semibold text-3xl">Queue is empty</h1>
                                :
                                <div>
                                    <h1 className="select-none text-3xl font-semibold">In Queue</h1>
                                </div>
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