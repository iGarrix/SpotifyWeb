import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Guid } from "guid-typescript";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ISoundOptionModal } from "./types";

export const SoundOptionModal: React.FC<ISoundOptionModal> = ({trigger, options}) => {

    const fixeddropdown = useRef<HTMLDivElement>(null);
    const [isOpen, setOpen] = useState(false);

    const nav = useNavigate();

    useEffect(() => {
        const handleClick = (event : any) => {
          setOpen(false);
        };
    
        const element = fixeddropdown.current;
    
        element?.addEventListener('mouseleave', handleClick);
        return () => {
            element?.removeEventListener('mouseleave', handleClick);
          };
      }, []);


    const onNavigateClick = (path: string) => {
        nav(path);
        setOpen(false);
    }

    const Addqueue = async (item: any) => {
        item.onClick();
        setOpen(false);  
    }


    return (
        <div className="relative flex flex-col">
                <div onClick={() => {setOpen(!isOpen)}}>
                    {trigger}
                </div>
                <div ref={fixeddropdown} className={`${isOpen ? "border-dark-100/80 absolute top-[100%] right-0 flex flex-col text-white bg-dark-200 rounded-sm overflow-hidden z-[50]"
                : "hidden"}`}>
                    <div className="flex flex-col">
                        {
                            options?.map(item => {
                                return (
                                    <button key={Guid.create().toString()} className={`w-full h-full py-2 text-white px-4 gap-2 items-center transition-all select-none hover:bg-primary-100 flex`} onClick={() => {Addqueue(item)}}>
                                        {item.icon}
                                        <p className="text-[1.05rem] whitespace-nowrap">{item.title}</p>
                                    </button>
                                )
                            })
                        }
            
                    </div>
                </div>
            </div>
    )
}