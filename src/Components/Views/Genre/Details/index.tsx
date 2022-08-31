import { faMusic } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Guid } from "guid-typescript";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useActions } from "../../../../Hooks/useActions";
import { useTypedSelector } from "../../../../Hooks/useTypedSelector";
import { IPagableMyPlaylistItem } from "../../../../Redux/Reducers/MyPlaylistReducer/types";
import { clearTracks } from "../../../../Redux/Reducers/PlayingReducer/actions";
import { DefaultButton } from "../../../Commons/Buttons/DefaultButton";
import { PlaylistItem } from "../../../Commons/PlaylistItem";

export const GenreDetails: React.FC = () => {
    const { name } = useParams();
    const nav = useNavigate();
    const { getAllGenrePlaylist, addGenrePlaylist, initSelectPlaylist } = useActions();
    const rx = useTypedSelector(state => state.genreReducer);
    const playlist = useTypedSelector(state => state.genreReducer.playlists);
    const user = useTypedSelector(state => state.userReducer.profile);
    const { t } = useTranslation();
    const scrollHadler = async () => {
        if (document.documentElement.scrollHeight - (document.documentElement.scrollTop + window.innerHeight) <= 0) {
            if (rx.nextPage && !rx.loading) {
                await FetchNext();
            }
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            if (name) {
                await getAllGenrePlaylist(name, 1);
            }
        }
        fetchData();
    }, [name]);
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
        if (rx.playlists && rx.nextPage && user && name) {
            await addGenrePlaylist(name, rx.nextPage);
        }
    }
    const onSelectPlaylist = async (item: IPagableMyPlaylistItem | null) => {
        if (item) {
            await clearTracks();
            await initSelectPlaylist(null);
            nav("/playlist/" + item?.playlistDto?.returnId);
        }
    }
    return (
        <div className="w-full h-full flex flex-col justify-start py-8 pl-[5%] pr-[2%] mm:px-2 items-center relative dark:text-light-200">
            <Helmet>
                <title>Soundwave | Genres Details</title>
            </Helmet>
            {
                playlist ?
                    <div className="w-full flex flex-col gap-5">
                        <h1 className="font-semibold text-5xl my-10 mm:my-2 mm:text-center">{name}</h1>
                        <div className="flex items-center gap-[18px] mm:gap-[12px] flex-wrap">
                            {
                                playlist?.map(item => {
                                    return (
                                        <PlaylistItem key={Guid.create().toString()} onClick={() => { onSelectPlaylist(item) }} name={item.playlistDto?.name} imageSrc={item.playlistDto?.image} title={`${item.songs} songs`} />
                                    )
                                })
                            }
                        </div>
                    </div>
                    :
                    !rx.loading &&
                    <div className="flex flex-col gap-6 w-full h-full pt-[10%]">
                        <FontAwesomeIcon className="text-7xl mt-[10vh] font-medium text-dark-200 dark:text-light-200" icon={faMusic} />
                        <div className="flex flex-col items-center gap-8 text-dark-200 dark:text-light-200">
                            <div className="flex flex-col gap-3 items-center dark:text-light-200">
                                <h1 className="font-medium text-3xl mm:text-xl">{t("No playlists found in genre")} '{name}'</h1>
                                <p className="font-medium text-xl mm:text-base">{t("You can also search your favorite playlists")}</p>
                            </div>
                            <div>
                                <DefaultButton onClick={() => { nav("/search") }} text={t("Search playlists")} />
                            </div>
                        </div>
                    </div>

            }
        </div>
    )
}