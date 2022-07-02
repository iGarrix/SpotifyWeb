import React from "react";
import { Helmet } from "react-helmet";
import { useSearchParams } from "react-router-dom";

export const Search: React.FC = (props) => {
    const [search] = useSearchParams();

    return (
        <div>
            <Helmet>
                <title>Soundwave | Search all</title>
            </Helmet>
            Searh : {search.get("query")}
        </div>
    )
}