import React, { useEffect, useState, useTransition } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { createSearchParams, Outlet, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useActions } from "../../../Hooks/useActions";
import { FilterButton } from "../../Commons/Buttons/FilterButton";
import { SearchField } from "../../Commons/Inputs/SearchField";

const icon_search = require('../../../Assets/Icons/Search.png');

export const Search: React.FC = () => {

    const { ClearSearchXHR } = useActions();
    const { t } = useTranslation();
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState<string>(() => {
        const initQuery = searchParams.get('query');
        if (initQuery) {
            return initQuery;
        }
        return "";
    });
    const [isPending, startTransition] = useTransition();
    const nav = useNavigate();
    const history = useLocation();

    useEffect(() => {
        if (searchQuery && searchQuery.length != 0) {
            onSearch(searchQuery)
        }
        else{
            onSearch("");
        }
    }, [searchQuery]);

    useEffect(() => {
        ClearSearchXHR();
    }, [])

    const onSearch = (value: string) => {    
        startTransition(() => {
            setSearchParams({query: value});
        });   
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
        <div className="w-full h-full text-dark-200 dark:text-light-200">
            <Helmet>
                <title>Soundwave | Search all</title>
            </Helmet>
            <div className="w-full flex flex-col px-12 mm:px-2 py-8 gap-8">
                <div className="flex flex-col gap-4">
                    <div className="flex w-[40%] mm:w-full sm:w-full md:w-[60%] lg:w-[60%] xl:w-[50%]">
                        <SearchField placeholder={t("Search")} value={searchQuery} onChange={(e: any) => {
                            setSearchQuery(e.target.value)
                        }} icon={<img alt="icon" className="invert dark:invert-0 w-[28px]" src={icon_search} />} />
                    </div>
                    {
                        searchQuery && 
                        <div className="flex gap-4 mm:grid mm:grid-cols-2 sm:grid sm:grid-cols-3">
                            <FilterButton text={t("All result")} isSelected={history.pathname == "/search"} onClick={() => {onNavigateFilter("")}} />
                            <FilterButton text={t("Album")} isSelected={history.pathname.includes("/albums")} onClick={() => {onNavigateFilter("albums")}}/>
                            <FilterButton text={t("Playlis")} isSelected={history.pathname.includes("/playlists")} onClick={() => {onNavigateFilter("playlists")}} />
                            <FilterButton text={t("Tracks")} isSelected={history.pathname.includes("/tracks")} onClick={() => {onNavigateFilter("tracks")}}/>
                            <FilterButton text={t("Artists")} isSelected={history.pathname.includes("/artists")} onClick={() => {onNavigateFilter("artists")}}/>
                            <FilterButton text={t("Profiles")} isSelected={history.pathname.includes("/profiles")} onClick={() => {onNavigateFilter("profiles")}}/>
                        </div>
                    }
                </div>
                <Outlet />
            </div>
        </div>
    )
}