import React, { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import { createSearchParams, Outlet, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useActions } from "../../../Hooks/useActions";
import { FilterButton } from "../../Commons/Buttons/FilterButton";
import { SearchField } from "../../Commons/Inputs/SearchField";

const icon_search = require('../../../Assets/Icons/Search.png');

export const Search: React.FC = () => {

    const { ClearSearchXHR } = useActions();
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState<string>(() => {
        const initQuery = searchParams.get('query');
        if (initQuery) {
            return initQuery;
        }
        return "";
    });
    const nav = useNavigate();
    const history = useLocation();

    useEffect(() => {
        if (searchQuery && searchQuery.length != 0) {
            onSearch(searchQuery)
        }
    }, [searchQuery]);

    useEffect(() => {
        ClearSearchXHR();
    }, [])

    const onSearch = (value: string) => {
        setSearchParams({query: value});
    }

    const onNavigateFilter = (value: string) => {
        const query = searchParams.get('query');
        if (query) {
            nav({
                pathname: value,
                search: `?${createSearchParams({query: query})}`,
            });
        }
        else {
            nav(value);
        }
        
    }

    return (
        <div className="w-full h-full text-dark-200">
            <Helmet>
                <title>Soundwave | Search all</title>
            </Helmet>
            <div className="w-full flex flex-col px-12 py-8 gap-8">
                <div className="flex flex-col gap-4">
                    <div className="flex w-[40%]">
                        <SearchField placeholder={"Search"} value={searchQuery} onChange={(e: any) => {
                            setSearchQuery(e.target.value)
                        }} icon={<img alt="icon" className="invert w-[28px]" src={icon_search} />} />
                    </div>
                    <div className="flex gap-4">
                        <FilterButton text="All result" isSelected={history.pathname == "/search"} onClick={() => {onNavigateFilter("")}} />
                        <FilterButton text="Albums" isSelected={history.pathname.includes("/albums")} onClick={() => {onNavigateFilter("albums")}}/>
                        <FilterButton text="Playlists" isSelected={history.pathname.includes("/playlists")} onClick={() => {onNavigateFilter("playlists")}} />
                        <FilterButton text="Tracks" isSelected={history.pathname.includes("/tracks")} onClick={() => {onNavigateFilter("tracks")}}/>
                        <FilterButton text="Creators" isSelected={history.pathname.includes("/creators")} onClick={() => {onNavigateFilter("creators")}}/>
                        <FilterButton text="Profiles" isSelected={history.pathname.includes("/profiles")} onClick={() => {onNavigateFilter("profiles")}}/>
                    </div>
                </div>
                <Outlet />
            </div>
        </div>
    )
}