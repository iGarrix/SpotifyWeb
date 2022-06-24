import { icon } from "@fortawesome/fontawesome-svg-core";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
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

    const rx = useTypedSelector(state => state.playingReducer.queue);
    const nav = useNavigate();
    const audio = useRef<any>(null);

    const [isPlay, setPlay] = useState(false);
    const [currTime, setCurrTime] = useState(0);
    const [seekTime, setSeekTime] = useState(161);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(() => {
        const vol = localStorage.getItem(StorageVariables.Volume);
        if (vol) {
            return Number.parseInt(vol);
        }
        return 100;
    });

    const { setPlayingTrack } = useActions();

    const onNav = (path: string) => {
        if (window.location.pathname !== "/" + path) {
            nav(path);
        }
        else {
            nav(-1);
        }
    }

    useEffect(() => {
        isPlay
            ? audio.current?.play().then(() => { }).catch((e: any) => { audio.current.pause(); })
            : audio.current?.pause();
        audio.current.volume = volume / 100;
        audio.current.onloadeddata = () => {
            if (audio.current != null)
                setDuration(audio.current.duration)
        };

        setInterval(() => {
            if (audio.current !== null)
                setCurrTime(audio.current.currentTime);
        })
    }, []);

    useEffect(() => {
        if (rx) {
            Playing(rx.isPlay);
        }
    }, [rx]);

    useEffect(() => {
        if (currTime < duration) {
            setSeekTime(currTime)
        }
        else {
            Playing(false);
            audio.current.currentTime = 0;
        }
    }, [currTime, duration]);


    const SeekChange = (newValue: any) => {
        setTimeout(() => {
            audio.current.currentTime = newValue;
            setSeekTime(newValue);
        }, 100);
    };

    const Playing = (play: boolean) => {
        setPlay(play);
        play
            ? audio.current?.play().then(() => { }).catch((e: any) => { audio.current.pause(); audio.current.currentTime = 0; })
            : audio.current?.pause();
        let storage_queue = localStorage.getItem(StorageVariables.Queue);
        if (storage_queue) {
            let queue = JSON.parse(storage_queue) as IQueue;
            queue.isPlay = play;
            localStorage.setItem(StorageVariables.Queue, JSON.stringify(queue));
            setPlayingTrack(play);
        }
    }

    const ChangeVolume = (e : any) => {
        setVolume(e);
        audio.current.volume = e / 100;
        localStorage.setItem(StorageVariables.Volume, `${e}`)
    }

    const onMute = () => {
        if (volume > 0) {   
            setVolume(0);
            audio.current.volume = 0 / 100;
        }
        else {
            const vol = localStorage.getItem(StorageVariables.Volume);
            if (vol) {
                setVolume(Number.parseInt(vol));
                audio.current.volume = Number.parseInt(vol) / 100;           
            }
        }
    }

    return (
        <>
            {
                rx && rx.soundobjs && rx.soundobjs[0].trackCreators ?
                    <div className="w-full text-white grid grid-cols-12 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full bg-dark-200 backdrop-blur-[32px] blur-[32px]"></div>
                        <div className="flex items-end pb-4 px-10 py-2 z-10 col-span-2">
                            <div className="flex items-center gap-3">

                                <img alt="image" className="h-[55px] w-[55px] rounded-xl object-cover bg-cover bg-no-repeat"
                                    src={baseUrl + "Images/Tracks/" + rx.soundobjs[0].track?.image} />
                                <div className="flex flex-col">
                                    <div className="flex gap-3 items-center">
                                        <h1 className="font-semibold">{rx.soundobjs[0].trackCreators[0].username} {rx.soundobjs[0].trackCreators.length > 1 ? " ..." : ""}</h1>
                                        <img alt="icon" className="w-[20px] h-[20px] cursor-pointer object-cover bg-cover bg-no-repeat" src={icon_share} />
                                    </div>
                                    <p className="text-gray-400">{rx.soundobjs[0].track?.name}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col justify-end items-center col-span-8 overflow-hidden px-20 pb-4 z-10">
                            <audio crossOrigin="anonymous" ref={audio} src={baseUrl + "TrackStorage/Tracks/" + rx?.soundobjs[0].track?.tracknameid} preload={"metadata"} />
                            <div className="py-3 flex items-center justify-between gap-8">
                                <div className="flex items-center justify-center w-[26px] h-[26px] rounded-full cursor-pointer bg-white">
                                    <img alt="icon" className="w-[16px]" src={icon_shuffle} />
                                </div>
                                <div className="flex items-center justify-center w-[26px] h-[26px] rounded-full cursor-pointer bg-white">
                                    <img alt="icon" className="w-[11px]" src={icon_skip_forward} />
                                </div>
                                <div className="bg-no-repeat object-cover bg-cover flex items-center justify-center w-[40px] h-[40px] rounded-full cursor-pointer"
                                    onClick={() => { Playing(!isPlay) }}
                                    style={{ backgroundImage: `url(${bg})` }}>
                                    {
                                        isPlay ?
                                            <img alt="icon" className="w-[22px]" src={icon_pause} />
                                            :
                                            <img alt="icon" className="w-[22px]" src={icon_play} />

                                    }
                                </div>
                                <div className="flex items-center justify-center w-[26px] h-[26px] rounded-full cursor-pointer bg-white">
                                    <img alt="icon" className="w-[11px]" src={icon_skip_next} />
                                </div>
                                <div className="flex items-center justify-center w-[26px] h-[26px] rounded-full cursor-pointer bg-white">
                                    <img alt="icon" className="w-[16px]" src={icon_repeat} />
                                </div>
                            </div>
                            {
                                rx.soundobjs[0].track &&

                                <div className="grid grid-cols-12 w-full gap-2 items-center">
                                    <div className="col-span-1 flex items-center justify-end">
                                        <h1 className="text-thin text-[12px]">{moment.utc(currTime * 1000).format("mm:ss")}</h1>
                                    </div>
                                    <div className="col-span-10 flex items-center">
                                        {
                                            !isNaN(seekTime) &&
                                            <Slider min={0} max={Number.parseFloat(duration.toFixed(0))} value={seekTime} onChange={(e: any) => { SeekChange(e.target.value) }} />
                                        }
                                    </div>
                                    <div className="col-span-1 flex items-center">
                                        <h1 className="text-thin con-span-1 text-[12px]">{moment.utc(Number.parseFloat(rx.soundobjs[0].track.duration) * 1000).format("mm:ss")}</h1>
                                    </div>
                                </div>
                            }
                        </div>
                        <div className="flex items-end pb-4 px-10 py-2 gap-3 z-10 col-span-2">
                            <img alt="icon" className="w-[28px] h-[28px] cursor-pointer bg-white rounded-[50%] p-1" src={icon_queue} onClick={() => { onNav("queue") }} />
                            <div className="flex items-center gap-2">
                                {
                                    volume > 60 ?
                                    <img alt="icon" className="w-[28px] h-[28px] cursor-pointer bg-white rounded-[50%] p-1" src={icon_volfull} onClick={() => {onMute()}} />
                                    :  volume > 40 && volume <= 60 ?
                                    <img alt="icon" className="w-[28px] h-[28px] cursor-pointer bg-white rounded-[50%] p-1" src={icon_volmedium} onClick={() => {onMute()}} />
                                    : volume > 0 && volume <= 40 ?
                                    <img alt="icon" className="w-[28px] h-[28px] cursor-pointer bg-white rounded-[50%] p-1" src={icon_vollow} onClick={() => {onMute()}} />
                                    :
                                    <img alt="icon" className="w-[28px] h-[28px] cursor-pointer bg-white rounded-[50%] p-1" src={icon_volmute} onClick={() => {onMute()}} />

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