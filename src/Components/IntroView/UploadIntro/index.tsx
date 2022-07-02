import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { RedirectButton } from "../../Commons/Buttons/RedirectButton";

const logo = require('../../../Assets/Logo.png');
const bg = require('../../../Assets/Background2.png');
const icon_music = require('../../../Assets/Icons/Upload.png');
export const UploadIntro: React.FC = () => {

    const nav = useNavigate();

    const navigate = (path: string) => {
        nav(path, {replace: true});
    }

    return (
        <div className="overflow-hidden w-screen h-screen text-white flex justify-center items-center bg-black relative">
            <Helmet>
                <title>Soundwave | Uploading</title>
            </Helmet>
            <div className="absolute top-0 w-screen h-1 rounded-br-lg rounded-bl-lg animate-pulse bg-blue-500 z-[10]"></div>
            <div className="absolute top-0 w-screen h-screen bg-no-repeat bg-cover object-cover opacity-10" style={{backgroundImage: `url('${bg}')`}}></div>

            <div className="flex flex-col items-center gap-4 z-[10]">
                <div className="flex flex-col items-center gap-2">
                    <img alt="logo" className="scale-110 contrast-200" src={logo} />
                    <h1 className="font-semibold text-2xl font-['Lexend']">Upload content</h1>
                </div>
                <div className="w-full flex gap-2 items-center">
                    <hr className="border-white w-full" />
                    <img alt="logo" className="w-[24px] h-[24px]" src={icon_music} />
                    <hr className="border-white w-full" />
                </div>
                <p className="font-thin text-lg px-10">Upload your content: single & album</p>
                <div className="w-full flex flex-col gap-4">
                    <RedirectButton text="Upload album, more song" icon={icon_music} onClick={() => {navigate('album')}} />
                    <RedirectButton text="Upload single, 1 song" icon={icon_music} onClick={() => {navigate('single')}} />
                </div>
            </div>
        </div>
    )
}