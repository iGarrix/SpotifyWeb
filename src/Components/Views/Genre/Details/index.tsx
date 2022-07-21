import { faMusic } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Guid } from "guid-typescript";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from "react-router-dom";
import { useActions } from "../../../../Hooks/useActions";
import { useTypedSelector } from "../../../../Hooks/useTypedSelector";
import { IPagableMyPlaylistItem } from "../../../../Redux/Reducers/MyPlaylistReducer/types";
import { clearTracks } from "../../../../Redux/Reducers/PlayingReducer/actions";
import { StorageVariables } from "../../../../types";
import { DefaultButton } from "../../../Commons/Buttons/DefaultButton";
import { QuadraticLoader } from "../../../Commons/Loaders/QuadraticLoader";
import { PlaylistItem } from "../../../Commons/PlaylistItem";

export const GenreDetails: React.FC = () => {
    const { name } = useParams();
    const nav = useNavigate();
    const { getAllGenrePlaylist, addGenrePlaylist, initSelectPlaylist } = useActions();
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
    const onSelectPlaylist = async (item: IPagableMyPlaylistItem | null) => {
        if (item) {
            await clearTracks();
            await initSelectPlaylist(null);
            nav("/playlist/" + item?.playlistDto?.returnId);
        }
    }
    return (
        <div className="w-full h-full flex flex-col justify-start py-8 pl-[5%] pr-[2%] items-center relative">
            <Helmet>
                <title>Soundwave | Genres Details</title>
            </Helmet>
            {
                playlist ?
                    <div className="w-full flex flex-col gap-5">
                        <h1 className="font-semibold text-5xl my-10">{name}</h1>
                        <div className="w-full flex justify-between items-center">
                            <h1 className="font-medium text-2xl text-dark-200">Weekly top playlists</h1>
                        </div>
                        <div className="flex items-center gap-[18px] flex-wrap">
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
                    !rx.loading ?
                    <div className="flex flex-col gap-6 w-full h-full pt-[10%]">
                        <FontAwesomeIcon className="text-7xl font-medium text-dark-200" icon={faMusic} />
                        <div className="flex flex-col items-center gap-8 text-dark-200">
                            <div className="flex flex-col gap-3 items-center">
                                <h1 className="font-medium text-3xl">No playlists found in genre '{name}'</h1>
                                <p className="font-medium text-xl">You can also search your favorite playlists</p>
                                <p className="font-medium text-xl">"{rx.error}"</p>
                            </div>
                            <div>
                                <DefaultButton onClick={() => { nav("/search") }} text={"Search playlists"} />
                            </div>
                        </div>
                    </div> :
                    <div className="w-full h-full absolute top-0 left-0 bg-dark-200/60 flex justify-center items-center z-[8500]" >
                        <QuadraticLoader isVisisble={true} />
                    </div>

            }
        </div>
    )
}