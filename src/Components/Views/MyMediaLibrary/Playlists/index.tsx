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
import { QuadraticLoader } from "../../../Commons/Loaders/QuadraticLoader";
import { PlaylistItem } from "../../../Commons/PlaylistItem";

export const MyMediaLibraryPlaylists: React.FC = () => {
  const nav = useNavigate();
    const { getMyMediaLibraryPlaylists, addMyMediaLibraryPlaylists, clearTracks, initSelectPlaylist } = useActions();

    const rx = useTypedSelector(state => state.myMediaLibraryReducer);
    const playlists = useTypedSelector(state => state.myMediaLibraryReducer.playlists);
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
                await getMyMediaLibraryPlaylists(rq);
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
            await addMyMediaLibraryPlaylists(rq);
        }
    }

    const onSelectPlaylist = async (item: IPagableMyPlaylistItem | null) => {
        if (item) {
            await clearTracks();
            await initSelectPlaylist(null);
            if (item.playlistCreator?.username === user?.username) {
                nav({
                    pathname: "/playlist/" + item?.playlistDto?.returnId,
                }); 
            }
            else {
                nav("/playlist/" + item?.playlistDto?.returnId);
            }
        }
    }
  return (
    <div className="w-full h-full flex flex-col justify-start items-center py-8 gap-12 relative">
      <Helmet>
        <title>Soundwave | MyMediaLibraryPlaylists</title>
      </Helmet>
      {
                rx.loading ?
                    <QuadraticLoader isVisisble={true} />
                    :
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
                            <FontAwesomeIcon className="text-7xl font-medium text-dark-200" icon={faSquarePlus} />
                            <div className="flex flex-col items-center gap-8 text-dark-200">
                                <div className="flex flex-col gap-3 items-center">
                                    <h1 className="font-medium text-3xl">Save you first playlist</h1>
                                    <p className="font-medium text-xl">You can also login your account</p>
                                </div>
                                <div>
                                    <DefaultButton onClick={() => { nav("/search") }} text={"Save you first playlist"} />
                                </div>
                            </div>
                        </>
            }
    </div>
  );
};
