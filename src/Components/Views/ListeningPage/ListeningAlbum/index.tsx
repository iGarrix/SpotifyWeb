import { faMusic } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Guid } from "guid-typescript";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { AddToHistory, BackwardQueue, ForwardQueue, SetPlayingTrack } from "../../../../Helpers/QueueHelper";
import { useActions } from "../../../../Hooks/useActions";
import { useTypedSelector } from "../../../../Hooks/useTypedSelector";
import { ISubscribeAlbumRequest, IUnsubscribeAlbumRequest } from "../../../../Redux/Reducers/MyAlbumReducer/types";
import { IGetTracksRequest, IQueue, ITrackResponse } from "../../../../Redux/Reducers/PlayingReducer/types";
import { baseUrl, defaultAlbumImage, StorageVariables } from "../../../../types";
import { SoundItem } from "../../../Commons/Cards/SoundItem";
import { FullScreenModal } from "../../../Commons/Modals/FullScreenModal";
import { ShareModal } from "../../../Commons/Modals/FullScreenModal/Shares/ShareModal";

const bg = require('../../../../Assets/Background2.png');
const icon_skip_forward = require('../../../../Assets/Icons/SkipForward.png');
const icon_skip_next = require('../../../../Assets/Icons/SkipNext.png');
const icon_like = require('../../../../Assets/Icons/Like.png');
const icon_likeRed = require('../../../../Assets/Icons/LikeRed.png');
const icon_share = require('../../../../Assets/Icons/Share.png');
const icon_play = require('../../../../Assets/Icons/Play.png');
const icon_pause = require('../../../../Assets/Icons/Pause.png');
const icon_cs = require('../../../../Assets/Icons/Studio.png');

