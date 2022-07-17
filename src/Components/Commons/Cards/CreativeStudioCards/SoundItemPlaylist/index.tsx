import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Guid } from "guid-typescript";
import moment from "moment";
import { on } from "process";
import { useNavigate } from "react-router-dom";
import { AddToQueue } from "../../../../../Helpers/QueueHelper";
import { useActions } from "../../../../../Hooks/useActions";
import { useTypedSelector } from "../../../../../Hooks/useTypedSelector";
import { baseUrl } from "../../../../../types";
import { ISoundItemPlaylist } from "./types";

const icon_trash = require('../../../../../Assets/Icons/Trash.png');
const icon_add = require('../../../../../Assets/Icons/Add.png');

export const SoundItemPlaylist: React.FC<ISoundItemPlaylist> = ({ item, onDelete, onAdd }) => {

    const { initQueue } = useActions();
    const nav = useNavigate();
    const play = useTypedSelector(state => state.playingReducer.queue?.isPlay);
    const addtoqueue = async (isPlay: any) => {
        const response = AddToQueue(item, isPlay);
        if (response) {
            await initQueue(response);
        }
    }
    const save = () => {

    }

    return (
        <div className={`flex items-center gap-3 rounded-md bg-light-200 px-4 py-[12px] bg-no-repeat object-cover bg-cover`}>
            <div className="flex gap-6">
                <div>
                    <img alt="icon" className="w-[96px] h-[96px] rounded-sm bg-no-repeat object-cover bg-cover cursor-pointer" src={baseUrl + "Images/Tracks/" + item.track?.image} />
                </div>
                <div className="flex flex-col">
                    <h1 className="text-lg">{item.track?.name}</h1>
                    <h3 className="flex gap-1">
                        Creators: 
                    {
                        item.trackCreators?.map(i => i.username).map((i: any, index: number) => {
                            return (
                                <span key={Guid.create().toString()}
                                    className="cursor-pointer hover:text-blue-400" onClick={() => { nav("/overview/" + i, { replace: false }) }}>{i}{item.trackCreators?.length && index < item.trackCreators.length - 1 ? ", " : " "}</span>
                            )
                        })
                    }
                    </h3>
                </div>
                {/* <h1 className="text-medium">
                    {
                        item.trackCreators?.map(i => i.username).map((i: any, index: number) => {
                            return (
                                <span key={Guid.create().toString()}
                                    className="cursor-pointer hover:text-blue-400" onClick={() => { nav("/overview/" + i, { replace: false }) }}>{i}{item.trackCreators?.length && index < item.trackCreators.length - 1 ? ", " : " "}</span>
                            )
                        })
                    }
                    <span>- {item.track?.name}</span>
                </h1> */}
            </div>
            <div className="flex gap-4 items-center justify-between ml-auto">
                {
                    item.track &&
                    <h1 className="text-thin w-[48px]">{moment.utc(Number.parseFloat(item.track.duration) * 1000).format("mm:ss")}</h1>
                }
                {
                    <img alt="icon" className="invert w-[25px] cursor-pointer" src={icon_trash} onClick={onDelete} />
                }
                {
                    onAdd &&
                    <img alt="icon" className="invert w-[25px] cursor-pointer" src={icon_add} onClick={onAdd} />
                }
            </div>
        </div>
    )
}