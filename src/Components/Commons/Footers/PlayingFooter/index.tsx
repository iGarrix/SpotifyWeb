import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BackwardQueue, ForwardQueue, ShuffleQueue } from "../../../../Helpers/QueueHelper";
import { useActions } from "../../../../Hooks/useActions";
import { useTypedSelector } from "../../../../Hooks/useTypedSelector";
import { ISubscribeSingleRequest, IUnsubscribeSingleRequest } from "../../../../Redux/Reducers/MySingleReducer/types";
import { IQueue } from "../../../../Redux/Reducers/PlayingReducer/types";
import { baseUrl, defaultAlbumImage, StorageVariables } from "../../../../types";
import { FullScreenModal } from "../../Modals/FullScreenModal";
import { ShareModal } from "../../Modals/FullScreenModal/Shares/ShareModal";
import { Slider } from "../../Slider";

const bg = require('../../../../Assets/Background2.png');
const icon_share = require('../../../../Assets/Icons/Share.png');
const icon_volfull = require('../../../../Assets/Icons/VolumeFull.png');
const icon_volmedium = require('../../../../Assets/Icons/VolumeMedium.png');
const icon_vollow = require('../../../../Assets/Icons/VolumeLow.png');
const icon_volmute = require('../../../../Assets/Icons/VolumeMute.png');
const icon_queue = require('../../../../Assets/Icons/Queue.png');
const icon_skip_forward = require('../../../../Assets/Icons/SkipForward.png');
const icon_skip_next = require('../../../../Assets/Icons/SkipNext.png');
const icon_shuffle = require('../../../../Assets/Icons/Shuffle.png');
const icon_repeat = require('../../../../Assets/Icons/Repeat.png');
const icon_play = require('../../../../Assets/Icons/Play.png');
const icon_pause = require('../../../../Assets/Icons/Pause.png');
const icon_like = require('../../../../Assets/Icons/Like.png');
const icon_likered = require('../../../../Assets/Icons/LikeRed.png');


