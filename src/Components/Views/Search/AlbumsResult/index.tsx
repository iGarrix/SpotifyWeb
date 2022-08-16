import { faCompactDisc } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Guid } from "guid-typescript";
import React, { useEffect, useTransition } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useActions } from "../../../../Hooks/useActions";
import { useTypedSelector } from "../../../../Hooks/useTypedSelector";
import { AlbumItem } from "../../../Commons/AlbumItem";

export const AlbumsResult : React.FC = () => {
    const nav = useNavigate();
    const { getAllSearchAlbum, addAllSearchAlbum, initSelectAlbum, clearTracks} = useActions();
    const rx = useTypedSelector(state => state.searchReducer);
    const [searchParams, setSearchParams] = useSearchParams();
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
                await getAllSearchAlbum(query, 1);
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
        if (rx.albums && rx.nextPage && query) {
            await addAllSearchAlbum(query, rx.nextPage);
        }
    }
    const onSelectAlbum = async (id: string | null) => {
        if (id) {
            await clearTracks();
            await initSelectAlbum(null);
            nav("/album/" + id);
        }
    }
    return (
        <div className="w-full h-full flex flex-col justify-start items-center relative">
            <Helmet>
                <title>Soundwave | Search Albums</title>
            </Helmet>
            {
                rx.albums && rx.albums.length > 0 ?
                    <div className="w-full flex flex-col gap-5">
                        <h1 className="font-semibold text-2xl">Albums All</h1>
                        <div className="flex gap-[15px] mm:gap-[10px] flex-wrap">
                            {
                                rx.albums?.map(item => {
                                    return (
                                        <AlbumItem key={Guid.create().toString()} name={item.name} imageSrc={item.image} onClick={() => { onSelectAlbum(item.id) } } title={item.creators.map(i => i.username)[0]} />
                                    )
                                })
                            }
                        </div>
                    </div>
                    :
                    <div className="flex flex-col gap-6">
                        <FontAwesomeIcon className="text-7xl mm:text-5xl sm:text-5xl md:text-6xl font-medium text-dark-200 dark:text-light-200" icon={faCompactDisc} />
                        <div className="flex flex-col items-center gap-8 text-dark-200 dark:text-light-200">
                            <div className="flex flex-col gap-3 items-center">
                                <h1 className="font-medium text-3xl mm:text-xl sm:text-xl md:text-2xl dark:text-light-200">Albums not found</h1>
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}