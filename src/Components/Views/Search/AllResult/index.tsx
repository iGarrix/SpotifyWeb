import { Guid } from "guid-typescript";
import React, { useEffect, useState, useTransition } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AddToHistory, AddToQueue, SetPlayingTrack } from "../../../../Helpers/QueueHelper";
import { useActions } from "../../../../Hooks/useActions";
import { useTypedSelector } from "../../../../Hooks/useTypedSelector";
import { IAlbumSearch, IPlaylistSearch, IUserSearch } from "../../../../Redux/Reducers/SearchReducer/types";
import { ITrackResponse } from "../../../../Redux/Reducers/PlayingReducer/types";
import { baseUrl, BestResultTypes, GetUserAvatarSimple } from "../../../../types";
import { AlbumItem } from "../../../Commons/AlbumItem";
import { AlbumResultCard } from "../../../Commons/Cards/SearchBestResults/AlbumResultCard";
import { ArtistResultCard } from "../../../Commons/Cards/SearchBestResults/ArtistResultCard";
import { PlaylistResultCard } from "../../../Commons/Cards/SearchBestResults/PlaylistResultCard";
import { TrackResultCard } from "../../../Commons/Cards/SearchBestResults/TrackResultCard";
import { SoundItem } from "../../../Commons/Cards/SoundItem";
import { UserOverviever } from "../../../Commons/Cards/UserOverviever";
import { PlaylistItem } from "../../../Commons/PlaylistItem";
import { faMusic } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export const AllResultSearch: React.FC = () => {

    const { SearchAllXHR, clearTracks, initQueue, setPlayingTrack, initSelectPlaylist, initSelectAlbum, SearchAllWithoutBestResultXHR } = useActions();
    const [searchParams, setSearchParams] = useSearchParams();
    const [upt, setUpt] = useState(false);
    const user = useTypedSelector(state => state.userReducer.profile);
    const nav = useNavigate();
    const reducer = useTypedSelector(state => state.searchReducer);
    const playingReducer = useTypedSelector(state => state.playingReducer);
    const [isPending, startTransition] = useTransition();

    const fetchData = async (query: string, email: string) => {
        await SearchAllXHR(query, email);
    }

    useEffect(() => {
        startTransition(() => {
            const work = async () => {
                await SearchAllWithoutBestResultXHR();
            }
            work();
        });
    }, []);

    useEffect(() => {
        const query = searchParams.get('query');
        if (query) {
            startTransition(() => {
                fetchData(query, user ? user.email : "");
            });
            if (upt != true) {
                setUpt(true);
            }
        }
    }, [searchParams, user]);

    const TypeOfInstance = (obj: IUserSearch | ITrackResponse | IPlaylistSearch | IAlbumSearch | any) => {
        if (obj) {
            if ('verifyType' in obj) {
                return BestResultTypes.User;
            }
            else if ('track' in obj) {
                return BestResultTypes.Single;
            }
            else if ('isSingle' in obj) {
                return BestResultTypes.Album;
            }
            else {
                return BestResultTypes.Playlist;
            }
        }
        return null;
    }


    const onSelectAlbum = async (id: string | null) => {
        if (id) {
            await clearTracks();
            await initSelectAlbum(null);
            nav("/album/" + id);
        }
    }

    const onSelectPlaylist = async (id: string | null, username: string | any) => {
        if (id && username) {
            await clearTracks();
            await initSelectPlaylist(null);
            if (user?.username === username) {
                nav({
                    pathname: "/playlist/" + id,
                });           
            }
            else {
                nav("/playlist/" + id);
            }
        }
    }

    const onSelectTrack = (item: ITrackResponse | null | any) => {
        const response = SetPlayingTrack(item);
        if (upt != false) {
            setUpt(false);
        }
        if (response) {
            initQueue(response);
            if (!upt && playingReducer.queue?.soundobjs[playingReducer.queue.playedIndex].track?.returnId !== item.track.returnId) {
                setPlayingTrack(false);
            }
            AddToHistory(item);
        }
    }

    const onSelectInstanceTrack = (item: ITrackResponse | null | any) => {
        const response = SetPlayingTrack(item);
        if (!upt) {
            setUpt(false);
        }
        if (response) {
            initQueue(response);
            AddToHistory(item);
        }
    }

    return (
        <div className="flex flex-col gap-8">
            {
                reducer.searchall &&
                reducer.searchall.bestResult &&
                <div className="grid grid-rows-1 grid-cols-5 gap-20">
                    <div className="flex flex-col gap-1 col-span-2">
                        <h1 className="font-medium text-2xl">Best result</h1>
                        <div>
                            {
                                TypeOfInstance(reducer.searchall?.bestResult) &&
                                    TypeOfInstance(reducer.searchall?.bestResult) === BestResultTypes.User ?
                                    <ArtistResultCard
                                        onNavigate={() => { nav("/overview/" + (reducer.searchall?.bestResult as IUserSearch).username) }}
                                        onSelect={() => { nav("/overview/" + (reducer.searchall?.bestResult as IUserSearch).username) }}
                                        type={(reducer.searchall?.bestResult as IUserSearch).verifyType === "VerifyProfile" ? "Artist" : "Profile"}
                                        name={(reducer.searchall?.bestResult as IUserSearch).name}
                                        surname={(reducer.searchall?.bestResult as IUserSearch).surname}
                                        nickname={(reducer.searchall?.bestResult as IUserSearch).username}
                                        image={GetUserAvatarSimple((reducer.searchall?.bestResult as IUserSearch).avatar)} />
                                    :
                                    TypeOfInstance(reducer.searchall?.bestResult) === BestResultTypes.Album ?
                                        <AlbumResultCard
                                            onNavigate={() => { onSelectAlbum((reducer.searchall?.bestResult as IAlbumSearch).id) }}
                                            onSelect={() => { upt ? onSelectTrack(reducer.searchall?.tracks[0]) : onSelectInstanceTrack(playingReducer.queue?.soundobjs[playingReducer.queue.playedIndex]) }}
                                            isPlay={playingReducer.queue?.isPlay}
                                            name={(reducer.searchall?.bestResult as IAlbumSearch).name}
                                            creators={(reducer.searchall?.bestResult as IAlbumSearch).creators.map(i => i.username)}
                                            image={baseUrl + "Images/AlbomImages/" + (reducer.searchall?.bestResult as IAlbumSearch).image} />
                                        :
                                        TypeOfInstance(reducer.searchall?.bestResult) === BestResultTypes.Single ?
                                            <TrackResultCard
                                                onSelect={() => { onSelectInstanceTrack((reducer.searchall?.bestResult as ITrackResponse)) }}
                                                name={(reducer.searchall?.bestResult as ITrackResponse).track?.name}
                                                isPlay={playingReducer.queue && (reducer.searchall?.bestResult as ITrackResponse).track ? playingReducer.queue.soundobjs[playingReducer.queue.playedIndex].track?.returnId === (reducer.searchall?.bestResult as ITrackResponse).track?.returnId && playingReducer.queue?.isPlay : false}
                                                image={baseUrl + "Images/Tracks/" + (reducer.searchall?.bestResult as ITrackResponse).track?.image}
                                                creators={(reducer.searchall?.bestResult as ITrackResponse).trackCreators?.map(i => i.username)} />
                                            :
                                            <PlaylistResultCard
                                                onNavigate={() => { onSelectPlaylist((reducer.searchall?.bestResult as IPlaylistSearch).id, (reducer.searchall?.bestResult as IPlaylistSearch).creator.username) }}
                                                onSelect={() => { upt ? onSelectTrack(reducer.searchall?.tracks[0]) : onSelectInstanceTrack(playingReducer.queue?.soundobjs[playingReducer.queue.playedIndex]) }}
                                                isPlay={playingReducer.queue?.isPlay}
                                                name={(reducer.searchall?.bestResult as IPlaylistSearch).name}
                                                image={baseUrl + "Images/Playlist/" + (reducer.searchall?.bestResult as IPlaylistSearch).image}
                                                creators={[(reducer.searchall?.bestResult as IPlaylistSearch).creator.username]} />
                            }
                        </div>
                    </div>
                    <div className="flex flex-col gap-1 col-span-3">
                        <h1 className="font-medium text-2xl">Songs</h1>
                        <div className="flex flex-col justify-between w-full h-full flex-wrap gap-[15px]">
                            {
                                reducer.searchall.tracks && reducer.searchall.tracks.length > 0 ?
                                reducer.searchall.tracks?.map(item => {
                                    return (
                                        <SoundItem key={Guid.create().toString()}
                                            onClick={() => { onSelectInstanceTrack(item) }}
                                            isPlay={playingReducer.queue && item.track ? playingReducer.queue.soundobjs[playingReducer.queue.playedIndex].track?.returnId === item.track.returnId && playingReducer.queue?.isPlay : false}
                                            item={item}
                                        />
                                    )
                                })
                                :
                                <div className="flex flex-col gap-6 w-full h-full">
                                    <hr className="w-full" />
                                    <FontAwesomeIcon className="text-3xl font-medium text-dark-200 dark:text-light-200" icon={faMusic} />
                                    <div className="flex flex-col items-center gap-8 text-dark-200 dark:text-light-200">
                                        <div className="flex flex-col gap-3 items-center">
                                            <h1 className="font-medium text-xl dark:text-light-200">No tracks</h1>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            }
            {
                reducer.searchall?.albums && reducer.searchall.albums.length > 0 &&
                <div className="flex flex-col gap-6">
                    <h1 className="font-medium text-2xl">Albums</h1>
                    <div className="flex w-full flex-wrap gap-6">
                        {
                            reducer.searchall.albums.map(item => {
                                return (
                                    <AlbumItem key={Guid.create().toString()} name={item.name} imageSrc={item.image} onClick={() => { onSelectAlbum(item.id) }} title={item.creators.map(i => i.username).join(" ")} />
                                )
                            })
                        }
                    </div>
                </div>
            }
            {
                reducer.searchall?.playlists && reducer.searchall.playlists.length > 0 &&
                <div className="flex flex-col gap-6">
                    <h1 className="font-medium text-2xl">Playlists</h1>
                    <div className="flex w-full flex-wrap gap-6">
                        {
                            reducer.searchall.playlists.map(item => {
                                return (
                                    <PlaylistItem key={Guid.create().toString()} name={item.name} title={item.creator.username} imageSrc={item.image} onClick={() => { onSelectPlaylist(item.id, item.creator.username) }} />
                                )
                            })
                        }
                    </div>
                </div>
            }
            {
                reducer.searchall?.artists && reducer.searchall.artists.length > 0 &&
                <div className="flex flex-col gap-3">
                    <h1 className="font-medium text-2xl">Creators</h1>
                    <div className="flex w-full flex-wrap gap-3">
                        {
                            reducer.searchall.artists.map(item => {
                                return (
                                    <UserOverviever key={Guid.create().toString()} avatar={item.avatar} username={item.username} />
                                )
                            })
                        }
                    </div>
                </div>
            }
            {
                reducer.searchall?.profiles && reducer.searchall.profiles.length > 0 &&
                <div className="flex flex-col gap-3">
                    <h1 className="font-medium text-2xl">Profiles</h1>
                    <div className="flex w-full flex-wrap gap-3">
                        {
                            reducer.searchall.profiles.map(item => {
                                return (
                                    <UserOverviever key={Guid.create().toString()} avatar={item.avatar} username={item.username} />
                                )
                            })
                        }
                    </div>
                </div>
            }
        </div>
    )
}