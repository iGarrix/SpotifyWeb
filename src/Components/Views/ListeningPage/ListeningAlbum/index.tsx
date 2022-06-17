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
    const selectAlbumReducer = useTypedSelector(state => state.selectedAlbumReducer);

    const {initSelectAlbum, initQueue, getTracks} = useActions();
    const nav = useNavigate();

    useEffect(() => {
        const work = async () => {
            const selectedAlbum = localStorage.getItem("selectedAlbum");
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
            if (id && !selectAlbumReducer.tracks) {
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
        if (selectAlbumReducer.tracks && selectAlbumReducer.nextPage && id) {       
            const rq: IGetTracksRequest = {
                albomId: id,
                page: selectAlbumReducer.nextPage,
            }
            await getTracks(rq);
        }
    }

    const onSelectTrack = async (item: ITrackResponse | null) => {
        const response = await SetPlayingTrack(item);
        if (response) {
            await initQueue(response);
        }
    }
    
    return (
        <div className="w-full h-full pt-[7%] px-[15%] text-white relative">
            {
                selectAlbumReducer.album ?
                <img alt="bg" src={`${baseUrl}Images/AlbomTemplates/${selectAlbumReducer.album?.albomDto?.templateimage}`} className="fixed top-0 left-0 object-cover bg-cover w-full" style={{zIndex: -1}} />
                :
                null
            }
            <div className="w-full h-full grid grid-cols-5 gap-12">
                <div className="flex justify-end col-span-2">
                    <div className="flex flex-col fixed">
                    { selectAlbumReducer.loading || !selectAlbumReducer.album ? 
                            <div className="h-96 w-96 object-cover rounded-xl bg-gray-700 animate-pulse" >

                            </div> 
                            : 
                            <img alt="singleImage" src={`${baseUrl}Images/AlbomImages/${selectAlbumReducer.album?.albomDto?.image}`}
                            className="h-96 w-96 object-cover rounded-xl bg-cover" />
                        }
                        <div className="py-3 flex items-center justify-between w-full">
                            <div className="flex items-center justify-center w-[38px] h-[38px] rounded-full cursor-pointer bg-white">
                                <img alt="icon" className="w-[18px]" src={icon_shuffle} />
                            </div>
                            <div className="flex items-center justify-center w-[38px] h-[38px] rounded-full cursor-pointer bg-white">
                                <img alt="icon" className="w-[14px]" src={icon_skip_forward} />
                            </div>
                            <div className="bg-no-repeat object-cover bg-cover flex items-center justify-center w-[64px] h-[64px] rounded-full cursor-pointer" style={{backgroundImage: `url(${bg})`}}>
                                <img alt="icon" className="w-[38px] -translate-x-[1px]" src={icon_play} />
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
                            selectAlbumReducer.loading ? 
                            <div className="flex flex-col gap-1">
                                <h1 className="font-medium font-['Lexend'] text-4xl h-8 rounded-xl bg-gray-700 w-60"></h1>
                                <p className="font-thin bg-gray-700 w-48 h-4 rounded-xl"></p>
                            </div>
                            :
                            <div className="flex flex-col gap-1">
                                <h1 className="font-medium font-['Lexend'] text-4xl">{selectAlbumReducer.album?.albomDto?.name}</h1>
                                <p className="font-thin">{selectAlbumReducer.album?.albomDto?.description}</p>
                            </div>

                        }
                        <div className="flex flex-col gap-4 overflow-y-auto pr-5">
                        { selectAlbumReducer.loading ? 
                                <div className="flex flex-col gap-4">
                                    <div className="w-full h-10 object-cover rounded-xl bg-gray-500 animate-pulse"></div> 
                                    <div className="w-full h-10 object-cover rounded-xl bg-gray-500 animate-pulse"></div> 
                                    <div className="w-full h-10 object-cover rounded-xl bg-gray-500 animate-pulse"></div> 
                                </div>
                                :
                                <div className="flex flex-col gap-[18px]">
                                    {
                                        selectAlbumReducer.tracks?.map(item => {
                                            return (
                                                <SoundItem key={Guid.create().toString()} name={`${item.trackCreators?.join(", ")} - ${item.track?.name}`} 
                                                isLiked={true}
                                                isPlay={selectAlbumReducer.queue && item.track ? selectAlbumReducer.queue.soundobjs[0].track?.returnId === item.track.returnId && selectAlbumReducer.queue?.isPlay : false} 
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