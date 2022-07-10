import { faMusic } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Guid } from "guid-typescript";
import React, { useEffect, useTransition } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { useActions } from "../../../../Hooks/useActions";
import { useTypedSelector } from "../../../../Hooks/useTypedSelector";
import { baseUrl, defaultAvatarImage, defaultBackgroundImage, GetUserAvatar } from "../../../../types";
import { DefaultButton } from "../../../Commons/Buttons/DefaultButton";
import { SoundItem } from "../../../Commons/Cards/SoundItem";

export const WeeklyArtist: React.FC = () => {

    const { getMainArtist, addMainArtist } = useActions();
    const mainReducer = useTypedSelector(state => state.mainReducer);
    const [isPending, startTransition] = useTransition();
    const nav = useNavigate();

    const scrollHadler = async () => {
        if (document.documentElement.scrollHeight - (document.documentElement.scrollTop + window.innerHeight) <= 0) {
            if (mainReducer.nextPage && !mainReducer.loading) {
                await FetchNext();
            }
        }
    }

    useEffect(() => {

        startTransition(() => {
            const initLocalAsync = async (page: number) => {
                await getMainArtist(page);
            }
            initLocalAsync(1);
            const addNew = async () => {
                if (document.documentElement.scrollTop === 0) {
                    await FetchNext();
                }
            }
            addNew();
        })
        document.documentElement.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const listener = () => {
            document.addEventListener("scroll", scrollHadler);
        }
        listener();

        return function () {
            document.removeEventListener("scroll", scrollHadler);
        }

    }, [mainReducer.nextPage && mainReducer.loading])

    const FetchNext = async () => {
        if (mainReducer.artists && mainReducer.nextPage) {
            await addMainArtist(mainReducer.nextPage);
        }
    }

    // const onSelectAlbum = async (item: IPagableMyAlbumItem | null) => {
    //     if (item) {
    //         localStorage.setItem(StorageVariables.Album, JSON.stringify(item));
    //         nav("/album/" + item?.albomDto?.returnId);
    //         await clearTracks();
    //     }
    // }

    return (
        <div className="w-full h-full flex flex-col justify-start py-8 px-12 items-center relative">
            <img alt="bg" src={defaultBackgroundImage} className="absolute top-0 left-0 w-full h-full bg-repeat object-cover opacity-30" />
            <Helmet>
                <title>Soundwawe | Top artist</title>
            </Helmet>
            {
                mainReducer.artists ?
                    <div className="w-full h-full flex flex-col gap-5 z-10">
                        <h1 className="font-semibold text-2xl">Weekly artists & creators</h1>
                        <div className="flex items-center gap-6 flex-wrap justify-between">
                            {
                                mainReducer.artists.map(item => {
                                    return (
                                        <div key={Guid.create().toString()} className="flex flex-col cursor-pointer text-dark-200 gap-1" onClick={() => { nav("/overview/" + item.username) }}>
                                          <img alt="artist" src={GetUserAvatar(item)}
                                            onError={(tg: any) => { tg.target.src = defaultAvatarImage }}
                                            className="w-[164px] h-[164px] bg-cover object-cover bg-no-repeat rounded-xl transition-all hover:shadow-xl" />
                                          <p className="text-center font-medium">{item.username}</p>
                                        </div>
                                      )
                                })
                            }
                        </div>
                    </div>
                    :
                    <div className="flex flex-col items-center justify-center w-full gap-5 h-full">
                        <FontAwesomeIcon className="text-7xl font-medium text-dark-200" icon={faMusic} />
                        <div className="flex flex-col items-center gap-8 text-dark-200">
                            <div className="flex flex-col gap-3 items-center">
                                <h1 className="font-medium text-3xl">Weekly creators not found</h1>
                                <p className="font-medium text-xl">You can jump to soundwave page</p>
                            </div>
                            <div>
                                <DefaultButton onClick={() => { nav("/") }} text={"Jump"} />
                            </div>
                        </div>
                    </div>
            }
            {/* <div className="w-full flex flex-col gap-5">
                <h1 className="font-semibold text-2xl">Weekly artists & creators</h1>
                <div className="flex items-center gap-6 flex-wrap justify-between">
                    
                </div>
            </div> */}
        </div>
    )
}