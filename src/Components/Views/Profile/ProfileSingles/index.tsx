import { faMusic } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Guid } from "guid-typescript";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { AddToHistory, SetPlayingTrack } from "../../../../Helpers/QueueHelper";
import { useActions } from "../../../../Hooks/useActions";
import { useTypedSelector } from "../../../../Hooks/useTypedSelector";
import { IGetAllMySingleRequest } from "../../../../Redux/Reducers/MySingleReducer/types";
import { ITrackResponse } from "../../../../Redux/Reducers/SelectAlbumReducer/types";
import { DefaultButton } from "../../../Commons/Buttons/DefaultButton";
import { SoundItem } from "../../../Commons/Cards/SoundItem";
import { QuadraticLoader } from "../../../Commons/Loaders/QuadraticLoader";

export const ProfileSingles: React.FC = () => {
    const nav = useNavigate();
    const { getMySingle, addMySingle, initQueue } = useActions();
    const rx = useTypedSelector(state => state.mySingleReducer);
    const singles = useTypedSelector(state => state.mySingleReducer.singles);
    const user = useTypedSelector(state => state.userReducer.profile);
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
    return (
        <div className="w-full h-full flex flex-col justify-center items-center py-8 gap-12 relative">
            <Helmet>
                <title>Soundwave | My Singles</title>
            </Helmet>
            {
                rx.loading ?
                    <QuadraticLoader isVisisble={true} />
                    :
                    singles && rx.error.length === 0 ?
                        <div className="w-full h-full flex flex-col gap-[18px] px-[330px]">
                            {
                                singles.map(item => {
                                    return (
                                        <SoundItem key={Guid.create().toString()}
                                            onClick={() => { onSelectTrack(item) }}
                                            isPlay={playingReducer.queue && item.track ? playingReducer.queue.soundobjs[0].track?.returnId === item.track.returnId && playingReducer.queue?.isPlay : false}
                                            isLiked={false} item={item}
                                        />
                                    )
                                })
                            }
                        </div>
                        :
                        <>
                            <FontAwesomeIcon className="text-7xl font-medium" icon={faMusic} />
                            <div className="flex flex-col items-center gap-8">
                                <div className="flex flex-col gap-3 items-center">
                                    <h1 className="font-medium text-3xl">Create you first single song</h1>
                                    <p className="font-medium text-xl">You can also apply to verify your account as an artist</p>
                                </div>
                                <div>
                                    <DefaultButton onClick={() => { nav("/upload") }} text={"Upload you first single song"} />
                                </div>
                            </div>
                        </>
            }

        </div>
    )
}