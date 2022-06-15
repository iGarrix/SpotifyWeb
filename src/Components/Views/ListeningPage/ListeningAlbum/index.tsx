import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useActions } from "../../../../Hooks/useActions";
import { useTypedSelector } from "../../../../Hooks/useTypedSelector";
import { IPagableMyAlbumItem } from "../../../../Redux/Reducers/MyAlbumReducer/types";
import { IPagableMySingleItem } from "../../../../Redux/Reducers/MySingleReducer/types";
import { baseUrl } from "../../../../types";
import { SoundItem } from "../../../Commons/SoundItem";

export const ListeningAlbum : React.FC = () => {

    const {id} = useParams();
    const selectAlbumReducer = useTypedSelector(state => state.selectedAlbumReducer);

    const {initSelectAlbum} = useActions();
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

    const onSelectTrack = () => {

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
                        <div className="py-3 flex justify-between w-full">
                            <div className="bg-indigo-400 rounded-full w-12 h-12"></div>
                            <div className="bg-indigo-400 rounded-full w-12 h-12"></div>
                            <div className="bg-indigo-400 rounded-full w-12 h-12"></div>
                            <div className="bg-indigo-400 rounded-full w-12 h-12"></div>
                            <div className="bg-indigo-400 rounded-full w-12 h-12"></div>
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
                            <SoundItem name={"Big baby tape - Dirrt"} isLiked={true} isPlay={true} duration={"02:10"} onClick={() => { }} />
                            <SoundItem name={"Big baby tape - Windows"} isLiked={false} isPlay={false} duration={"02:10"} onClick={() => {}} />

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}