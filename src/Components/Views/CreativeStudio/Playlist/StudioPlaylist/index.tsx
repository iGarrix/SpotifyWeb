import { faPlus, faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Guid } from "guid-typescript";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { useActions } from "../../../../../Hooks/useActions";
import { useTypedSelector } from "../../../../../Hooks/useTypedSelector";
import { IGetAllMyPlaylistRequest, IPagableMyPlaylistItem, IPlaylistFindRequest } from "../../../../../Redux/Reducers/MyPlaylistReducer/types";
import { DefaultButton } from "../../../../Commons/Buttons/DefaultButton";
import { CreatePlaylistItem } from "../../../../Commons/Cards/CreativeStudioCards/PlaylistCard";
import { QuadraticLoader } from "../../../../Commons/Loaders/QuadraticLoader";
import { FullScreenModal } from "../../../../Commons/Modals/FullScreenModal";
import { ChangePlaylistModal } from "../../../../Commons/Modals/FullScreenModal/ChangePlaylistModal";

export const StudioPlaylist: React.FC = () => {
    const { getMyPlaylists, addMyPlaylists, removePlaylist } = useActions();
    const rx = useTypedSelector(state => state.myPlaylistReducer);
    const playlists = useTypedSelector(state => state.myPlaylistReducer.playlists);
    const user = useTypedSelector(state => state.userReducer.profile);
    const nav = useNavigate();
    const [openModal, setOpenModal] = useState(false);
    const [selectedPlaylist, setselectedPlaylist] = useState<any>(null);
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
            if (user && !openModal) {
                const rq: IGetAllMyPlaylistRequest = {
                    email: user.email,
                    page: 1
                }
                await getMyPlaylists(rq);
            }
        }
        fetchData();
    }, [user, openModal]);

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
            nav("overviewplaylist/" + item.playlistDto?.returnId);
        }
    }

    const onEditPlaylist = (item: IPagableMyPlaylistItem | null) => {
        if (item) {
            setselectedPlaylist(item);
            setOpenModal(true);
        }
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

    const onSaveChanges = () => {
        setOpenModal(false);
    }
    const onCloseModal = () => {
        setOpenModal(false);
    }
    return (
        <div className="w-full px-[3%] py-[2%] flex flex-col gap-6 items-start text-dark-200 bg-no-repeat h-full">
            <Helmet>
                <title>Soundwave | Manage Playlist</title>
            </Helmet>
            {
                selectedPlaylist && openModal ?
                    <FullScreenModal visible center>
                        <ChangePlaylistModal playlist={selectedPlaylist} onSave={onSaveChanges} onClose={onCloseModal} />
                    </FullScreenModal> : null
            }
            <div className="flex flex-col gap-8 w-full h-full">
                <h1 className="font-semibold text-2xl">Create new Playlist</h1>
                <div className="flex items-center justify-center w-[96px] h-[96px] bg-light-200">
                    <FontAwesomeIcon onClick={() => { console.log("first") }} className="text-white text-[64px]" icon={faPlus} />
                </div>
                <div className="flex flex-col gap-10 w-full">
                    {
                        rx.loading ?
                            <div className="w-full h-full flex justify-center items-center">

                                <QuadraticLoader isVisisble={true} />
                            </div>
                            :
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
                                                    listening={10000}
                                                    onEdit={() => onEditPlaylist(item)}
                                                    onDelete={async () => await onRemovePlaylist(item)} />
                                            </div>
                                        </div>
                                    )
                                })
                                :
                                <>
                                    <FontAwesomeIcon className="text-7xl font-medium text-dark-200" icon={faSquarePlus} />
                                    <div className="flex flex-col items-center gap-8 text-dark-200">
                                        <div className="flex flex-col gap-3 items-center">
                                            <h1 className="font-medium text-3xl">Create you first playlist</h1>
                                            <p className="font-medium text-xl">You can also apply to verify your account</p>
                                        </div>
                                        <div>
                                            <DefaultButton onClick={() => { nav("/createplaylist") }} text={"Create you first playlist"} />
                                        </div>
                                    </div>
                                </>
                    }
                </div>
            </div>
        </div>
    );
};