export const ListeningAlbum: React.FC = () => {

    const { id } = useParams();
    const playingReducer = useTypedSelector(state => state.playingReducer);
    const { initQueue, getTracks, findAlbum, subscribeAlbum, unsubscribeAlbum, initedTracks } = useActions();
    const user = useTypedSelector(state => state.userReducer.profile);
    const [isInited, setInited] = useState(false);
    const [upt, setUpt] = useState(false);
    const [shareModal, setShareModal] = useState(false);
    const [isLiked, setLiked] = useState(false);
    const { t } = useTranslation();
    const nav = useNavigate();
    const scrollHadler = async () => {
        if (document.documentElement.scrollHeight - (document.documentElement.scrollTop + window.innerHeight) <= 0) {
            if (playingReducer.nextPage && !playingReducer.loading) {
                await FetchNext();
                InitQueueAlbum();
                setUpt(true);
            }
        }
    }
    useEffect(() => {
        const work = async () => {
            if (id) {
                await findAlbum(id, user ? user.email : "");
                const rq: IGetTracksRequest = {
                    albomId: id,
                    page: 1,
                }
                await initedTracks(rq, user ? user.email : "");
                return;
            }
            else {
                nav(-1);
            }
        }
        work();
    }, [user]);

    useEffect(() => {
        if (playingReducer.album) {
            setLiked(playingReducer.album.isLiked);
        }
    }, [playingReducer.album])

    const toggleForward = () => {
        const newQueue = ForwardQueue();
        if (newQueue) {
            initQueue(newQueue);
        }
    }
    const toggleBackward = () => {
        const newQueue = BackwardQueue();
        if (newQueue) {
            initQueue(newQueue);
        }
    }

    const InitQueueAlbum = () => {
        if (playingReducer.tracks && !isInited) {
            const newQueue: IQueue = { soundobjs: [...playingReducer.tracks], isPlay: false, playedIndex: 0, };
            localStorage.setItem(StorageVariables.Queue, JSON.stringify(newQueue));
            initQueue(newQueue);
            setInited(true);
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

    }, [playingReducer.nextPage && playingReducer.loading])
    const FetchNext = async () => {
        if (playingReducer.tracks && playingReducer.nextPage && id) {
            const rq: IGetTracksRequest = {
                albomId: id,
                page: playingReducer.nextPage,
            }
            await getTracks(rq, user ? user.email : "");
        }
    }
    const onSelectTrack = (item: ITrackResponse | null) => {
        if (user) {
            InitQueueAlbum();
            setUpt(true);
            const response = SetPlayingTrack(item);
            if (response) {
                initQueue(response);
                AddToHistory(item);
            }
        }
        else {
            nav("/authorizate");
        }
    }
    const onPause = async () => {
        if (user) {
            if (!upt) {
                if (playingReducer.tracks) {
                    await onSelectTrack(playingReducer.tracks[0]);
                }
            }
            else {
                if (playingReducer.queue) {
                    await onSelectTrack(playingReducer.queue.soundobjs[playingReducer.queue.playedIndex]);
                }
            }
        }
        else {
            nav("/authorizate");
        }
    }

    const onShare = () => {
        setShareModal(true);
    }

    const onSubscribe = async () => {
        try {
            if (user && id) {
                const rq: ISubscribeAlbumRequest = {
                    findSubscriberEmail: user.email,
                    findAlbomId: id
                }
                await subscribeAlbum(rq);
                if (!isLiked) {
                    setLiked(true);
                }
            }
        } catch (error) {

        }
    }

    const onUnsubscribe = async () => {
        try {
            if (user && id) {
                const rq: IUnsubscribeAlbumRequest = {
                    albomId: id,
                    email: user.email
                }
                await unsubscribeAlbum(rq);
                if (isLiked) {
                    setLiked(false);
                }
            }
        } catch (error) {

        }
    }

    return (
        <div className="w-full h-full pt-[7%] px-[10%] mm:px-[3%] sm:px-[3%] md:px-[3%] lg:px-[3%] xl:px-[5%] text-dark-200 dark:text-light-200 relative">
            {
                playingReducer.album ?
                    <img alt="bg" src={`${baseUrl}Images/AlbomTemplates/${playingReducer.album?.albomDto?.templateimage}`} className="fixed top-0 left-0 object-cover bg-cover w-full h-full" style={{ zIndex: -2 }} onError={(tg: any) => { tg.target.src = defaultAlbumImage }} />
                    :
                    null
            }
            {
                playingReducer.album ?
                    <div className="w-full h-full grid grid-cols-5 gap-12 xl:gap-6 z-[5] relative">
                        <FullScreenModal visible={shareModal} center >
                            <ShareModal
                                onClose={() => { setShareModal(false) }}
                                title={t("Share album")}
                                link={document.location.origin + "/album/" + playingReducer.album.albomDto?.returnId}
                                banner={
                                    <div className="flex w-full gap-2">
                                        <img alt="singleImage" src={`${baseUrl}Images/AlbomImages/${playingReducer.album?.albomDto?.image}`}
                                            className="h-28 w-28 rounded-xl object-cover bg-cover" onError={(tg: any) => { tg.target.src = defaultAlbumImage }} />
                                        <div className="flex flex-col">
                                            <div className="flex gap-2 items-center">
                                                <h1 className="font-['Lexend'] text-xl">{playingReducer.album?.albomDto?.name}</h1>
                                                <p className="bg-light-300 dark:bg-dark-100 rounded-2xl px-3 mm:hidden">
                                                    <span className="text-center text-sm text-dark-200 dark:text-light-200">{t("Sharing")}</span>
                                                </p>
                                            </div>
                                            {
                                                playingReducer.album && playingReducer.album.albomDto && playingReducer.album.albomDto.releasealbom &&
                                                <p className="">{playingReducer.album?.albomDto?.description} • {playingReducer.album?.songs} {t("songs • realised")} {moment(new Date(playingReducer.album?.albomDto?.releasealbom)).format("DD.MM.YYYY")} • {playingReducer.album?.albomDto.views.toLocaleString(undefined, { maximumFractionDigits: 2 })} {t("views for all time")}</p>
                                            }
                                            <p className="flex gap-2 mt-auto flex-wrap">{t("Creat")}
                                                {
                                                    playingReducer.album?.creatorsAlbom?.map(i => i.username).map((i: any, index: number) => {
                                                        return (
                                                            <span key={Guid.create().toString()}
                                                                className="cursor-pointer hover:text-blue-400" onClick={() => { nav("/overview/" + i, { replace: false }) }}>{i}{playingReducer.album?.creatorsAlbom?.length && index < playingReducer.album?.creatorsAlbom.length - 1 ? " • " : " "}</span>
                                                        )
                                                    })
                                                }</p>
                                        </div>
                                    </div>
                                } />
                        </FullScreenModal>
                        <div className="flex justify-end mm:justify-center sm:justify-center md:justify-center lg:justify-center col-span-2 mm:col-span-full md:col-span-full sm:col-span-full lg:col-span-full">
                            <div className="flex flex-col fixed mm:relative sm:relative md:relative lg:relative select-none">
                                <img alt="singleImage" src={`${baseUrl}Images/AlbomImages/${playingReducer.album?.albomDto?.image}`}
                                    className="h-96 w-96 mm:w-[296px] mm:h-[296px] rounded-xl object-cover bg-cover" onError={(tg: any) => { tg.target.src = defaultAlbumImage }} />
                                <div className="py-3 flex items-center justify-between w-full">
                                    <img alt="icon" className="w-[26px] mm:w-[22px] cursor-pointer invert dark:invert-0" src={icon_share} onClick={onShare} />
                                    <div className="flex items-center justify-center w-[38px] h-[38px] mm:w-[32px] mm:h-[32px] rounded-full cursor-pointer bg-light-200" onClick={toggleBackward}>
                                        <img alt="icon" className="w-[18px] invert" src={icon_skip_forward} />
                                    </div>
                                    <div className="bg-no-repeat object-cover bg-cover flex items-center justify-center w-[64px] h-[64px] mm:w-[48px] mm:h-[48px] rounded-full cursor-pointer"
                                        onClick={onPause}
                                        style={{ backgroundImage: `url(${bg})` }}>
                                        {
                                            playingReducer.queue?.isPlay ?
                                                <img alt="icon" className="w-[30px] mm:w-[24px] -translate-x-[0.5px]" src={icon_pause} />
                                                :
                                                <img alt="icon" className="w-[30px] mm:w-[24px] -translate-x-[0.8px]" src={icon_play} />

                                        }
                                    </div>
                                    <div className="flex items-center justify-center w-[38px] h-[38px] mm:w-[32px] mm:h-[32px] rounded-full cursor-pointer bg-light-200" onClick={toggleForward}>
                                        <img alt="icon" className="w-[18px] invert" src={icon_skip_next} />
                                    </div>
                                    {
                                        isLiked ?
                                            <img alt="icon" className="w-[26px] mm:w-[22px] text-red-500 cursor-pointer transition-all active:scale-125 active:shadow-2xl active:invert" src={icon_likeRed} onClick={onUnsubscribe} /> :
                                            <img alt="icon" className="w-[26px] mm:w-[22px] text-red-500 invert cursor-pointer transition-all active:scale-125 active:shadow-2xl active:invert-none dark:invert-0" src={icon_like} onClick={onSubscribe} />
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-start w-full col-span-3 mm:col-span-full sm:col-span-full md:col-span-full lg:col-span-full mb-32 mm:mb-10 sm:mb-10 md:mb-10 z-10">
                            <div className="flex flex-col gap-4 w-full">
                                <div className="flex flex-col gap-1">
                                    <div className="flex gap-4 w-full items-center">
                                        <h1 className="font-medium font-['Lexend'] text-3xl">{playingReducer.album?.albomDto?.name}</h1>
                                        {
                                            user && playingReducer.album?.creatorsAlbom?.map(i => i.username).includes(user.username) &&
                                            <img alt="icon" className="w-[26px] cursor-pointer invert dark:invert-0 hover:scale-105" src={icon_cs} onClick={() => { nav('/creativestudio/album') }} />
                                        }
                                    </div>
                                    {
                                        playingReducer.album && playingReducer.album.albomDto && playingReducer.album.albomDto.releasealbom &&
                                        <p className="font-thin">{playingReducer.album?.albomDto?.description} • {playingReducer.album?.songs} {t("songs • realised")} {moment(new Date(playingReducer.album?.albomDto?.releasealbom)).format("DD.MM.YYYY")} • {playingReducer.album?.albomDto.views.toLocaleString(undefined, { maximumFractionDigits: 2 })} {t("views for all time")}</p>
                                    }
                                    <p className="font-thin flex gap-2">{t("Creat")}
                                        {
                                            playingReducer.album?.creatorsAlbom?.map(i => i.username).map((i: any, index: number) => {
                                                return (
                                                    <span key={Guid.create().toString()}
                                                        className="cursor-pointer hover:text-blue-400" onClick={() => { nav("/overview/" + i, { replace: false }) }}>{i}{playingReducer.album?.creatorsAlbom?.length && index < playingReducer.album?.creatorsAlbom.length - 1 ? " • " : " "}</span>
                                                )
                                            })
                                        }</p>
                                </div>
                                <div className="flex flex-col gap-4 overflow-x-hidden pr-5 mm:px-0 sm:px-0 md:px-0 lg:px-0 pb-10 h-full">
                                    <div className="flex flex-col gap-[18px] h-full">
                                        {
                                            playingReducer.error &&
                                            <div className="flex flex-col justify-center w-full gap-5">
                                                <hr className="w-full border-dark-200 dark:border-light-200" />
                                                <FontAwesomeIcon className="text-4xl font-medium text-dark-200 dark:text-light-200 mt-[2%]" icon={faMusic} />
                                                <div className="flex flex-col items-center gap-8 text-dark-200 dark:text-light-200">
                                                    <div className="flex flex-col gap-3 items-center">
                                                        <h1 className="font-medium text-xl">{playingReducer.error}</h1>
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                        {
                                            playingReducer.tracks?.map((item) => {
                                                return (
                                                    <SoundItem key={Guid.create().toString()} item={item}
                                                        isPlay={playingReducer.queue && item.track ? playingReducer.queue.soundobjs[playingReducer.queue.playedIndex].track?.returnId === item.track.returnId && playingReducer.queue?.isPlay : false}
                                                        onClick={() => { onSelectTrack(item) }} />
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="">
                    </div>
            }
        </div>
    )
}