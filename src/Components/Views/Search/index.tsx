import React from "react";
import { useParams, useSearchParams } from "react-router-dom";

export const Search : React.FC = (props) => {
    const [search, setSearch] = useSearchParams();

    return (
        <div>
            Searh : {search.get("query")}
        </div>
    )
}