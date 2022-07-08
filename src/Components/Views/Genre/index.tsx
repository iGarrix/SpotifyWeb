import { Guid } from "guid-typescript";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { useActions } from "../../../Hooks/useActions";
import { useTypedSelector } from "../../../Hooks/useTypedSelector";
import { IGenre, IGetAllMyGenreRequest, IPagableMyGenreItem } from "../../../Redux/Reducers/GenreReducer/types";
import { GenreItem } from "../../Commons/Cards/GenreCard";

export const Genres: React.FC = () => {

    const nav = useNavigate();
    const { getAllGenre, addMyGenre } = useActions();
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
            if (user) {
                const rq: IGetAllMyGenreRequest = {
                    page: 1
                }
                await getAllGenre(rq);
            }
        }
        fetchData();
    }, [user]);
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
            const rq: IGetAllMyGenreRequest = {
                page: rx.nextPage,
            }
            await addMyGenre(rq);
        }
    }
    const onSelectGenre = async (item: IGenre | null) => {
        if (item) {
            nav(item?.name);
        }
    }
    return (
        <div className="w-full h-full flex flex-col justify-start py-8 px-12 items-center relative">
            <Helmet>
                <title>Soundwave | Genres all</title>
            </Helmet>
            <div className="w-full flex flex-col gap-5">
                <h1 className="font-semibold text-2xl">Genres</h1>
                <div className="flex items-center gap-6 flex-wrap justify-between">
                    {
                        genre?.map(item => {
                            return (
                                <GenreItem key={Guid.create().toString()} onClick={() => { onSelectGenre(item) }} name={item.name} image={item.image} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}