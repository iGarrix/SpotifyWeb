import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NextTrackInQeueue } from "../../../../Helpers/QueueHelper";
import { useActions } from "../../../../Hooks/useActions";
import { useTypedSelector } from "../../../../Hooks/useTypedSelector";
import { IQueue } from "../../../../Redux/Reducers/SelectAlbumReducer/types";
import { baseUrl, StorageVariables } from "../../../../types";
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


export const PlayingFooter: React.FC = () => {

    const { setPlayingTrack, initQueue } = useActions();
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
    const audioPlayer = useRef<any>();
    const [isPlaying, setIsPlaying] = useState(false);
    const [isRepeat, setRepeat] = useState(false);
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
                let newQueue = NextTrackInQeueue();
                if (newQueue) {
                    newQueue.isPlay = true;
                    initQueue(newQueue);
                    if (rx && rx.soundobjs) {
                        audioPlayer.current.src = baseUrl + "TrackStorage/Tracks/" + rx.soundobjs[0].track?.tracknameid;
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
        if (rx && rx.soundobjs.length > 1) {
            let newQueue = NextTrackInQeueue();
            if (newQueue) {
                newQueue.isPlay = true;
                initQueue(newQueue);
                if (rx && rx.soundobjs) {
                    if (audioPlayer.current) {
                        audioPlayer.current.currentTime = 0;
                        audioPlayer.current.src = baseUrl + "TrackStorage/Tracks/" + rx.soundobjs[0].track?.tracknameid;
                    }
                }
            }
        }
    }
    const toggleBackward = () => {
        if (audioPlayer.current) {
            audioPlayer.current.currentTime -= 10;
        }
    }
    const onMute = () => {
        if (audioPlayer.current) {
            if (volume > 0) {
                setVolume(0);
                audioPlayer.current.volume = 0 / 100;
                audioPlayer.current.muted = true;
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
    return (
        <>
            {
                rx && rx.soundobjs && rx.soundobjs[0].trackCreators ?
                    <div className="w-full text-white grid grid-cols-12 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full backdrop-blur-[22px] blur-[22px] z-[-2]" style={{ backgroundImage: `url('${baseUrl + "Images/Tracks/" + rx.soundobjs[0].track?.image}')` }}></div>
                        <div className="absolute top-0 left-0 w-full h-full bg-dark-200/30 z-[-1]"></div>
                        <div className="flex items-end pb-4 px-10 py-2 pr-0 z-10 col-span-2">
                            <div className="flex items-center gap-3 overflow-hidden">
                                <img alt="image" className="h-[55px] w-[55px] rounded-xl object-cover bg-cover bg-no-repeat shadow-2xl"
                                    src={baseUrl + "Images/Tracks/" + rx.soundobjs[0].track?.image} />
                                <div className="flex flex-col">
                                    <div className="flex gap-3 items-center">
                                        <h1 className="font-semibold">{rx.soundobjs[0].trackCreators[0].username} {rx.soundobjs[0].trackCreators.length > 1 ? " ..." : ""}</h1>
                                        <img alt="icon" className="w-[20px] h-[20px] cursor-pointer object-cover bg-cover bg-no-repeat" src={icon_share} />
                                    </div>
                                    <p className="text-gray-300">{rx.soundobjs[0].track?.name.substring(0, 30)}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col justify-end items-center col-span-8 overflow-hidden px-20 pb-4 z-10">
                            <audio crossOrigin="anonymous" ref={audioPlayer} src={baseUrl + "TrackStorage/Tracks/" + rx.soundobjs[0].track?.tracknameid} preload={"metadata"} />
                            <div className="py-3 flex items-center justify-between gap-8">
                                <div className="flex items-center justify-center w-[26px] h-[26px] rounded-full cursor-pointer bg-white">
                                    <img alt="icon" className="w-[16px]" src={icon_shuffle} />
                                </div>
                                <div className="flex items-center justify-center w-[26px] h-[26px] rounded-full cursor-pointer bg-white active:bg-blue-500" onClick={toggleBackward}>
                                    <img alt="icon" className="w-[11px]" src={icon_skip_forward} />
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
                                <div className="flex items-center justify-center w-[26px] h-[26px] rounded-full cursor-pointer bg-white active:bg-blue-500" onClick={toggleForward}>
                                    <img alt="icon" className="w-[11px]" src={icon_skip_next} />
                                </div>
                                <div className={`flex items-center justify-center w-[26px] h-[26px] rounded-full cursor-pointer transition-all ${isRepeat ? "bg-blue-500" : "bg-white"}`} onClick={() => { setRepeat(!isRepeat) }}>
                                    <img alt="icon" className="w-[16px]" src={icon_repeat} />
                                </div>
                            </div>
                            {
                                rx.soundobjs[0].track &&

                                <div className="grid grid-cols-12 w-full gap-2 items-center">
                                    <div className="col-span-1 flex items-center justify-end">
                                        <h1 className="text-thin text-[12px]">{moment.utc(elapsed * 1000).format("mm:ss")}</h1>
                                    </div>
                                    <div className="col-span-10 flex items-center">
                                        {
                                            !isNaN(elapsed) && !isNaN(duration) &&
                                            <Slider min={0} max={duration} value={elapsed}
                                                onKeyPress={onKeyPress}
                                                onChange={(e: any) => { ElapseChange(e.target.value) }} />
                                        }
                                    </div>
                                    <div className="col-span-1 flex items-center">
                                        <h1 className="text-thin con-span-1 text-[12px]">{moment.utc(duration * 1000).format("mm:ss")}</h1>
                                    </div>
                                </div>
                            }
                        </div>
                        <div className="flex items-end pb-4 px-10 py-2 gap-3 z-10 col-span-2">
                            <img alt="icon" className="w-[28px] h-[28px] cursor-pointer bg-white rounded-[50%] p-1" src={icon_queue} onClick={() => { onNav("queue") }} />
                            <div className="flex items-center gap-2">
                                {
                                    volume > 60 ?
                                        <img alt="icon" className="w-[28px] h-[28px] cursor-pointer bg-white rounded-[50%] p-1" src={icon_volfull} onClick={() => { onMute() }} />
                                        : volume > 40 && volume <= 60 ?
                                            <img alt="icon" className="w-[28px] h-[28px] cursor-pointer bg-white rounded-[50%] p-1" src={icon_volmedium} onClick={() => { onMute() }} />
                                            : volume > 0 && volume <= 40 ?
                                                <img alt="icon" className="w-[28px] h-[28px] cursor-pointer bg-white rounded-[50%] p-1" src={icon_vollow} onClick={() => { onMute() }} />
                                                :
                                                <img alt="icon" className="w-[28px] h-[28px] cursor-pointer bg-white rounded-[50%] p-1" src={icon_volmute} onClick={() => { onMute() }} />

                                }
                                <Slider min={0} max={100} value={volume} onChange={(e: any) => { ChangeVolume(e.target.value) }} />
                            </div>
                        </div>
                    </div>
                    : null
            }
        </>
    )
}