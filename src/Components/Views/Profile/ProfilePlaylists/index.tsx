import { faArrowDown, faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Guid } from "guid-typescript";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useActions } from "../../../../Hooks/useActions";
import { useTypedSelector } from "../../../../Hooks/useTypedSelector";
import { IGetAllMyPlaylistRequest } from "../../../../Redux/Reducers/MyPlaylistReducer/types";
import { DefaultButton } from "../../../Commons/Buttons/DefaultButton";
import { QuadraticLoader } from "../../../Commons/Loaders/QuadraticLoader";
import { PlaylistItem } from "../../../Commons/PlaylistItem";

export const ProfilePlaylists: React.FC = () => {

    const nav = useNavigate();

    const { getMyPlaylists, addMyPlaylists } = useActions();

    const rx = useTypedSelector(state => state.myPlaylistReducer);
    const playlists = useTypedSelector(state => state.myPlaylistReducer.playlists);
    const user = useTypedSelector(state => state.userReducer.profile);
    // BUG PLAYLIST

    useEffect(() => {
        const fetchData = async () => {      
            if (user && !playlists && rx.error !== "List empty") {           
                const rq: IGetAllMyPlaylistRequest = {
                    email: user.email,
                    page: 1
                }
                await getMyPlaylists(rq);       
            }     
        }
        fetchData();
    }, [user, playlists]);

    const FetchNext = async () => {
        if (rx.playlists && rx.nextPage && user) {       
            const rq: IGetAllMyPlaylistRequest = {
                email: user.email,
                page: rx.nextPage,
            }
            await addMyPlaylists(rq);
        }
    }

    return (
        <div className="w-full h-full flex flex-col justify-center items-center py-8 gap-12 relative">
            {
                rx.loading ?
                    <QuadraticLoader isVisisble={true} />
                    :
                    playlists && rx.error.length === 0 ?
                    <div className="w-full flex flex-col items-center gap-20">
                        <div className="grid grid-cols-4 gap-16">
                            {
                                playlists.map(item => {
                                    return (
                                        <PlaylistItem key={Guid.create().toString()} onClick={() => { } } name={item.playlistDto?.name} title={`${item.songs} songs`} imageSrc={item.playlistDto?.image} />
                                    )
                                })
                            }  
                        </div>
                        {
                            rx.nextPage ?
                            <div className="flex w-full justify-end py-5 px-64">
                                <button onClick={FetchNext}><FontAwesomeIcon className="text-2xl bg-white text-black rounded-full px-4 py-3" icon={faArrowDown} /></button>
                            </div>
                            :
                            null
                        }
                    </div>
                    :
                    <>
                        <FontAwesomeIcon className="text-7xl font-medium" icon={faSquarePlus} />
                        <div className="flex flex-col items-center gap-8">
                            <div className="flex flex-col gap-3 items-center">
                                <h1 className="font-medium text-3xl">Create you first playlist</h1>
                                <p className="font-medium text-xl">You can also apply to verify your account</p>
                            </div>
                            <div>
                                <DefaultButton onClick={() => {nav("/createplaylist")}} text={"Create you first playlist"} />
                            </div>
                        </div>
                    </>
            }
        </div>
    )
}