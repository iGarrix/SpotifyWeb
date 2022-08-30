import { faCompactDisc } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Guid } from "guid-typescript";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useActions } from "../../../../Hooks/useActions";
import { useTypedSelector } from "../../../../Hooks/useTypedSelector";
import { IGetAllMyAlbumRequest, IPagableMyAlbumItem } from "../../../../Redux/Reducers/MyAlbumReducer/types";
import { AlbumItem } from "../../../Commons/AlbumItem";

export const OverviewProfileAlbums: React.FC = () => {
    const nav = useNavigate();
    const { t } = useTranslation();
    const { getMyAlbum, addMyAlbum, clearTracks, initSelectAlbum } = useActions();
    const rx = useTypedSelector(state => state.myAlbumsReducer);
    const albums = useTypedSelector(state => state.myAlbumsReducer.albums);
    const user = useTypedSelector(state => state.userReducer.overviewer);
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
                const rq: IGetAllMyAlbumRequest = {
                    email: user.email,
                    page: 1
                }
                await getMyAlbum(rq);
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
        if (rx.albums && rx.nextPage && user) {
            const rq: IGetAllMyAlbumRequest = {
                email: user?.email,
                page: rx.nextPage,
            }
            await addMyAlbum(rq);
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
        <div className="w-full h-full flex flex-col justify-start py-8 items-center gap-12 relative mm:w-full sm:w-full md:w-full">
            <Helmet>
                <title>Soundwave | Albums</title>
            </Helmet>
            {
                    albums && rx.error.length === 0 ?
                        <div className="w-full flex flex-col items-center gap-20">
                            <div className="grid grid-cols-4 mm:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-16">
                                {
                                    albums.map(item => {
                                        return (
                                            <AlbumItem key={Guid.create().toString()} onClick={() => { onSelectAlbum(item) }} name={item.albomDto?.name} title={`${item.songs} songs`} imageSrc={item.albomDto?.image} />
                                        )
                                    })
                                }
                            </div>
                        </div>
                        :          
                        <>
                            <hr className="w-full" />
                            <div className="flex flex-col items-center gap-6">
                                <FontAwesomeIcon className="text-7xl font-medium text-dark-200 dark:text-light-200" icon={faCompactDisc} />
                                <h1 className="font-medium text-2xl text-dark-200 dark:text-light-200">{t("Albums not found")}</h1> 
                            </div>
                        </>
            }
        </div>
    )
}