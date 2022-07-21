import { faCompactDisc } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Guid } from "guid-typescript";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { useActions } from "../../../Hooks/useActions";
import { useTypedSelector } from "../../../Hooks/useTypedSelector";
import { IGenre, IGetAllGenreRequest } from "../../../Redux/Reducers/GenreReducer/types";
import { DefaultButton } from "../../Commons/Buttons/DefaultButton";
import { GenreItem } from "../../Commons/Cards/GenreCard";

export const Genres: React.FC = () => {

    const nav = useNavigate();
    const { getAllGenre, addGenre, clearGenrePlaylist } = useActions();
    const rx = useTypedSelector(state => state.genreReducer);
    const genre = useTypedSelector(state => state.genreReducer.genres);
    const user = useTypedSelector(state => state.userReducer.profile);
    const scrollHadler = async () => {
        if (document.documentElement.scrollHeight - (document.documentElement.scrollTop + window.innerHeight) <= 0) {
            if (rx.nextPage && !rx.loading) {
                const top = document.documentElement.scrollTop;
                await FetchNext();
                document.documentElement.scrollTop = top;
            }
        }
    }
    useEffect(() => {
        const fetchData = async () => {
                const rq: IGetAllGenreRequest = {
                    page: 1
                }
                await getAllGenre(rq);
        }
        fetchData();
    }, []);
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
        if (rx.genres && rx.nextPage && user) {
            const rq: IGetAllGenreRequest = {
                page: rx.nextPage,
            }
            await addGenre(rq);
        }
    }
    const onSelectGenre = async (item: IGenre | null) => {
        if (item) {
            clearGenrePlaylist();
            nav(item?.name);
        }
    }
    return (
        <div className="w-full h-full flex flex-col justify-start py-8 pl-[5%] pr-[2%] items-center relative">
            <Helmet>
                <title>Soundwave | Genres all</title>
            </Helmet>
            <div className="w-full flex flex-col gap-5">
                <h1 className="font-semibold text-2xl">Genres</h1>
                {
                    genre ?
                    <div className="flex  gap-[18px] flex-wrap">
                        {
                            genre?.map(item => {
                                return (
                                    <GenreItem key={Guid.create().toString()} onClick={() => { onSelectGenre(item) }} name={item.name} image={item.image} />
                                )
                            })
                        }
                    </div>
                    :
                    <div className="flex flex-col gap-6 w-full h-full pt-[10%]">
                        <FontAwesomeIcon className="text-7xl font-medium text-dark-200" icon={faCompactDisc} />
                        <div className="flex flex-col items-center gap-8 text-dark-200">
                            <div className="flex flex-col gap-3 items-center">
                            <h1 className="font-medium text-3xl">Genre not found</h1>
                                <p className="font-medium text-xl">You can also search your favorite playlists</p>
                                <p className="font-medium text-xl">"{rx.error}"</p>
                            </div>
                            <div>
                                <DefaultButton onClick={() => { nav("/search") }} text={"Go to search"} />
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}