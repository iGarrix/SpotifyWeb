import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Guid } from "guid-typescript";
import React, { useEffect, useTransition } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useActions } from "../../../../Hooks/useActions";
import { useTypedSelector } from "../../../../Hooks/useTypedSelector";
import { PlaylistItem } from "../../../Commons/PlaylistItem";

export const PlaylistResult: React.FC = () => {
    const nav = useNavigate();
    const { getAllSearchPlaylist, addAllSearchPlaylist, initSelectPlaylist, clearTracks } = useActions();
    const rx = useTypedSelector(state => state.searchReducer);
    const [searchParams, setSearchParams] = useSearchParams();
    const { t } = useTranslation();
    const user = useTypedSelector(state => state.userReducer.profile);
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
                await getAllSearchPlaylist(query, 1);
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
        if (rx.playlists && rx.nextPage && query) {
            await addAllSearchPlaylist(query, rx.nextPage);
        }
    }
    const onSelectPlaylist = async (id: string | null, username: string | any) => {
        if (id && username) {
            await clearTracks();
            await initSelectPlaylist(null);
            if (user?.username === username) {
                nav({
                    pathname: "/playlist/" + id,
                });
            }
            else {
                nav("/playlist/" + id);
            }
        }
    }
    return (
        <div className="w-full h-full flex flex-col justify-start items-center relative">
            <Helmet>
                <title>Soundwave | Search Playlists</title>
            </Helmet>
            {
                rx.playlists && rx.playlists.length > 0 ?
                    <div className="w-full flex flex-col gap-5">
                        <h1 className="font-semibold text-2xl">{t("Playlist All")}</h1>
                        <div className="flex gap-6 mm:gap-[10px] flex-wrap">
                            {
                                rx.playlists?.map(item => {
                                    return (
                                        <PlaylistItem key={Guid.create().toString()} name={item.name.substring(0, 12)} title={item.creator.username} imageSrc={item.image} onClick={() => { onSelectPlaylist(item.id, item.creator.username) }} />
                                    )
                                })
                            }
                        </div>
                    </div>
                    :
                    <div className="flex flex-col gap-6">
                        <FontAwesomeIcon className="text-7xl mm:text-5xl sm:text-5xl md:text-6xl font-medium text-dark-200 dark:text-light-200" icon={faSquarePlus} />
                        <div className="flex flex-col items-center gap-8 text-dark-200 dark:text-light-200">
                            <div className="flex flex-col gap-3 items-center">
                                <h1 className="font-medium text-3xl  mm:text-xl sm:text-xl md:text-2xl dark:text-light-200">{t("Playlist not found")}</h1>
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}