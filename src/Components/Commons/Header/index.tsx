import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";
import { DefaultInput } from "../Inputs/DefaultInput";

const logo = require("../../../Assets/Logo.png");

export const Header : React.FC = () => {

    const nav = useNavigate();

    const onSearch = (value: string) => {
        console.log(value);
    }

    return (
        <div className="py-2 px-10 bg-dark-200 flex justify-end">
            <div className="flex gap-14">
                <DefaultInput placeholder="Search" icon={<FontAwesomeIcon icon={faSearch} /> } onChange={(e: any) => {onSearch(e.target.value)}} />
                <img alt="avatar" src="https://www.blexar.com/avatar.png" className="rounded-xl cursor-pointer transition-all" width={50} height={50} />
            </div>
        </div>
    )
}