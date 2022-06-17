import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ISoundOptionModal } from "./types";

export const SoundOptionModal: React.FC<ISoundOptionModal> = ({trigger}) => {

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


    return (
        <div className="relative flex flex-col">
            <div onClick={() => {setOpen(!isOpen)}}>
                {trigger}
            </div>
            <div ref={fixeddropdown} className={`${isOpen ? "border-dark-100/20 fixed flex flex-col text-white bg-dark-200/80 rounded-sm overflow-hidden" 
            : "hidden"}`}>
                <div>
                    <h1>OPTION</h1>
                </div>
            </div>
        </div>
    )
}