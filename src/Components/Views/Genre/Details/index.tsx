import { Guid } from "guid-typescript";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from "react-router-dom";
import { useActions } from "../../../../Hooks/useActions";
import { useTypedSelector } from "../../../../Hooks/useTypedSelector";
import { PlaylistItem } from "../../../Commons/PlaylistItem";

export const GenreDetails: React.FC = () => {
    const { name } = useParams();
    const nav = useNavigate();
    const { getAllGenrePlaylist, addGenrePlaylist } = useActions();
    const rx = useTypedSelector(state => state.genreReducer);
    const playlist = useTypedSelector(state => state.genreReducer.playlists);
    const user = useTypedSelector(state => state.userReducer.profile);
    const scrollHadler = async () => {
        if (document.documentElement.scrollHeight - (document.documentElement.scrollTop + window.innerHeight) <= 0) {
            if (rx.nextPage && !rx.loading) {
                await FetchNext();
            }
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            if (user && name) {
                await getAllGenrePlaylist(name, 1);
            }
        }
        fetchData();
    }, [user, name]);
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
    // const onSelectGenre = async (item: IGenre | null) => {
    //     if (item) {
    //         nav(item?.name);
    //     }
    // }
    return (
        <div className="w-full h-full flex flex-col justify-start py-8 px-12 items-center relative">
            <Helmet>
                <title>Soundwave | Genres Details</title>
            </Helmet>
            <div className="w-full flex flex-col gap-5">
                <h1 className="font-semibold text-5xl my-10">{name}</h1>
                <div className="w-full flex justify-between items-center">
                    <h1 className="font-medium text-2xl text-dark-200">Weekly top playlists</h1>
                </div>
                <div className="flex items-center gap-6 flex-wrap justify-between">
                    {
                        playlist?.map(item => {
                            return (
                                <PlaylistItem key={Guid.create().toString()} onClick={() => { }} name={item.playlistDto?.name} imageSrc={item.playlistDto?.image} title={`${item.songs} songs`} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}