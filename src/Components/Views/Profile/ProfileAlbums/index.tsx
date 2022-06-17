import { faArrowDown, faCompactDisc } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Guid } from "guid-typescript";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useActions } from "../../../../Hooks/useActions";
import { useTypedSelector } from "../../../../Hooks/useTypedSelector";
import { IGetAllMyAlbumRequest, IPagableMyAlbumItem } from "../../../../Redux/Reducers/MyAlbumReducer/types";
import { StorageVariables } from "../../../../types";
import { AlbumItem } from "../../../Commons/AlbumItem";
import { DefaultButton } from "../../../Commons/Buttons/DefaultButton";
import { QuadraticLoader } from "../../../Commons/Loaders/QuadraticLoader";

export const ProfileAlbums : React.FC = () => {

    const nav = useNavigate();

    const { getMyAlbum, addMyAlbum, clearTracks } = useActions();

    const rx = useTypedSelector(state => state.myAlbumsReducer);
    const albums = useTypedSelector(state => state.myAlbumsReducer.albums);
    const user = useTypedSelector(state => state.userReducer.profile);

    useEffect(() => {
        const fetchData = async () => {      
            if (user && !albums && rx.error !== "List empty") {           
                const rq: IGetAllMyAlbumRequest = {
                    email: user.email,
                    page: 1
                }
                await getMyAlbum(rq);       
            }     
        }
        fetchData();
    }, [user, albums]);

    const FetchNext = async () => {
        if (rx.albums && rx.nextPage && user) {       
            const rq: IGetAllMyAlbumRequest = {
                email: user?.email,
                page: rx.nextPage,
            }
            await addMyAlbum(rq);
        }
    }

    const onSelectAlbum = async (item: IPagableMyAlbumItem | null) => {
        if (item) {    
            localStorage.setItem(StorageVariables.Album, JSON.stringify(item));
            nav("/album/" + item?.albomDto?.returnId);
            await clearTracks();
        }
    }


    return (
        <div className="w-full h-full flex flex-col justify-center items-center py-8 gap-12 relative">
            {
                rx.loading ?
                <QuadraticLoader isVisisble={true} />
                :
                albums && rx.error.length === 0 ?
                <div className="w-full flex flex-col items-center gap-20">
                        <div className="grid grid-cols-4 gap-16">
                            {
                                albums.map(item => {
                                    return (
                                        <AlbumItem key={Guid.create().toString()} onClick={() => { onSelectAlbum(item) } } name={item.albomDto?.name} title={`${item.songs} songs`} imageSrc={item.albomDto?.image} />
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
                    <FontAwesomeIcon className="text-7xl font-medium" icon={faCompactDisc}  />
                    <div className="flex flex-col items-center gap-8">
                        <div className="flex flex-col gap-3 items-center">
                            <h1 className="font-medium text-3xl">Create you first album</h1>
                            <p className="font-medium text-xl">You can also apply to verify your account as an artist</p>
                        </div>
                        <div>
                            <DefaultButton onClick={() => { } } text={"Create you first album"}/>
                        </div>
                    </div>
                </>
            }
        </div>
    )
}