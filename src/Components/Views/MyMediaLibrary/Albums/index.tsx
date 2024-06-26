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
import { DefaultButton } from "../../../Commons/Buttons/DefaultButton";

export const MyMediaLibraryAlbums: React.FC = () => {
    const nav = useNavigate();
    const { getMyMediaLibraryAlbums, addMyMediaLibraryAlbums, clearTracks, initSelectAlbum } = useActions();
    const rx = useTypedSelector(state => state.myMediaLibraryReducer);
    const albums = useTypedSelector(state => state.myMediaLibraryReducer.albums);
    const user = useTypedSelector(state => state.userReducer.profile);
    const { t } = useTranslation();
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
                await getMyMediaLibraryAlbums(rq);
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
            await addMyMediaLibraryAlbums(rq);
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
        <div className="w-full h-full flex flex-col justify-start items-center py-8 gap-12 relative">
            <Helmet>
                <title>Soundwave | MyMediaLibraryAlbums</title>
            </Helmet>
            {
                albums && rx.error.length === 0 ?
                    <div className="w-full flex flex-col items-center gap-20">
                        <div className="grid grid-cols-4 mm:grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-16">
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
                        <FontAwesomeIcon className="text-7xl mt-[10vh] font-medium text-dark-200 dark:text-light-200" icon={faCompactDisc} />
                        <div className="flex flex-col items-center gap-8 text-dark-200 dark:text-light-200">
                            <div className="flex flex-col gap-3 items-center">
                                <h1 className="font-medium text-3xl mm:text-2xl text-center">{t("Save you first album")}</h1>
                                <p className="font-medium text-xl mm:text-lg text-center">{t("You can also login your account")}</p>
                            </div>
                            <div>
                                <DefaultButton onClick={() => { nav("/search") }} text={t("Save you first album")} />
                            </div>
                        </div>
                    </>
            }
        </div>
    );
};
