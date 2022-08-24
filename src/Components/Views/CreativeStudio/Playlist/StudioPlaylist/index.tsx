import { faPlus, faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Guid } from "guid-typescript";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { useActions } from "../../../../../Hooks/useActions";
import { useTypedSelector } from "../../../../../Hooks/useTypedSelector";
import { IGetAllMyPlaylistRequest, IPagableMyPlaylistItem, IPlaylistFindRequest } from "../../../../../Redux/Reducers/MyPlaylistReducer/types";
import { CreatePlaylistItem } from "../../../../Commons/Cards/CreativeStudioCards/PlaylistCard";
import { FullScreenModal } from "../../../../Commons/Modals/FullScreenModal";
import { ChangePlaylistModal } from "../../../../Commons/Modals/FullScreenModal/ChangePlaylistModal";
import { CreatePlaylistModal } from "../../../../Commons/Modals/FullScreenModal/CreatePlaylistModal";

export const StudioPlaylist: React.FC = () => {
    const { getMyPlaylists, addMyPlaylists, removePlaylist, clearTracks } = useActions();
    const rx = useTypedSelector(state => state.myPlaylistReducer);
    const playlists = useTypedSelector(state => state.myPlaylistReducer.playlists);
    const user = useTypedSelector(state => state.userReducer.profile);
    const nav = useNavigate();
    const [openModal, setOpenModal] = useState(false);
    const [selectedPlaylist, setselectedPlaylist] = useState<any>(null);
    const [createPlaylist, setcreatePlaylist] = useState<any>(null);
    const [openModal2, setOpenModal2] = useState(false);
    const scrollHadler = async () => {
        if (document.documentElement.scrollHeight - (document.documentElement.scrollTop + window.innerHeight) <= 0) {
            if (rx.nextPage && !rx.loading) {
                const top = document.documentElement.scrollTop;
                await FetchNext();
                document.documentElement.scrollTop = top;
            }
        }
    }
    const fetchData = async () => {
        if (user && !openModal) {
            const rq: IGetAllMyPlaylistRequest = {
                email: user.email,
                page: 1
            }
            await getMyPlaylists(rq);
        }
    }
    useEffect(() => {
        fetchData();
    }, [user, openModal, openModal2]);

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

    const onSelectPlaylist = (item: IPagableMyPlaylistItem | null) => {
        if (item) {
            clearTracks();
            nav("overviewplaylist/" + item.playlistDto?.returnId);
        }
    }

    const onEditPlaylist = (item: IPagableMyPlaylistItem | null) => {
        if (item) {
            setselectedPlaylist(item);
            setOpenModal(true);
        }
    }

    const onCreatePlaylist = () => {
        setcreatePlaylist(true);
        setOpenModal2(true);
    }

    const onRemovePlaylist = async (item: IPagableMyPlaylistItem | null) => {
        try {
            if (item && item.playlistCreator && item.playlistDto) {
                var request: IPlaylistFindRequest = {
                    findPlaylistName: item.playlistDto?.name,
                    findPlaylistCreatorEmail: item.playlistCreator.email,
                };
                await removePlaylist(request);
                if (user) {
                    const rq: IGetAllMyPlaylistRequest = {
                        email: user.email,
                        page: 1
                    }
                    await getMyPlaylists(rq);
                }
            }
        } catch (error) {
        }
    };

    const onSaveChanges = async () => {
        setOpenModal(false);
        await fetchData();
    }

    const onCloseModal = () => {
        setOpenModal(false);
    }

    const onSaveChanges2 = async () => {
        setOpenModal2(false);
        await fetchData();
    }

    const onCloseModal2 = () => {
        setOpenModal2(false);
    }

    return (
        <div className="w-full px-[3%] py-[2%] flex flex-col gap-6 items-start text-dark-200 dark:text-light-100 bg-no-repeat h-full">
            <Helmet>
                <title>Soundwave | Manage Playlist</title>
            </Helmet>
            {
                selectedPlaylist && openModal ?
                    <FullScreenModal visible center>
                        <ChangePlaylistModal playlist={selectedPlaylist} onSave={onSaveChanges} onClose={onCloseModal} />
                    </FullScreenModal> : null
            }
            {
                createPlaylist && openModal2 ?
                    <FullScreenModal visible center>
                        <CreatePlaylistModal  onSave={onSaveChanges2} onClose={onCloseModal2} />
                    </FullScreenModal> : null
            }
            <div className="flex flex-col gap-8 w-full h-full">
                <h1 className="font-semibold text-2xl mm:text-center mm:mt-4">Create new Playlist</h1>
                <div className="flex items-center cursor-pointer rounded-md justify-center w-[112px] h-[112px] bg-light-300 dark:bg-dark-200 transition-all hover:bg-dark-200/40 dark:hover:bg-dark-100" onClick={() => onCreatePlaylist()}>
                    <FontAwesomeIcon className="text-white text-[64px]" icon={faPlus} />
                </div>
                <div className="flex flex-col gap-10 mm:gap-4 w-full">
                    {
                            playlists && rx.error.length === 0 ?
                                playlists?.map(item => {
                                    return (
                                        <div key={Guid.create().toString()} className="grid grid-cols-12 w-full">
                                            <div className="col-span-12 w-full">
                                                <CreatePlaylistItem
                                                    onClick={() => onSelectPlaylist(item)}
                                                    image={item.playlistDto?.image}
                                                    name={item.playlistDto?.name}
                                                    date={item.playlistDto?.create}
                                                    type={item.playlistDto?.accessStatus}
                                                    listening={item.playlistDto?.views}
                                                    onEdit={() => onEditPlaylist(item)}
                                                    onDelete={async () => await onRemovePlaylist(item)} />
                                            </div>
                                        </div>
                                    )
                                })
                                :
                                <>
                                    <FontAwesomeIcon className="text-7xl font-medium text-dark-200 dark:text-light-200" icon={faSquarePlus} />
                                    <div className="flex flex-col items-center gap-8 text-dark-200 dark:text-light-200">
                                        <div className="flex flex-col gap-3 items-center">
                                            <h1 className="font-medium text-3xl text-center">Create you first playlist</h1>
                                            <p className="font-medium text-xl text-center">You can also upload a new single or album</p>
                                        </div>
                                    </div>
                                </>
                    }
                </div>
            </div>
        </div>
    );
};