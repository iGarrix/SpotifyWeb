import { faImage, faMusic, faPen, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Guid } from "guid-typescript";
import React, { useEffect, useState, useTransition } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { AddToHistory, SetPlayingTrack } from "../../../../../Helpers/QueueHelper";
import { useActions } from "../../../../../Hooks/useActions";
import { useTypedSelector } from "../../../../../Hooks/useTypedSelector";
import { IChangePlaylistImageRequest, IPagableMyPlaylistItem, IRemoveTrackPlaylistRequest } from "../../../../../Redux/Reducers/MyPlaylistReducer/types";
import { IGetPlaylistTracksRequest, ITrackResponse } from "../../../../../Redux/Reducers/PlayingReducer/types";
import { baseUrl, defaultAvatarImage } from "../../../../../types";
import { SoundItemPlaylist } from "../../../../Commons/Cards/CreativeStudioCards/SoundItemPlaylist";
import { FullScreenModal } from "../../../../Commons/Modals/FullScreenModal";
import { ChangePlaylistModal } from "../../../../Commons/Modals/FullScreenModal/ChangePlaylistModal";

const icon_search = require('../../../../../Assets/Icons/Search.png');

export const OverViewPlaylist: React.FC = () => {
    const { id } = useParams();
    const { findPlaylist, updateImagePlaylist, getPlaylistTracks, clearTracks, removeTrackByPlaylist, } = useActions();
    const [openModal, setOpenModal] = useState(false);
    const rx = useTypedSelector(state => state.playingReducer);
    const playlist = useTypedSelector(state => state.playingReducer.playlist);
    const user = useTypedSelector(state => state.userReducer.profile);
    const nav = useNavigate();
    const scrollHadler = async () => {
        if (document.documentElement.scrollHeight - (document.documentElement.scrollTop + window.innerHeight) <= 0) {
            if (rx.nextPage && !rx.loading) {
                await FetchNext();
            }
        }
    }
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
        if (rx.tracks && rx.nextPage && id) {
            const rq: IGetPlaylistTracksRequest = {
                returnId: id,
                page: rx.nextPage,
            }
            await getPlaylistTracks(rq);
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            if (user && id) {
                await findPlaylist(id, true);
                document.documentElement.scrollTo(0, 0);
            }
        }
        fetchData();
    }, [user, id]);
    const onChangePlaylist = () => {
        setOpenModal(true);
    }
    const onSaveChanges = () => {
        setOpenModal(false);
    }
    const onCloseModal = () => {
        setOpenModal(false);
    }
    const onChangeImage = async (e: any) => {
        try {
            const file = e.target.files[0];
            if (user && file && playlist && playlist.playlistDto && playlist.playlistCreator) {
                const request: IChangePlaylistImageRequest = {
                    response: { findPlaylistCreatorEmail: playlist.playlistCreator?.email, findPlaylistName: playlist.playlistDto?.name },
                    image: file,
                }
                await updateImagePlaylist(request);
            }
        } catch (error) {

        }
    }
    useEffect(() => {
        const work = async () => {
            if (id) {
                if (!rx.tracks) {
                    const rq: IGetPlaylistTracksRequest = {
                        returnId: id,
                        page: 1,
                    }
                    await getPlaylistTracks(rq);           
                }
                return;
            }
            else {
                nav(-1);
            }
        }
        work();
    }, []);

    const onRemoveTrackPlaylist = async (item: IPagableMyPlaylistItem | null, trackId: any) => {
        try {
            if (item && item.playlistCreator && item.playlistDto && trackId) {
                var request: IRemoveTrackPlaylistRequest = {
                    playlistFind: {
                        findPlaylistName: item.playlistDto.name,
                        findPlaylistCreatorEmail: item.playlistCreator.email,
                    },
                    trackId: trackId,
                };
                await removeTrackByPlaylist(request);
                clearTracks();
                if (id) {
                    const rq: IGetPlaylistTracksRequest = {
                        returnId: id,
                        page: 1,
                    }
                    await getPlaylistTracks(rq);
                }

            }
        } catch (error) {
        }
    };

    return (
        <div className="w-full px-[3%] py-[2%] flex flex-col gap-6 items-start text-dark-200 bg-no-repeat h-full">
            <Helmet>
                <title>Soundwave | Manage Playlist</title>
            </Helmet>
            {
                playlist && openModal ?
                    <FullScreenModal visible center>
                        <ChangePlaylistModal playlist={playlist} onSave={onSaveChanges} onClose={onCloseModal} />
                    </FullScreenModal> : null
            }
            <div className="w-full flex py-[50px] px-[150px] gap-[32px]">
                {
                    playlist ?
                        <div className="w-64 h-64 relative overflow-hidden rounded-xl">
                            <div className="w-full h-full transition-all bg-black/60 opacity-0 hover:opacity-100 absolute flex justify-center items-center">
                                <input type="file" id="file" accept="image/*" onChange={onChangeImage} className="hidden" />
                                <label htmlFor="file"><FontAwesomeIcon className="invert text-6xl cursor-pointer" icon={faImage} /> </label>
                            </div>
                            <img alt="avatar" src={baseUrl + "Images/Playlist/" + playlist?.playlistDto?.image} className="cursor-pointer transition-all object-cover w-full h-full" onError={(tg: any) => { tg.target.src = defaultAvatarImage }} />
                        </div> :
                        <div className="flex items-center justify-center w-[240px] h-[240px] bg-light-200">
                            <FontAwesomeIcon onClick={onChangeImage} className="text-white text-[64px]" icon={faPlus} />
                        </div>
                }
                <div className="flex flex-col gap-2 ">
                    <h1 className="text-xl font-['Lexend'] flex gap-4">Playlist {playlist?.playlistDto?.accessStatus}</h1>
                    <h1 className="font-semibold text-3xl font-['Lexend'] flex gap-4">{playlist?.playlistDto?.name}
                        <FontAwesomeIcon className="text-lg" icon={faPen} onClick={onChangePlaylist} />
                    </h1>
                </div>
            </div>
            <div className="flex flex-col w-full gap-5 px-[150px]">
                <h1 className="font-medium text-xl">Add something to your playlist</h1>
                {/* <SearchField placeholder={"Search"} value={searchQuery} onChange={(e: any) => {
                    setSearchQuery(e.target.value)
                }} icon={<img alt="icon" className="invert w-[28px]" src={icon_search} />} /> */}
                {
                    rx.tracks && rx.tracks.length > 0 ?
                        <div className="w-full flex flex-col gap-5">
                            <h1 className="font-semibold text-2xl">Tracks All</h1>
                            <div className="flex flex-col gap-[15px] flex-wrap">
                                {
                                    rx.tracks?.map((item) => {
                                        return (
                                            <SoundItemPlaylist key={Guid.create().toString()} item={item}
                                                onDelete={() => {onRemoveTrackPlaylist(playlist, item.track?.returnId)}} />
                                        )
                                    })
                                }
                            </div>
                        </div>
                        :
                        <div className="flex flex-col gap-6">
                            <FontAwesomeIcon className="text-7xl font-medium text-dark-200" icon={faMusic} />
                            <div className="flex flex-col items-center gap-8 text-dark-200">
                                <div className="flex flex-col gap-3 items-center">
                                    <h1 className="font-medium text-3xl">Tracks not found</h1>
                                </div>
                            </div>
                        </div>
                }
            </div>
        </div>
    );
};