export const PlayingFooter: React.FC = () => {

    const { setPlayingTrack, initQueue, subscribeSingle, unsubscribeSingle } = useActions();
    const rx = useTypedSelector(state => state.playingReducer.queue);
    const nav = useNavigate();
    const onNav = (path: string) => {
        if (window.location.pathname !== "/" + path) {
            nav(path);
        }
        else {
            nav(-1);
        }
    }

    useEffect(() => {
        if (rx?.soundobjs[rx.playedIndex]) {
           setLiked(rx.soundobjs[rx.playedIndex].isLiked);    
        }
    }, [rx?.soundobjs[rx?.playedIndex]])

    const audioPlayer = useRef<any>();
    const user = useTypedSelector(state => state.userReducer.profile);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isRepeat, setRepeat] = useState(false);
    const [shareModal, setShareModal] = useState(false);
    const [isLiked, setLiked] = useState(false);
    const [volume, setVolume] = useState(() => {
        const vol = localStorage.getItem(StorageVariables.Volume);
        if (vol) {
            return Number.parseInt(vol);
        }
        return 100;
    });
    const [elapsed, setElapsed] = useState(0);
    const [duration, setDuration] = useState(0);
    const eventTimeUpdate = (e: any) => {
        if (isPlaying) {
            const _duration = Math.floor(audioPlayer?.current?.duration);
            const _elapsed = Math.floor(audioPlayer?.current?.currentTime);
            setDuration(_duration);
            setElapsed(_elapsed);
        }
        else {
            if (audioPlayer.current) {
                audioPlayer.current.volume = 0;
            }
            togglePlay(false);
        }
    }
    const eventSeeking = (e: any) => {
        if (audioPlayer.current) {
            audioPlayer.current.pause();
        }
    }
    const eventSeeked = (e: any) => {
        setTimeout(() => {
            if (audioPlayer.current) {
                audioPlayer.current.play();
            }
        }, 100)
    }
    const eventEnded = (e: any) => {
        ElapseChange(0);
        if (audioPlayer.current) {
            audioPlayer.current.currentTime = 0;
            if (!isRepeat) {
                togglePlay(false);
                if (rx && rx.soundobjs.length - 1 !== rx?.playedIndex) {
                    let newQueue = ForwardQueue();
                    if (newQueue) {
                        newQueue.isPlay = true;
                        initQueue(newQueue);
                        if (rx && rx.soundobjs) {
                            audioPlayer.current.src = baseUrl + "TrackStorage/Tracks/" + rx.soundobjs[0].track?.tracknameid;
                        }
                    }
                }
                else {
                    let newQueue = ForwardQueue();
                    if (newQueue) {
                        initQueue(newQueue);
                        if (rx && rx.soundobjs) {
                            audioPlayer.current.src = baseUrl + "TrackStorage/Tracks/" + rx.soundobjs[0].track?.tracknameid;
                        }
                    }
                }
            }
        }
    }
    useEffect(() => {

        if (audioPlayer.current) {
            isPlaying ? audioPlayer.current?.play().then(() => { }).catch((e: any) => { audioPlayer.current.pause(); })
                : audioPlayer.current?.pause();
            audioPlayer.current.volume = volume / 100;
            audioPlayer.current.onloadeddata = () => {
                if (audioPlayer.current != null)
                    setDuration(audioPlayer.current.duration)
            };

            audioPlayer.current.addEventListener('timeupdate', eventTimeUpdate);
            audioPlayer.current.addEventListener('seeking', eventSeeking);
            audioPlayer.current.addEventListener('seeked', eventSeeked);
            audioPlayer.current.addEventListener('ended', eventEnded);
            audioPlayer.current.addEventListener('keyup', onKeyPress);
        }

        return function () {
            if (audioPlayer.current) {
                audioPlayer.current.removeEventListener('timeupdate', eventTimeUpdate);
                audioPlayer.current.removeEventListener('seeking', eventSeeking);
                audioPlayer.current.removeEventListener('seeked', eventSeeked);
                audioPlayer.current.removeEventListener('ended', eventEnded);
                audioPlayer.current.removeEventListener('keydown', onKeyPress);
            }
        }

    }, [isPlaying, rx, isRepeat]);
    useEffect(() => {
        if (rx) {
            togglePlay(rx.isPlay);
            
        }
    }, [rx]);
    const togglePlay = (play: boolean) => {
        if (audioPlayer.current) {
            setIsPlaying(play)
            play ? audioPlayer.current?.play().then(() => { }).catch((e: any) => { audioPlayer.current.currentTime = 0; audioPlayer.current.pause(); })
                : audioPlayer.current?.pause();
            let storage_queue = localStorage.getItem(StorageVariables.Queue);
            if (storage_queue) {
                let queue = JSON.parse(storage_queue) as IQueue;
                queue.isPlay = play;
                localStorage.setItem(StorageVariables.Queue, JSON.stringify(queue));
                setPlayingTrack(play);
            }
        }
    }
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
    const shuffleTracks = () => {
        const newQueue = ShuffleQueue();
        if (newQueue) {
            initQueue(newQueue);
        }
    }

    const onMute = () => {
        if (audioPlayer.current) {
            if (volume > 0) {
                setVolume(0);
                audioPlayer.current.volume = 0 / 100;
            }
            else {
                const vol = localStorage.getItem(StorageVariables.Volume);
                if (vol) {
                    setVolume(Number.parseInt(vol));
                    audioPlayer.current.volume = Number.parseInt(vol) / 100;
                    audioPlayer.current.muted = false;
                }
            }
        }
    }
    const ChangeVolume = (e: any) => {
        if (audioPlayer.current) {
            setVolume(e);
            audioPlayer.current.volume = e / 100;
            localStorage.setItem(StorageVariables.Volume, `${e}`)
        }
    }
    const ElapseChange = (newValue: any) => {
        if (audioPlayer.current) {
            setElapsed(newValue);
            audioPlayer.current.currentTime = newValue;
        }
    };
    const onKeyPress = (e: any) => {
        if (audioPlayer.current) {
            switch (e.code) {
                case "ArrowLeft":
                    audioPlayer.current.currentTime -= 4;
                    break;
                case "ArrowRight":
                    audioPlayer.current.currentTime += 4;
                    break;
                default:
                    break;
            }
        }
    }

    const onShare = () => {
        setShareModal(true);
    }

    const onSubscribeTrack = async () => {
        try {
            if (rx && rx.soundobjs && rx.soundobjs[rx.playedIndex] && rx.soundobjs[rx.playedIndex].track && user) {  
                const id = rx.soundobjs[rx.playedIndex].track?.returnId;
                if (id) {                
                    const rq : ISubscribeSingleRequest = {
                        findSubscriberEmail: user.email,
                        findTrackId: id
                    }
                    await subscribeSingle(rq);
                    setLiked(true);
                    let storage_queue = localStorage.getItem(StorageVariables.Queue);
                    if (storage_queue) {
                        let queue = JSON.parse(storage_queue) as IQueue;
                        let newarr = rx.soundobjs;
                        newarr[rx.playedIndex].isLiked = true;
                        queue.soundobjs = newarr;
                        localStorage.setItem(StorageVariables.Queue, JSON.stringify(queue));
                    }
                }
            }
        } catch (error) {

        }
    }

    const onUnsubscribeTrack = async () => {
        try {
            if (rx && rx.soundobjs && rx.soundobjs[rx.playedIndex] && rx.soundobjs[rx.playedIndex].track && user) { 
                const id = rx.soundobjs[rx.playedIndex].track?.returnId;
                if (id) {          
                    const rq : IUnsubscribeSingleRequest = {
                        trackId: id,
                        subscribeEmail:  user.email
                    }
                    await unsubscribeSingle(rq);
                    setLiked(false);
                    let storage_queue = localStorage.getItem(StorageVariables.Queue);
                    if (storage_queue) {
                        let queue = JSON.parse(storage_queue) as IQueue;
                        let newarr = rx.soundobjs;
                        newarr[rx.playedIndex].isLiked = false;
                        queue.soundobjs = newarr;
                        localStorage.setItem(StorageVariables.Queue, JSON.stringify(queue));
                    }
                }       
            }
        } catch (error) {

        }
    }
    
    return (
        <div className="select-none mm:h-full">
            {
                rx && rx.soundobjs && rx.soundobjs[rx.playedIndex] && rx.soundobjs[rx.playedIndex].trackCreators && rx.playedIndex != undefined ?
                    <div className="w-full text-white grid grid-cols-12 lg:grid-cols-15 xl:grid-cols-15 relative overflow-hidden mm:rounded-t-2xl sm:rounded-t-2xl">
                        <div className="hidden justify-center w-full col-span-full pt-2 gap-2 text-sm mm:flex sm:flex">
                            <h1 className="font-semibold hover:text-blue-500 cursor-pointer" onClick={() => { nav("/overview/" + rx.soundobjs[rx.playedIndex].trackCreators[0].username) }}>{rx.soundobjs[rx.playedIndex].trackCreators[0].username}</h1>
                            <span> - </span>
                            <p className="text-gray-300 whitespace-normal max-h-[70px] text-center">{rx.soundobjs[rx.playedIndex].track?.name}</p>
                        </div>
                        <FullScreenModal visible={shareModal} center>
                            <ShareModal
                                onClose={() => { setShareModal(false) }}
                                title={"Share track"}
                                link={document.location.origin + "/search?query=" + rx?.soundobjs[rx?.playedIndex].track?.name}
                                banner={
                                    <div className="flex w-full gap-2">
                                        <img alt="singleImage" src={`${baseUrl}Images/Tracks/${rx?.soundobjs[rx?.playedIndex].track?.image}`}
                                            className="h-28 w-28 rounded-xl object-cover bg-cover" onError={(tg: any) => { tg.target.src = defaultAlbumImage }} />
                                        <div className="flex flex-col">
                                            <div className="flex gap-2 items-center">
                                                <h1 className="font-['Lexend'] text-xl">{rx?.soundobjs[rx?.playedIndex].track?.name}</h1>
                                                <p className="bg-light-300 dark:bg-dark-100 text-dark-200 dark:text-light-200 rounded-2xl px-3">
                                                    <span className="text-center text-sm">Sharing</span>
                                                </p>
                                            </div>
                                            <p className="font-thin flex gap-2">Creators:
                                                <span className="cursor-pointer hover:text-blue-400"
                                                    onClick={() => { setShareModal(false); nav("/overview/" + rx?.soundobjs[rx?.playedIndex].trackCreators[0]?.username, { replace: false }) }}>{rx?.soundobjs[rx.playedIndex].trackCreators[0]?.username}</span>
                                            </p>
                                        </div>
                                    </div>
                                } />
                        </FullScreenModal>
                        

                        <div className="flex md:flex-col lg:flex-col items-end md:items-start lg:items-start md:gap-2 lg:gap-2 md:justify-end pb-4 px-10 md:px-2 py-2 pr-0 z-10 col-span-2 mm:col-span-0 sm:col-span-0 md:col-span-4 lg:col-span-4 xl:col-span-4 2xl:col-span-2 mm:hidden sm:hidden">
                            <div className="flex items-center gap-3 overflow-hidden">
                                <img alt="image" className="h-[55px] w-[55px] rounded-xl object-cover bg-cover bg-no-repeat shadow-2xl"
                                    src={baseUrl + "Images/Tracks/" + rx.soundobjs[rx.playedIndex].track?.image} onError={(tg: any) => { tg.target.src = defaultAlbumImage }} />
                                <div className="flex flex-col">
                                    <div className="flex gap-3 items-center">
                                        <h1 className="font-semibold hover:text-blue-500 cursor-pointer" onClick={() => { nav("/overview/" + rx.soundobjs[rx.playedIndex].trackCreators[0].username) }}>{rx.soundobjs[rx.playedIndex].trackCreators[0].username}</h1>
                                        <img alt="icon" className="w-[20px] h-[20px] cursor-pointer object-cover bg-cover bg-no-repeat transition-all hover:scale-105" src={icon_share} onClick={() => { onShare() }} />
                                    </div>
                                    <p className="text-gray-300 whitespace-normal max-h-[70px]">{rx.soundobjs[rx.playedIndex].track?.name}</p>
                                </div>
                            </div>
                            <div className="hidden items-center gap-2 md:flex lg:flex mt-auto">
                                {
                                    volume > 60 ?
                                        <img alt="icon" className="w-[28px] h-[28px] cursor-pointer bg-white dark:bg-light-300 dark:invert rounded-[50%] p-1" src={icon_volfull} onClick={() => { onMute() }} />
                                        : volume > 40 && volume <= 60 ?
                                            <img alt="icon" className="w-[28px] h-[28px] cursor-pointer bg-white dark:bg-light-300 dark:invert rounded-[50%] p-1" src={icon_volmedium} onClick={() => { onMute() }} />
                                            : volume > 0 && volume <= 40 ?
                                                <img alt="icon" className="w-[28px] h-[28px] cursor-pointer bg-white dark:bg-light-300 dark:invert rounded-[50%] p-1" src={icon_vollow} onClick={() => { onMute() }} />
                                                :
                                                <img alt="icon" className="w-[28px] h-[28px] cursor-pointer bg-white dark:bg-light-300 dark:invert rounded-[50%] p-1" src={icon_volmute} onClick={() => { onMute() }} />

                                }
                                <Slider min={0} max={100} value={volume} onChange={(e: any) => { ChangeVolume(e.target.value) }} />
                            </div>
                        </div>

                        <div className="flex flex-col justify-end md:justify-center items-center md:w-full col-span-8 mm:col-span-12 sm:col-span-12 md:col-span-8 lg:col-span-11 xl:col-span-7 2xl:col-span-8 overflow-hidden px-20 mm:px-2 sm:px-0 md:px-2 pb-4 z-10">
                            <audio crossOrigin="anonymous" ref={audioPlayer} src={baseUrl + "TrackStorage/Tracks/" + rx.soundobjs[rx.playedIndex].track?.tracknameid} preload={"metadata"} />
                            <div className="py-3 flex items-center justify-between gap-8">
                                <div className="hidden mm:flex sm:flex md:flex lg:flex">
                                    <img alt="icon" className="w-[28px] h-[28px] cursor-pointer bg-white dark:bg-light-300 dark:invert rounded-[50%] p-1" src={icon_queue} onClick={() => { onNav("queue") }} />
                                </div>
                                <div className="flex items-center justify-center w-[26px] h-[26px] rounded-full cursor-pointer bg-light-200 dark:bg-dark-100 mm:hidden" onClick={shuffleTracks}>
                                    <img alt="icon" className="w-[18px] dark:invert" src={icon_shuffle} />
                                </div>
                                <div className="flex items-center justify-center w-[26px] h-[26px] rounded-full cursor-pointer bg-light-200 dark:bg-dark-100 active:bg-blue-500" onClick={toggleBackward}>
                                    <img alt="icon" className="w-[18px] invert dark:invert-0" src={icon_skip_forward} />
                                </div>
                                <div className="bg-no-repeat object-cover bg-cover flex items-center justify-center w-[40px] h-[40px] rounded-full cursor-pointer"
                                    onClick={() => { togglePlay(!isPlaying) }}
                                    style={{ backgroundImage: `url(${bg})` }}>
                                    {
                                        isPlaying ?
                                            <img alt="icon" className="w-[22px]" src={icon_pause} />
                                            :
                                            <img alt="icon" className="w-[22px]" src={icon_play} />

                                    }
                                </div>
                                <div className="flex items-center justify-center w-[26px] h-[26px] rounded-full cursor-pointer bg-light-200 dark:bg-dark-100 active:bg-blue-500" onClick={toggleForward}>
                                    <img alt="icon" className="w-[18px] invert dark:invert-0" src={icon_skip_next} />
                                </div>
                                <div className={`flex items-center justify-center w-[26px] h-[26px] rounded-full cursor-pointer transition-all mm:hidden ${isRepeat ? "bg-blue-500" : "bg-white dark:bg-dark-100"}`} onClick={() => { setRepeat(!isRepeat) }}>
                                    <img alt="icon" className="w-[18px] dark:invert" src={icon_repeat} />
                                </div>
                                <div className="hidden mm:flex sm:flex md:flex lg:flex">
                                    {
                                    isLiked ?
                                        <img alt="icon" className="w-[22px] text-red-500 cursor-pointer transition-all active:scale-125 active:shadow-2xl active:invert" src={icon_likered} onClick={onUnsubscribeTrack} />
                                        :
                                        <img alt="icon" className={`w-[22px] text-red-500 cursor-pointer transition-all active:scale-125 active:shadow-2xl active:invert-none`} src={icon_like} onClick={onSubscribeTrack} />
                                    }
                                </div>
                            </div>
                            {
                                rx.soundobjs[0].track &&

                                <div className="grid grid-cols-12 w-full gap-2 mm:gap-4 sm:gap-4 items-center md:w-full">
                                    <div className="col-span-2 sm:col-span-1 md:col-span-1 xl:col-span-1 lg:col-span-1 flex items-center justify-end">
                                        <h1 className="text-thin text-[12px]">{moment.utc(elapsed * 1000).format("mm:ss")}</h1>
                                    </div>
                                    <div className="col-span-8 sm:col-span-10 md:col-span-10 xl:col-span-10 lg:col-span-10 flex items-center">
                                        {
                                            !isNaN(elapsed) && !isNaN(duration) &&
                                            <Slider min={0} max={duration} value={elapsed}
                                                onKeyPress={onKeyPress}
                                                onChange={(e: any) => { ElapseChange(e.target.value) }} />
                                        }
                                    </div>
                                    <div className="col-span-2 sm:col-span-1 md:col-span-1 xl:col-span-1 lg:col-span-1 flex items-center">
                                        <h1 className="text-thin con-span-1 text-[12px]">{moment.utc(duration * 1000).format("mm:ss")}</h1>
                                    </div>
                                </div>
                            }
                        </div>

                        <div className="flex items-end pb-4 px-10 py-2 gap-3 z-10 col-span-2 mm:col-span-0 sm:col-span-0 xl:col-span-4 2xl:col-span-2 mm:hidden sm:hidden md:hidden lg:hidden">
                                {
                                    isLiked ?
                                        <img alt="icon" className="w-[26px] text-red-500 cursor-pointer transition-all active:scale-125 active:shadow-2xl active:invert" src={icon_likered} onClick={onUnsubscribeTrack} />
                                        :
                                        <img alt="icon" className={`w-[26px] text-red-500 cursor-pointer transition-all active:scale-125 active:shadow-2xl active:invert-none`} src={icon_like} onClick={onSubscribeTrack} />
                                }
                            <img alt="icon" className="w-[28px] h-[28px] cursor-pointer bg-white dark:bg-light-300 dark:invert rounded-[50%] p-1 md:hidden" src={icon_queue} onClick={() => { onNav("queue") }} />
                            <div className="flex items-center gap-2 mm:hidden">
                                {
                                    volume > 60 ?
                                        <img alt="icon" className="w-[28px] h-[28px] cursor-pointer bg-white dark:bg-light-300 dark:invert rounded-[50%] p-1" src={icon_volfull} onClick={() => { onMute() }} />
                                        : volume > 40 && volume <= 60 ?
                                            <img alt="icon" className="w-[28px] h-[28px] cursor-pointer bg-white dark:bg-light-300 dark:invert rounded-[50%] p-1" src={icon_volmedium} onClick={() => { onMute() }} />
                                            : volume > 0 && volume <= 40 ?
                                                <img alt="icon" className="w-[28px] h-[28px] cursor-pointer bg-white dark:bg-light-300 dark:invert rounded-[50%] p-1" src={icon_vollow} onClick={() => { onMute() }} />
                                                :
                                                <img alt="icon" className="w-[28px] h-[28px] cursor-pointer bg-white dark:bg-light-300 dark:invert rounded-[50%] p-1" src={icon_volmute} onClick={() => { onMute() }} />

                                }
                                <Slider min={0} max={100} value={volume} onChange={(e: any) => { ChangeVolume(e.target.value) }} />
                            </div>
                        </div>
                    </div>
                    : null
            }
        </div>
    )
}