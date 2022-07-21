import { Guid } from "guid-typescript";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { baseUrl, defaultBackgroundImage } from "../../../../../types";
import { ISoundItemSingle } from "./types";

const icon_trash = require('../../../../../Assets/Icons/Trash.png');

export const SoundItemSingle: React.FC<ISoundItemSingle> = ({ item, listening, onDelete }) => {
    const nav = useNavigate();
    return (
        <div className="playlistCardMain flex gap-20 cursor-pointer text-dark-200 relative">
            <div className="flex w-full gap-4 ">
                <div className={`p-3 grid grid-rows-1 grid-cols-12 gap-4 w-full overflow-hidden plCardMailSelect`}>
                    <div className="flex flex-col items-start justify-between col-span-4">
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
                        <div className="flex gap-2 playlistCardMailOptions mt-4">
                            <img className="invert w-[28px]" alt="trash" src={icon_trash} onClick={onDelete} />
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center col-span-4">
                        <h1 className="text-xl">Date</h1>
                        {
                            item.track?.create &&
                            <p className="text-dark-200/90 font-medium whitespace-nowrap">{moment(new Date(item.track?.create)).format("DD.MM.YYYY")}</p>
                        }
                    </div>
                    <div className="flex flex-col items-center justify-center col-span-4">
                        <h1 className="text-xl">Listening</h1>
                        {
                            listening &&
                            <p className="text-dark-200/90 font-medium whitespace-nowrap">{listening}</p>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}