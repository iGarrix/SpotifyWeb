import React from "react";
import { useNavigate } from "react-router-dom";
import { useTypedSelector } from "../../../../Hooks/useTypedSelector";
import { baseUrl } from "../../../../types";
import InputRange from 'react-input-range';
import "react-input-range/lib/css/index.css";

const icon_share = require('../../../../Assets/Icons/Share.png');
const icon_vol = require('../../../../Assets/Icons/VolumeFull.png');

const icon_queue = require('../../../../Assets/Icons/Queue.png');
export const PlayingFooter : React.FC = () => {
    
    const rx = useTypedSelector(state => state.playingReducer.queue);

    const nav = useNavigate();

    // const audio = useRef<HTMLAudioElement>(null);
    // console.log(audio);
    // audio?.current?.play();

    //const [audio, setAudio] = useState(new Audio(baseUrl + "rackStorage/Tracks/" + rx?.soundobjs[0].track?.tracknameid))

    // useEffect(() => {

    // }, [])

    // const onPlay = () => {

    // }
    // const onNext = () => {

    // }
    // const onPrev = () => {

    // }

    // const onMute = () => {

    // }

    const onNav = (path: string) => {
        if (window.location.pathname !== "/" + path) {      
            nav(path);
        }
        else {
            nav(-1);
        }
    }

    return (
        <>
            {
                rx && rx.soundobjs && rx.soundobjs[0].trackCreators ? 
                <div className="w-full bg-gradient-to-tr from-dark-200/90 to-dark-200/70  backdrop-blur-lg text-white grid grid-cols-12 relative">
                    <div className="flex items-end pb-4 px-10 py-2 gap-3 z-10 col-span-2">
                        <img alt="image" className="h-[55px] w-[55px] rounded-xl object-cover bg-cover bg-no-repeat"
                        src={baseUrl + "Images/Tracks/" + rx.soundobjs[0].track?.image} />
                        <div className="flex flex-col justify-center">
                            <div className="flex gap-3 items-center">
                                <h1 className="font-semibold text-lg">{rx.soundobjs[0].trackCreators[0].username} {rx.soundobjs[0].trackCreators.length > 1 ? " ..." : ""}</h1> 
                                <img alt="icon" className="w-[24px] h-[24px] cursor-pointer object-cover bg-cover bg-no-repeat" src={icon_share}/>
                            </div>
                            <p className="">{rx.soundobjs[0].track?.name}</p>
                        </div>
                    </div>
                    <div className="flex bg-white/40 col-span-8 overflow-hidden px-20">
                        <div className="flex flex-col items-center w-full">
                            <InputRange
                                    maxValue={20}
                                    minValue={0}
                                    value={1}
                                    onChange={(v : any) => {console.log(v)}}/>
                        </div>
                    </div>
                    <div className="flex items-end pb-4 px-10 py-2 gap-5 z-10 col-span-2">
                        <div className="bg-white rounded-full w-[32px] h-[32px] flex items-center justify-center" onClick={() => {onNav('queue');}}>
                            <img alt="icon" className="w-[23px] h-[23px] cursor-pointer" src={icon_queue}/>
                        </div>
                        <div className="bg-white rounded-full w-[32px] h-[32px] flex items-center justify-center">
                            <img alt="icon" className="w-[23px] h-[23px] cursor-pointer" src={icon_vol}/>
                        </div>
                    </div>
                </div>
                : null
            }
        </>
    )
}