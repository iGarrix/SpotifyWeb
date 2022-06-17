import { Guid } from "guid-typescript";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SetPlayingTrack } from "../../../../Helpers/QueueHelper";
import { useActions } from "../../../../Hooks/useActions";
import { useTypedSelector } from "../../../../Hooks/useTypedSelector";
import { IGetTracksRequest, IQueue, ITrackResponse } from "../../../../Redux/Reducers/SelectAlbumReducer/types";
import { baseUrl, StorageVariables } from "../../../../types";
import { SoundItem } from "../../../Commons/SoundItem";

const bg = require('../../../../Assets/Background2.png');
const icon_skip_forward = require('../../../../Assets/Icons/SkipForward.png');
const icon_skip_next = require('../../../../Assets/Icons/SkipNext.png');
const icon_shuffle = require('../../../../Assets/Icons/Shuffle.png');
const icon_repeat = require('../../../../Assets/Icons/Repeat.png');
const icon_play = require('../../../../Assets/Icons/Play.png');
const icon_pause = require('../../../../Assets/Icons/Pause.png');

export const ListeningAlbum : React.FC = () => {

    const {id} = useParams();
    const playingReducer = useTypedSelector(state => state.playingReducer);

    const {initSelectAlbum, initQueue, getTracks} = useActions();
    const nav = useNavigate();

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
        const fetchData = async () => {                
            if (id && !playingReducer.tracks) {
                const rq : IGetTracksRequest = {
                    albomId: id,
                    page: 1,
                }
                await getTracks(rq);  
            }    
        }
        fetchData();
    }, []);

    const FetchNext = async () => {
        if (playingReducer.tracks && playingReducer.nextPage && id) {       
            const rq: IGetTracksRequest = {
                albomId: id,
                page: playingReducer.nextPage,
            }
            await getTracks(rq);
        }
    }

    const onSelectTrack = async (item: ITrackResponse | null) => {
        const response = await SetPlayingTrack(item);
        if (response) {
            initQueue(response);
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
        <div className="w-full h-full pt-[7%] px-[15%] text-white relative">
            {
                playingReducer.album ?
                <img alt="bg" src={`${baseUrl}Images/AlbomTemplates/${playingReducer.album?.albomDto?.templateimage}`} className="fixed top-0 left-0 object-cover bg-cover w-full" style={{zIndex: -1}} />
                :
                null
            }
            <div className="w-full h-full grid grid-cols-5 gap-12">
                <div className="flex justify-end col-span-2">
                    <div className="flex flex-col fixed">
                    { playingReducer.loading || !playingReducer.album ? 
                            <div className="h-96 w-96 object-cover rounded-xl bg-gray-700 animate-pulse" >

                            </div> 
                            : 
                            <img alt="singleImage" src={`${baseUrl}Images/AlbomImages/${playingReducer.album?.albomDto?.image}`}
                            className="h-96 w-96 object-cover rounded-xl bg-cover" />
                        }
                        <div className="py-3 flex items-center justify-between w-full">
                            <div className="flex items-center justify-center w-[38px] h-[38px] rounded-full cursor-pointer bg-white">
                                <img alt="icon" className="w-[18px]" src={icon_shuffle} />
                            </div>
                            <div className="flex items-center justify-center w-[38px] h-[38px] rounded-full cursor-pointer bg-white">
                                <img alt="icon" className="w-[14px]" src={icon_skip_forward} />
                            </div>
                            <div className="bg-no-repeat object-cover bg-cover flex items-center justify-center w-[64px] h-[64px] rounded-full cursor-pointer"
                            onClick={onPause} 
                            style={{backgroundImage: `url(${bg})`}}>
                                {
                                    playingReducer.queue?.isPlay ?
                                    <img alt="icon" className="w-[30px] -translate-x-[0.5px]" src={icon_pause} />
                                    :
                                    <img alt="icon" className="w-[30px] -translate-x-[0.8px]" src={icon_play} />

                                }
                            </div>
                            <div className="flex items-center justify-center w-[38px] h-[38px] rounded-full cursor-pointer bg-white">
                                <img alt="icon" className="w-[14px]" src={icon_skip_next} />
                            </div>
                            <div className="flex items-center justify-center w-[38px] h-[38px] rounded-full cursor-pointer bg-white">
                                <img alt="icon" className="w-[18px]" src={icon_repeat} />
                            </div>
                        </div>
                    </div>
                </div>  
                <div className="flex justify-start w-full col-span-3 mb-32 z-10">
                    <div className="flex flex-col gap-4 w-full">
                        {
                            playingReducer.loading ? 
                            <div className="flex flex-col gap-1">
                                <h1 className="font-medium font-['Lexend'] text-4xl h-8 rounded-xl bg-gray-700 w-60"></h1>
                                <p className="font-thin bg-gray-700 w-48 h-4 rounded-xl"></p>
                            </div>
                            :
                            <div className="flex flex-col gap-1">
                                <h1 className="font-medium font-['Lexend'] text-4xl">{playingReducer.album?.albomDto?.name}</h1>
                                <p className="font-thin">{playingReducer.album?.albomDto?.description}</p>
                            </div>

                        }
                        <div className="flex flex-col gap-4 overflow-y-auto pr-5">
                        { playingReducer.loading ? 
                                <div className="flex flex-col gap-4">
                                    <div className="w-full h-10 object-cover rounded-xl bg-gray-500 animate-pulse"></div> 
                                    <div className="w-full h-10 object-cover rounded-xl bg-gray-500 animate-pulse"></div> 
                                    <div className="w-full h-10 object-cover rounded-xl bg-gray-500 animate-pulse"></div> 
                                </div>
                                :
                                <div className="flex flex-col gap-[18px]">
                                    {
                                        playingReducer.tracks?.map(item => {
                                            return (
                                                <SoundItem key={Guid.create().toString()} name={`${item.trackCreators?.join(", ")} - ${item.track?.name}`} 
                                                isLiked={true}
                                                isPlay={playingReducer.queue && item.track ? playingReducer.queue.soundobjs[0].track?.returnId === item.track.returnId && playingReducer.queue?.isPlay : false} 
                                                duration={item.track?.duration.replace(",", ":").substring(0, 4)} onClick={() => {onSelectTrack(item)}} />
                                            )
                                        })
                                    }
                                </div>                      
                            }

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}