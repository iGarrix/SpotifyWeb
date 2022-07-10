import { faMusic } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Guid } from "guid-typescript";
import moment from "moment";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AddToHistory, SetPlayingTrack } from "../../../../Helpers/QueueHelper";
import { useActions } from "../../../../Hooks/useActions";
import { useTypedSelector } from "../../../../Hooks/useTypedSelector";
import { IGetTracksRequest, IQueue, ITrackResponse } from "../../../../Redux/Reducers/SelectAlbumReducer/types";
import { baseUrl, defaultAlbumImage, StorageVariables } from "../../../../types";
import { SoundItem } from "../../../Commons/Cards/SoundItem";

const bg = require('../../../../Assets/Background2.png');
const icon_skip_forward = require('../../../../Assets/Icons/SkipForward.png');
const icon_skip_next = require('../../../../Assets/Icons/SkipNext.png');
const icon_like = require('../../../../Assets/Icons/Like.png');
const icon_share = require('../../../../Assets/Icons/Share.png');
const icon_play = require('../../../../Assets/Icons/Play.png');
const icon_pause = require('../../../../Assets/Icons/Pause.png');

export const ListeningAlbum: React.FC = () => {

    const { id } = useParams();
    const playingReducer = useTypedSelector(state => state.playingReducer);
    const { initSelectAlbum, initQueue, getTracks } = useActions();
    const nav = useNavigate();
    const scrollHadler = async () => {
        if (document.documentElement.scrollHeight - (document.documentElement.scrollTop + window.innerHeight) <= 0) {
            if (playingReducer.nextPage && !playingReducer.loading) {
                await FetchNext();
            }
        }
    }
    useEffect(() => {
        const work = async () => {
            const selectedAlbum = localStorage.getItem(StorageVariables.Album);
            if (selectedAlbum) {
                if (JSON.parse(selectedAlbum).albomDto.returnId === id) {
                    await initSelectAlbum(JSON.parse(selectedAlbum));
                    return;
                }
            }
            else {
                nav(-1);
            }
        }
        work();
    }, []);
    useEffect(() => {
        const fetchData = async (page: any) => {
            if (id && !playingReducer.tracks) {
                const rq: IGetTracksRequest = {
                    albomId: id,
                    page: page,
                }
                await getTracks(rq);
            }
        }
        fetchData(1);
    }, []);
    useEffect(() => {
        const listener = () => {
            document.addEventListener("scroll", scrollHadler);
        }
        listener();

        return function () {
            document.removeEventListener("scroll", scrollHadler);
        }

    }, [playingReducer.nextPage && playingReducer.loading])
    const FetchNext = async () => {
        if (playingReducer.tracks && playingReducer.nextPage && id) {
            const rq: IGetTracksRequest = {
                albomId: id,
                page: playingReducer.nextPage,
            }
            await getTracks(rq);
        }
    }
    const onSelectTrack = (item: ITrackResponse | null) => {
        const response = SetPlayingTrack(item);
        if (response) {
            initQueue(response);
            AddToHistory(item);
        }
    }
    const onPause = async () => {
        let storage_queue = localStorage.getItem(StorageVariables.Queue);
        if (storage_queue) {
            let queue = JSON.parse(storage_queue) as IQueue;
            queue.isPlay = !queue.isPlay;
            localStorage.setItem(StorageVariables.Queue, JSON.stringify(queue));
            await initQueue(queue);
            return;
        }
        if (playingReducer.tracks) {
            await onSelectTrack(playingReducer.tracks[0]);
        }
    }
    return (
        <div className="w-full h-full pt-[7%] px-[15%] text-dark-200 relative">
            {
                playingReducer.album ?
                    <img alt="bg" src={`${baseUrl}Images/AlbomTemplates/${playingReducer.album?.albomDto?.templateimage}`} className="fixed top-0 left-0 object-cover bg-cover w-full" style={{ zIndex: -2 }} onError={(tg: any) => { tg.target.src = "https://d338t8kmirgyke.cloudfront.net/icons/icon_pngs/000/002/026/original/disc.png" }} />
                    :
                    null
            }
            <div className="w-full h-full grid grid-cols-5 gap-12 z-[5]">
                <div className="flex justify-end col-span-2">
                    <div className="flex flex-col fixed">
                        <img alt="singleImage" src={`${baseUrl}Images/AlbomImages/${playingReducer.album?.albomDto?.image}`}
                            className="h-96 w-96 rounded-xl object-cover bg-cover" onError={(tg: any) => { tg.target.src = defaultAlbumImage }} />
                        <div className="py-3 flex items-center justify-between w-full">
                            <img alt="icon" className="w-[30px] translate-y-1 cursor-pointer invert" src={icon_share} />
                            <div className="flex items-center justify-center w-[38px] h-[38px] rounded-full cursor-pointer bg-light-200">
                                <img alt="icon" className="w-[18px] invert" src={icon_skip_forward} />
                            </div>
                            <div className="bg-no-repeat object-cover bg-cover flex items-center justify-center w-[64px] h-[64px] rounded-full cursor-pointer"
                                onClick={onPause}
                                style={{ backgroundImage: `url(${bg})` }}>
                                {
                                    playingReducer.queue?.isPlay ?
                                        <img alt="icon" className="w-[30px] -translate-x-[0.5px]" src={icon_pause} />
                                        :
                                        <img alt="icon" className="w-[30px] -translate-x-[0.8px]" src={icon_play} />

                                }
                            </div>
                            <div className="flex items-center justify-center w-[38px] h-[38px] rounded-full cursor-pointer bg-light-200">
                                <img alt="icon" className="w-[18px] invert" src={icon_skip_next} />
                            </div>
                            <img alt="icon" className="w-[26px] text-red-500 cursor-pointer invert" src={icon_like} />
                        </div>
                    </div>
                </div>
                <div className="flex justify-start w-full col-span-3 mb-32 z-10">
                    <div className="flex flex-col gap-4 w-full">
                        <div className="flex flex-col gap-1">
                            <h1 className="font-medium font-['Lexend'] text-4xl">{playingReducer.album?.albomDto?.name}</h1>
                            {
                                playingReducer.album && playingReducer.album.albomDto && playingReducer.album.albomDto.releasealbom &&
                                <p className="font-thin">{playingReducer.album?.albomDto?.description} • {playingReducer.album?.songs} songs • realised {moment(new Date(playingReducer.album?.albomDto?.releasealbom)).format("DD.MM.YYYY")}</p>
                            }
                            <p className="font-thin flex gap-2">Creators:
                                {
                                    playingReducer.album?.creatorsAlbom?.map(i => i.username).map((i: any, index: number) => {
                                        return (
                                            <span key={Guid.create().toString()}
                                                className="cursor-pointer hover:text-blue-400" onClick={() => { nav("/overview/" + i, { replace: true }) }}>{i}{playingReducer.album?.creatorsAlbom?.length && index < playingReducer.album?.creatorsAlbom.length - 1 ? " • " : " "}</span>
                                        )
                                    })
                                }</p>
                        </div>
                        <div className="flex flex-col gap-4 overflow-x-hidden pr-5 pb-10 h-full">
                            <div className="flex flex-col gap-[18px] h-full">
                                {
                                    playingReducer.error &&
                                    <div className="flex flex-col justify-center w-full gap-5">
                                        <hr className="w-full border-dark-200" />
                                        <FontAwesomeIcon className="text-4xl font-medium text-dark-200 mt-[2%]" icon={faMusic} />
                                        <div className="flex flex-col items-center gap-8 text-dark-200">
                                            <div className="flex flex-col gap-3 items-center">
                                                <h1 className="font-medium text-xl">{playingReducer.error}</h1>
                                            </div>
                                        </div>
                                    </div>
                                    // <div className="flex justify-center items-center overflow-hidden p-2 rounded-xl bg-red-500/80 text-light-100">
                                    //     <p className="text-center text-lg font-medium">{playingReducer.error}</p>
                                    // </div>
                                }
                                {
                                    playingReducer.tracks?.map((item) => {
                                        return (
                                            <SoundItem key={Guid.create().toString()} item={item}
                                                isLiked={true}
                                                isPlay={playingReducer.queue && item.track ? playingReducer.queue.soundobjs[0].track?.returnId === item.track.returnId && playingReducer.queue?.isPlay : false}
                                                onClick={() => { onSelectTrack(item) }} />
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}