import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Guid } from "guid-typescript";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useActions } from "../../../../Hooks/useActions";
import { useTypedSelector } from "../../../../Hooks/useTypedSelector";
import { defaultAvatarImage, GetUserAvatar } from "../../../../types";
import { DefaultButton } from "../../../Commons/Buttons/DefaultButton";

export const MyMediaLibraryCreators: React.FC = () => {
    const nav = useNavigate();
    const { getMyMediaLibraryArtists, addMyMediaLibraryArtists } = useActions();
    const rx = useTypedSelector(state => state.myMediaLibraryReducer);
    const artists = useTypedSelector(state => state.myMediaLibraryReducer.artists);
    const user = useTypedSelector(state => state.userReducer.profile);
    const { t } = useTranslation();
    const scrollHadler = async () => {
        if (document.documentElement.scrollHeight - (document.documentElement.scrollTop + window.innerHeight) <= 0) {
            if (rx.nextPage && !rx.loading) {
                const top = document.documentElement.scrollTop;
                await FetchNext();
                document.documentElement.scrollTop = top;
            }
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            if (user) {
                await getMyMediaLibraryArtists(1, user.email);
            }
        }
        fetchData();
    }, [user]);
    useEffect(() => {
        const listener = () => {
            document.addEventListener("scroll", scrollHadler);
        }
        listener();

        return function () {
            document.removeEventListener("scroll", scrollHadler);
        }

    }, [rx.nextPage && rx.loading])
    const FetchNext = async () => {
        if (rx.albums && rx.nextPage && user) {
            await addMyMediaLibraryArtists(1, user.email);
        }
    }
    return (
        <div className="w-full h-full flex flex-col justify-start items-center py-8 gap-12 relative">
            <Helmet>
                <title>Soundwave | MyMediaLibraryCreators</title>
            </Helmet>
            {
                artists && rx.error.length === 0 ?
                    <div className="w-full flex flex-col items-center gap-20">
                        <div className="grid grid-cols-4 mm:grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-16">
                            {
                                artists.map(item => {
                                    return (
                                        <div key={Guid.create().toString()} className="flex flex-col cursor-pointer text-dark-200 dark:text-light-200 gap-1 mm:w-auto" onClick={() => { nav("/overview/" + item.username) }}>
                                            <img alt="artist" src={GetUserAvatar(item)}
                                                onError={(tg: any) => { tg.target.src = defaultAvatarImage }}
                                                className="w-52 h-52 mm:w-[110px] mm:h-[110px] sm:w-[100px] sm:h-[100px] md:w-[124px] md:h-[124px] lg:w-[164px] lg:h-[164px] xl:w-[186px] xl:h-[186px] bg-cover object-cover bg-no-repeat rounded-xl transition-all hover:shadow-xl" />
                                            <p className="text-center font-medium">{item.username}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    :
                    <>
                        <FontAwesomeIcon className="text-7xl mt-[10vh] font-medium text-dark-200 dark:text-light-200" icon={faCircleUser} />
                        <div className="flex flex-col items-center gap-8 text-dark-200 dark:text-light-200">
                            <div className="flex flex-col gap-3 items-center">
                                <h1 className="font-medium text-3xl mm:text-2xl text-center">{t("Save you first artist")}</h1>
                                <p className="font-medium text-xl mm:text-lg text-center">{t("You can also login your account")}</p>
                            </div>
                            <div>
                                <DefaultButton onClick={() => { nav("/search") }} text={t("Save you first artist")} />
                            </div>
                        </div>
                    </>
            }
        </div>
    );
};
