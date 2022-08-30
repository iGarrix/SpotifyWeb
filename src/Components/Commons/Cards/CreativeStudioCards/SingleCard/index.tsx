import { Guid } from "guid-typescript";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { baseUrl, defaultBackgroundImage } from "../../../../../types";
import { ISoundItemSingle } from "./types";

const icon_trash = require('../../../../../Assets/Icons/Trash.png');

export const SoundItemSingle: React.FC<ISoundItemSingle> = ({ item, onDelete }) => {
    const nav = useNavigate();
    const { t } = useTranslation();
    return (
        <div className="playlistCardMain flex gap-20 text-dark-200 dark:text-light-200 relative">
            <div className="flex w-full gap-4 ">
                <div className={`p-3 grid grid-cols-12 gap-4 w-full overflow-hidden plCardMailSelect`}>
                    <div className="flex flex-col items-start justify-between col-span-5 sm:col-span-8 md:col-span-8 lg:col-span-7 xl:col-span-6 mm:col-span-full">
                        <div className="flex gap-6 items-center bg-blue-400 text-light-100 rounded-xl py-3 px-2 w-full">    
                            <h1 className="text-medium">
                                {
                                    item.trackCreators?.map(i => i.username).map((i: any, index: number) => {
                                        return (
                                            <span key={Guid.create().toString()}
                                                className="cursor-pointer hover:text-light-200" onClick={() => { nav("/overview/" + i, { replace: false }) }}>{i}{item.trackCreators?.length && index < item.trackCreators.length - 1 ? ", " : " "}</span>
                                        )
                                    })
                                }
                                <span>- {item.track?.name}</span>
                            </h1>
                            <div className="flex gap-4 items-center justify-between ml-auto">
                                {
                                    item.track &&
                                    <h1 className="text-thin w-[48px]">{moment.utc(Number.parseFloat(item.track.duration) * 1000).format("mm:ss")}</h1>
                                }
                            </div>
                        </div>
                        <div className="flex gap-2 playlistCardMailOptions mt-3 w-full mm:justify-between items-center">
                            <img className="invert dark:invert-0 w-[28px] cursor-pointer" alt="trash" src={icon_trash} onClick={onDelete} />
                            <div className="hidden mm:flex">
                                {
                                    item.track?.create &&
                                    <p className="text-dark-200/90 dark:text-light-300 font-medium whitespace-nowrap">{moment(new Date(item.track?.create)).format("DD.MM.YYYY")}</p>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col-span-7 sm:col-span-4 md:col-span-4 lg:col-span-5 xl:col-span-6 flex justify-end pr-[2%] mm:hidden">
                        <div className="flex flex-col items-center justify-center ">
                            <h1 className="text-xl">{t("Date")}</h1>
                            {
                                item.track?.create &&
                                <p className="text-dark-200/90 dark:text-light-300 font-medium whitespace-nowrap">{moment(new Date(item.track?.create)).format("DD.MM.YYYY")}</p>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}