import { faMusic } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Guid } from "guid-typescript";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { AddToHistory, SetPlayingTrack } from "../../../../Helpers/QueueHelper";
import { useActions } from "../../../../Hooks/useActions";
import { useTypedSelector } from "../../../../Hooks/useTypedSelector";
import { IGetAllMySingleRequest } from "../../../../Redux/Reducers/MySingleReducer/types";
import { ITrackResponse } from "../../../../Redux/Reducers/PlayingReducer/types";
import { DefaultButton } from "../../../Commons/Buttons/DefaultButton";
import { SoundItem } from "../../../Commons/Cards/SoundItem";
import { QuadraticLoader } from "../../../Commons/Loaders/QuadraticLoader";

export const MyMediaLibrarySingle: React.FC = () => {
  const { getMyMediaLibrarySingle, addMyMediaLibrarySingle, initQueue } = useActions();
  const rx = useTypedSelector(state => state.myMediaLibraryReducer);
  const singles = useTypedSelector(state => state.myMediaLibraryReducer.singles);
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
                            <FontAwesomeIcon className="text-7xl font-medium text-dark-200" icon={faMusic} />
                            <div className="flex flex-col items-center gap-8 text-dark-200">
                                <div className="flex flex-col gap-3 items-center">
                                    <h1 className="font-medium text-3xl">Save you first single song</h1>
                                    <p className="font-medium text-xl">You can also login your account</p>
                                </div>
                                <div>
                                    <DefaultButton onClick={() => { nav("/search") }} text={"Save you first single song"} />
                                </div>
                            </div>
                        </>
            }
    </div>
  );
};
function nav(arg0: string) {
  throw new Error("Function not implemented.");
}

