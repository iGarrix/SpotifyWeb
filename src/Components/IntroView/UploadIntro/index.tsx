import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { RedirectButton } from "../../Commons/Buttons/RedirectButton";

const icon_music = require('../../../Assets/Icons/Upload.png');

export const UploadIntro: React.FC = () => {
    const nav = useNavigate();
    const { t } = useTranslation();
    const navigate = (path: string) => {
        nav(path, { replace: true });
    }
    return (
        <div className="overflow-hidden w-screen h-full text-light-100 flex flex-col justify-center items-center bg-light-100 dark:bg-dark-100 relative">
        <Helmet>
            <title>Soundwave | Uploading</title>
        </Helmet>
        <div className="flex flex-col items-center gap-4 z-[10] relative mm:w-full mm:h-full sm:w-full sm:h-full">
            <img alt="bg" src={require('../../../Assets/Subtract.png')} className="rounded-2xl mm:rounded-none sm:rounded-none absolute top-0 left-0 h-full bg-cover object-cover mm:w-full mm:h-full sm:w-full sm:h-full" />
            <div className="flex flex-col items-center justify-center z-10 py-20 px-[220px] mm:px-2 sm:px-[3%] gap-16 h-full w-full">
                <h1 className="font-semibold text-3xl font-['Lexend'] text-center">Upload content</h1>
                <div className="flex flex-col gap-8">
                    <RedirectButton text={t("Upload album, more song")} icon={icon_music} onClick={() => { navigate('album') }} />
                    <RedirectButton text={t("Upload single, 1 song")} icon={icon_music} onClick={() => { navigate('single') }} />
                </div>
            </div>
        </div >
    </div >
    )
}
