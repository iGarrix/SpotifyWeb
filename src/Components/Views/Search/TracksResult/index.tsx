import { faMusic } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Guid } from "guid-typescript";
import React, { useEffect, useTransition } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AddToHistory, SetPlayingTrack } from "../../../../Helpers/QueueHelper";
import { useActions } from "../../../../Hooks/useActions";
import { useTypedSelector } from "../../../../Hooks/useTypedSelector";
import { ITrackResponse } from "../../../../Redux/Reducers/PlayingReducer/types";
import { SoundItem } from "../../../Commons/Cards/SoundItem";

export const TracksResult : React.FC = () => {
    const nav = useNavigate();
    const { getAllSearchTrack, addAllSearchTrack, initQueue} = useActions();
    const rx = useTypedSelector(state => state.searchReducer);
    const [searchParams, setSearchParams] = useSearchParams();
    const playingReducer = useTypedSelector(state => state.playingReducer);
    const [isPending, startTransition] = useTransition();
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
        const query = searchParams.get('query');
        if (query) {
            const fetchData = async () => {
                await getAllSearchTrack(query, 1);
            }
            startTransition(() => {          
                fetchData();
            });
            const addNew = async () => {
                if (document.documentElement.scrollTop === 0) {
                    await FetchNext();
                }
            }
            startTransition(() => {         
                addNew();
            });
        }
    }, [searchParams]);
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
        const query = searchParams.get('query');
        if (rx.tracks && rx.nextPage && query) {
            await addAllSearchTrack(query, rx.nextPage);
        }
    }
    const onSelectInstanceTrack = (item: ITrackResponse | null | any) => {
        const response = SetPlayingTrack(item);
        if (response) {
            initQueue(response);
            AddToHistory(item);
        }
    }
    return (
        <div className="w-full h-full flex flex-col justify-start items-center relative">
            <Helmet>
                <title>Soundwave | Search Tracks</title>
            </Helmet>
            {
                rx.tracks && rx.tracks.length > 0 ?
                    <div className="w-full flex flex-col gap-5">
                        <h1 className="font-semibold text-2xl">Tracks All</h1>
                        <div className="flex flex-col gap-[15px] flex-wrap">
                                {
                                    rx.tracks?.map(item => {
                                        return (
                                            <SoundItem key={Guid.create().toString()}
                                                onClick={() => { onSelectInstanceTrack(item) }}
                                                isPlay={playingReducer.queue && item.track ? playingReducer.queue.soundobjs[playingReducer.queue.playedIndex].track?.returnId === item.track.returnId && playingReducer.queue?.isPlay : false}
                                                isLiked={false} item={item}
                                            />
                                        )
                                    })
                                }
                        </div>
                    </div>
                    :
                    <div className="flex flex-col gap-6">
                        <FontAwesomeIcon className="text-7xl font-medium text-dark-200" icon={faMusic} />
                        <div className="flex flex-col items-center gap-8 text-dark-200">
                            <div className="flex flex-col gap-3 items-center">
                                <h1 className="font-medium text-3xl">Tracks not found</h1>
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}
