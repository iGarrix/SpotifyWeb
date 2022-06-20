import React from "react";
import { useNavigate } from "react-router-dom";
import { useTypedSelector } from "../../../../Hooks/useTypedSelector";
import { baseUrl } from "../../../../types";

const icon_share = require('../../../../Assets/Icons/Share.png');
const icon_vol = require('../../../../Assets/Icons/VolumeFull.png');

const icon_history = require('../../../../Assets/Icons/History.png');
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
                <div className="w-full bg-gradient-to-tr from-dark-200/80 to-dark-200/30  backdrop-blur-lg text-white flex justify-between items-center py-[15px] px-[50px] relative">
                    <div className="flex gap-3 z-10">
                        <img alt="image" className="h-[55px] w-[55px] rounded-xl object-cover bg-cover bg-no-repeat"
                        src={baseUrl + "Images/Tracks/" + rx.soundobjs[0].track?.image} />
                        <div className="flex flex-col justify-center">
                            <div className="flex gap-3 items-center">
                                <h1 className="font-semibold text-lg">{rx.soundobjs[0].trackCreators.map(i => i.username).join(', ')}</h1> 
                                <img alt="icon" className="w-[24px] h-[24px] cursor-pointer object-cover bg-cover bg-no-repeat" src={icon_share}/>
                            </div>
                            <p className="">{rx.soundobjs[0].track?.name}</p>
                        </div>
                    </div>
                    <div className="z-10">
                        
                    </div>
                    <div className="flex gap-5 z-10">
                        <div className="bg-white rounded-full w-[32px] h-[32px] flex items-center justify-center" onClick={() => {onNav('queue');}}>
                            <img alt="icon" className="w-[23px] h-[23px] cursor-pointer" src={icon_queue}/>
                        </div>
                        <div className="bg-white rounded-full w-[32px] h-[32px] flex items-center justify-center" onClick={() => {onNav('history');}}>
                            <img alt="icon" className="w-[23px] h-[23px] cursor-pointer" src={icon_history}/>
                        </div>
                        <div className="bg-white rounded-full w-[32px] h-[32px] flex items-center justify-center">
                            <img alt="icon" className="w-[23px] h-[23px] cursor-pointer" src={icon_vol}/>
                        </div>
                        <div className="bg-green-500">
                           
                        </div>
                    </div>
                </div>
                : null
            }
        </>
    )
}