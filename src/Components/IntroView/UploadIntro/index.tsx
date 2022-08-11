import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { RedirectButton } from "../../Commons/Buttons/RedirectButton";
import { Header } from "../../Commons/Header";

const icon_music = require('../../../Assets/Icons/Upload.png');

export const UploadIntro: React.FC = () => {
    const nav = useNavigate();
    const navigate = (path: string) => {
        nav(path, { replace: true });
    }
    return (
        <div className="overflow-hidden w-screen h-full text-light-100 flex flex-col justify-center items-center bg-light-100 dark:bg-dark-100 relative">
        <Helmet>
            <title>Soundwave | Uploading</title>
        </Helmet>
        <div className="flex flex-col items-center gap-4 z-[10] relative">
            <img alt="bg" src={require('../../../Assets/Subtract.png')} className="rounded-2xl absolute top-0 left-0 h-full bg-cover object-cover" />
            <div className="flex flex-col items-center justify-center z-10 py-20 px-[220px]  gap-16 h-full w-full">
                <h1 className="font-semibold text-3xl font-['Lexend'] text-center">Upload content</h1>
                <div className="flex flex-col gap-8">
                    <RedirectButton text="Upload album, more song" icon={icon_music} onClick={() => { navigate('album') }} />
                    <RedirectButton text="Upload single, 1 song" icon={icon_music} onClick={() => { navigate('single') }} />
                </div>
            </div>
        </div >
    </div >
    )
}
