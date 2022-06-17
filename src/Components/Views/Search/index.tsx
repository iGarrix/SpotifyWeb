import React from "react";
import { useSearchParams } from "react-router-dom";

export const Search : React.FC = (props) => {
    const [search] = useSearchParams();

    return (
        <div>
            Searh : {search.get("query")}
        </div>
    )
}