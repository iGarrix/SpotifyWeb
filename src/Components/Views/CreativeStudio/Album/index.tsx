import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Guid } from "guid-typescript";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { useActions } from "../../../../Hooks/useActions";
import { useTypedSelector } from "../../../../Hooks/useTypedSelector";
import { IGetAllMyAlbumRequest, IPagableMyAlbumItem } from "../../../../Redux/Reducers/MyAlbumReducer/types";
import { DefaultButton } from "../../../Commons/Buttons/DefaultButton";
import { AlbumStudioItem } from "../../../Commons/Cards/CreativeStudioCards/AlbumCard";
import { FullScreenModal } from "../../../Commons/Modals/FullScreenModal";
import { ChangeAlbumModal } from "../../../Commons/Modals/FullScreenModal/ChangeAlbumModal";

export const StudioAlbum: React.FC = () => {
    const { getMyAlbum, addMyAlbum, removeAlbum } = useActions();
    const rx = useTypedSelector(state => state.myAlbumsReducer);
    const album = useTypedSelector(state => state.myAlbumsReducer.albums);
    const user = useTypedSelector(state => state.userReducer.profile);
    const nav = useNavigate();
    const [openModal, setOpenModal] = useState(false);
    const [selectedAlbum, setselectedAlbum] = useState<any>(null);
    const scrollHadler = async () => {
        if (document.documentElement.scrollHeight - (document.documentElement.scrollTop + window.innerHeight) <= 0) {
            if (rx.nextPage && !rx.loading) {
                const top = document.documentElement.scrollTop;
                await FetchNext();
                document.documentElement.scrollTop = top;
            }
        }
    }
    const fetchData = async () => {
        if (user && !openModal) {
            const rq: IGetAllMyAlbumRequest = {
                email: user.email,
                page: 1
            }
            await getMyAlbum(rq);
        }
    }
    useEffect(() => {
        fetchData();
    }, [user, openModal]);

    useEffect(() => {
        const listener = () => {
            document.addEventListener("scroll", scrollHadler);
        }
        listener();

        return function () {
            document.removeEventListener("scroll", scrollHadler);
        }

    }, [rx.nextPage && rx.loading])

    const FetchNext = async () => {
        if (rx.albums && rx.nextPage && user) {
            const rq: IGetAllMyAlbumRequest = {
                email: user?.email,
                page: rx.nextPage,
            }
            await addMyAlbum(rq);
        }
    }

    const onEditAlbum = (item: IPagableMyAlbumItem | null) => {
        if (item) {
            setselectedAlbum(item);
            setOpenModal(true);
            fetchData();
        }
    }

    const onRemoveAlbum = async (item: string | any) => {
        try {
            if (item) {
                await removeAlbum(item);
                if (user) {
                    const rq: IGetAllMyAlbumRequest = {
                        email: user.email,
                        page: 1
                    }
                    await getMyAlbum(rq);
                }
            }
        } catch (error) {
        }
    };

    const onSaveChanges = () => {
        setOpenModal(false);
    }

    const onCloseModal = () => {
        setOpenModal(false);
    }
    return (
        <div className="w-full px-[3%] py-[2%] flex flex-col gap-6 items-start text-dark-200 bg-no-repeat h-full">
            <Helmet>
                <title>Soundwave | Manage Albums</title>
            </Helmet>
            {
                selectedAlbum && openModal ?
                    <FullScreenModal visible center>
                        <ChangeAlbumModal album={selectedAlbum} onSave={onSaveChanges} onClose={onCloseModal} />
                    </FullScreenModal> : null
            }
            <div className="flex flex-col gap-8 w-full h-full">
                <h1 className="font-semibold text-2xl">Manage my albums</h1>
                <div className="flex flex-col gap-10 w-full">
                    {
                        album && rx.error.length === 0 ?
                            album?.map(item => {
                                return (
                                    <div key={Guid.create().toString()} className="grid grid-cols-12 w-full">
                                        <div className="col-span-12 w-full">
                                            <AlbumStudioItem
                                                id={item.albomDto?.returnId}
                                                image={item.albomDto?.image}
                                                name={item.albomDto?.name}
                                                description={item.albomDto?.description}
                                                date={item.albomDto?.releasealbom}
                                                listening={10000}
                                                onEdit={() => onEditAlbum(item)}
                                                onDelete={async () => await onRemoveAlbum(item.albomDto?.returnId)} />
                                        </div>
                                    </div>
                                )
                            })
                            :
                            <>
                                <FontAwesomeIcon className="text-7xl font-medium text-dark-200" icon={faSquarePlus} />
                                <div className="flex flex-col items-center gap-8 text-dark-200">
                                    <div className="flex flex-col gap-3 items-center">
                                        <h1 className="font-medium text-3xl">Create you first albums</h1>
                                        <p className="font-medium text-xl">You can also upload a new single or create new playlist</p>
                                    </div>
                                    <div>
                                            <DefaultButton onClick={() => { nav("/upload") }} text={"Upload you first album"} />
                                        </div>
                                </div>
                            </>
                    }
                </div>
            </div>
        </div>
    );
};