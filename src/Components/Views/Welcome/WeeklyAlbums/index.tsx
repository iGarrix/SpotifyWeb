import { faCompactDisc } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Guid } from "guid-typescript";
import React, { useEffect, useTransition } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { useActions } from "../../../../Hooks/useActions";
import { useTypedSelector } from "../../../../Hooks/useTypedSelector";
import { IPagableMyAlbumItem } from "../../../../Redux/Reducers/MyAlbumReducer/types";
import { baseUrl, StorageVariables } from "../../../../types";
import { DefaultButton } from "../../../Commons/Buttons/DefaultButton";
import { AlbumCard } from "../../../Commons/Cards/AlbumCard";

export const WeeklyAlbums: React.FC = () => {

    const { getMainAlbums, addMainAlbums, clearTracks, initSelectAlbum } = useActions();
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
                await getMainAlbums(page);
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
        if (mainReducer.albums && mainReducer.nextPage) {
            await addMainAlbums(mainReducer.nextPage);
        }
    }

    const onSelectAlbum = async (item: IPagableMyAlbumItem | null) => {
        if (item) {
            await clearTracks();
            await initSelectAlbum(null);
            nav("/album/" + item?.albomDto?.returnId);
        }
    }

    return (
        <div className="w-full h-full flex flex-col justify-start py-8 px-12 items-center relative">
            <Helmet>
                <title>Soundwawe | Top albums</title>
            </Helmet>
            {
                mainReducer.albums ?
                    <div className="w-full h-full flex flex-col gap-5 z-10">
                        <h1 className="font-semibold text-2xl">Weekly albums</h1>
                        <div className="flex items-center gap-6 flex-wrap">
                            {
                                mainReducer.albums.map(item => {
                                    return (
                                        <AlbumCard key={Guid.create().toString()}
                                            name={item.albomDto ? item.albomDto?.name.substring(0, 12) + `${item.albomDto.name.length >= 12 ? "..." : ""}` : "Unknown"}
                                            songs={item.songs}
                                            image={baseUrl + "Images/AlbomImages/" + item.albomDto?.image} onClick={() => { onSelectAlbum(item) }} />

                                    )
                                })
                            }
                        </div>
                    </div>
                    :
                    <div className="flex flex-col items-center justify-center w-full gap-5 h-full">
                        <FontAwesomeIcon className="text-7xl font-medium text-dark-200" icon={faCompactDisc} />
                        <div className="flex flex-col items-center gap-8 text-dark-200">
                            <div className="flex flex-col gap-3 items-center">
                                <h1 className="font-medium text-3xl">Weekly albums not found</h1>
                                <p className="font-medium text-xl">You can jump to soundwave page</p>
                            </div>
                            <div>
                                <DefaultButton onClick={() => { nav("/") }} text={"Jump"} />
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}