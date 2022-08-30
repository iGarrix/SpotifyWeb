import { Guid } from "guid-typescript";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ISoundOptionModal } from "./types";

export const SoundOptionModal: React.FC<ISoundOptionModal> = ({ trigger, options }) => {

    const fixeddropdown = useRef<HTMLDivElement>(null);
    const [isOpen, setOpen] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        const handleClick = (event: any) => {
            setOpen(false);
        };

        const element = fixeddropdown.current;

        element?.addEventListener('mouseleave', handleClick);
        return () => {
            element?.removeEventListener('mouseleave', handleClick);
        };
    }, []);

    const Addqueue = async (item: any) => {
        item.onClick();
        setOpen(false);
    }
    return (
        <div className="relative flex flex-col">
            <div onClick={() => { setOpen(!isOpen) }}>
                {trigger}
            </div>
            <div ref={fixeddropdown} className={`${isOpen ? "border-light-200 dark:border-dark-200 absolute top-[100%] right-0 flex flex-col text-dark-200 bg-light-200 dark:bg-dark-100 rounded-sm overflow-hidden z-[50]"
                : "hidden"}`}>
                <div className="flex flex-col">
                    {
                        options?.map(item => {
                            return (
                                <button key={Guid.create().toString()} className={`w-full h-full py-2 text-dark-200 dark:text-light-200 px-4 gap-2 items-center
                                 transition-all select-none hover:bg-primary-100 hover:text-light-100 flex`} onClick={() => { Addqueue(item) }}>
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