import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Guid } from "guid-typescript";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { useActions } from "../../../../Hooks/useActions";
import { useTypedSelector } from "../../../../Hooks/useTypedSelector";
import { IGetAllMyPlaylistRequest, IPagableMyPlaylistItem } from "../../../../Redux/Reducers/MyPlaylistReducer/types";
import { DefaultButton } from "../../../Commons/Buttons/DefaultButton";
import { PlaylistItem } from "../../../Commons/PlaylistItem";

export const ProfilePlaylists: React.FC = () => {
    const nav = useNavigate();
    const { getMyPlaylists, addMyPlaylists, clearTracks, initSelectPlaylist } = useActions();

    const rx = useTypedSelector(state => state.myPlaylistReducer);
    const playlists = useTypedSelector(state => state.myPlaylistReducer.playlists);
    const user = useTypedSelector(state => state.userReducer.profile);

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
                const rq: IGetAllMyPlaylistRequest = {
                    email: user.email,
                    page: 1
                }
                await getMyPlaylists(rq);
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
        if (rx.playlists && rx.nextPage && user) {
            const rq: IGetAllMyPlaylistRequest = {
                email: user?.email,
                page: rx.nextPage,
            }
            await addMyPlaylists(rq);
        }
    }

    const onSelectPlaylist = async (item: IPagableMyPlaylistItem | null) => {
        if (item) {
            await clearTracks();
            await initSelectPlaylist(null);
            nav({
                pathname: "/playlist/" + item?.playlistDto?.returnId,
                search: "?me=myplaylist"
            });
        }
    }
    return (
        <div className="w-full h-full flex flex-col justify-start py-8 items-center gap-12 relative text-dark-200">
            <Helmet>
                <title>Soundwave | My Playlist</title>
            </Helmet>
            {
                    playlists && rx.error.length === 0 ?
                        <div className="w-full flex flex-col items-center gap-20">
                            <div className="grid grid-cols-4 gap-16">
                                {
                                    playlists.map(item => {
                                        return (
                                            <PlaylistItem key={Guid.create().toString()} onClick={() => { onSelectPlaylist(item) }} name={item.playlistDto?.name} title={`${item.songs} songs`} imageSrc={item.playlistDto?.image} />
                                        )
                                    })
                                }
                            </div>
                        </div>
                        :
                        <>
                            <hr className="w-full" />
                            <div className="flex flex-col items-center gap-6">
                                <FontAwesomeIcon className="text-7xl font-medium text-dark-200" icon={faSquarePlus} />
                                <h1 className="font-medium text-2xl text-dark-200">Playlist not found</h1>
                                <DefaultButton onClick={() => { nav("/creativestudio") }} text={"Create you first playlist song"} />
                            </div>
                        </>
            }
        </div>
    )
}