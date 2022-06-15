import { faArrowDown, faCircleChevronLeft, faCircleChevronRight, faCirclePlay, faHeart, faShareFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Guid } from "guid-typescript";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useActions } from "../../../../Hooks/useActions";
import { useTypedSelector } from "../../../../Hooks/useTypedSelector";
import { IGetTracksRequest, ITrackResponse } from "../../../../Redux/Reducers/SelectAlbumReducer/types";
import { baseUrl } from "../../../../types";
import { SoundItem } from "../../../Commons/SoundItem";

export const ListeningSingle : React.FC = () => {
    const {id} = useParams();
    const selectAlbumReducer = useTypedSelector(state => state.selectedAlbumReducer);

    const {initSelectAlbum, initSelectTrack, clearSelectTrack, getTracks} = useActions();
    const nav = useNavigate();

    useEffect(() => {
        const work = async () => {
            const selectedAlbum = localStorage.getItem("selectedSingle");
            if (selectedAlbum && id) {  
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
        if (item) {
            const getSelectTrack = localStorage.getItem("selectTrack");
            if (getSelectTrack) {
                await clearSelectTrack();
                localStorage.removeItem("selectTrack");
                return;
            }
            localStorage.setItem("selectTrack", JSON.stringify(item));
            await initSelectTrack(item);
            // if (!selectAlbumReducer.isPlay) {
            //     localStorage.setItem("selectTrack", JSON.stringify(item));
            //     await initSelectTrack(item);
            //     await PlaySelectTrack(item.track? item.track.returnId : null);
            //     return;
            // }
            // await PlaySelectTrack(null);
            //await clearSelectTrack();
            //await PlaySelectTrack(item.track? item.track.returnId : null);
        }
    }
    
    return (
        <div className="w-full h-full mt-[7%] px-[15%] text-white relative">
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
                            <div className="h-96 w-96 object-cover rounded-xl bg-gray-500 animate-pulse" >

                            </div> 
                            : 
                            <img alt="singleImage" src={`${baseUrl}Images/AlbomImages/${selectAlbumReducer.album?.albomDto?.image}`}
                            className="h-96 w-96 object-cover rounded-xl bg-cover" />
                        }
                        <div className="py-3 flex items-center justify-between w-full">
                            <FontAwesomeIcon className="text-3xl cursor-pointer transition-all hover:text-blue-400" icon={faShareFromSquare} />
                            <FontAwesomeIcon className="text-3xl cursor-pointer transition-all hover:text-blue-400" icon={faCircleChevronLeft} />
                            <FontAwesomeIcon className="text-5xl text-blue-400 cursor-pointer transition-all hover:scale-105" icon={faCirclePlay} />
                            <FontAwesomeIcon className="text-3xl cursor-pointer transition-all hover:text-blue-400" icon={faCircleChevronRight} />
                            <FontAwesomeIcon className="text-3xl cursor-pointer transition-all hover:text-blue-400" icon={faHeart} />
                        </div>
                    </div>
                </div>
                <div className="flex justify-start w-full col-span-3 mb-32">
                    <div className="flex flex-col gap-4 w-full">
                        {
                            selectAlbumReducer.loading ? 
                            <div className="flex flex-col gap-1">
                                <h1 className="font-medium font-['Lexend'] text-4xl h-8 rounded-xl bg-gray-500 w-60 animate-pulse"></h1>
                                <p className="font-thin bg-gray-500 w-48 h-4 rounded-xl animate-pulse"></p>
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
                                selectAlbumReducer.tracks?.map(item => {
                                    return (
                                        <SoundItem key={Guid.create().toString()} name={`${item.trackCreators?.join(", ")} - ${item.track?.name}`} 
                                        isLiked={true} 
                                        isPlay={selectAlbumReducer.selectTrack?.track?.returnId === item.track?.returnId} 
                                        duration={item.track?.duration.replace(",", ":").substring(0, 4)} onClick={() => {onSelectTrack(item)}} />
                                    )
                                })
                            }
                            <div className="w-full flex justify-end mt-5">
                                <button onClick={FetchNext}><FontAwesomeIcon className="text-2xl bg-white text-black rounded-full px-4 py-3" icon={faArrowDown} /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}