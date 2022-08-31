import { faMusic } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Guid } from "guid-typescript";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useActions } from "../../../../Hooks/useActions";
import { useTypedSelector } from "../../../../Hooks/useTypedSelector";
import { IGetAllMySingleRequest } from "../../../../Redux/Reducers/MySingleReducer/types";
import { DefaultButton } from "../../../Commons/Buttons/DefaultButton";
import { SoundItemSingle } from "../../../Commons/Cards/CreativeStudioCards/SingleCard";

export const StudioSingle: React.FC = () => {
    const nav = useNavigate();
    const { t } = useTranslation();
    const { getMySingle, addMySingle, removeTrack } = useActions();
    const rx = useTypedSelector(state => state.mySingleReducer);
    const singles = useTypedSelector(state => state.mySingleReducer.singles);
    const user = useTypedSelector(state => state.userReducer.profile);
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
                const rq: IGetAllMySingleRequest = {
                    email: user.email,
                    page: 1
                }
                await getMySingle(rq);
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
        if (rx.singles && rx.nextPage && user) {
            const rq: IGetAllMySingleRequest = {
                email: user?.email,
                page: rx.nextPage,
            }
            await addMySingle(rq);
        }
    }
    const onRemoveTrack = async (item: string | any) => {
        try {
            if (item) {
                await removeTrack(item);
                if (user) {
                    const rq: IGetAllMySingleRequest = {
                        email: user.email,
                        page: 1
                    }
                    await getMySingle(rq);
                }
            }
        } catch (error) {
        }
    };
    return (
        <div className="w-full px-[3%] py-[2%] flex flex-col gap-6 items-start text-dark-200 dark:text-light-200 bg-no-repeat">
            <Helmet>
                <title>Soundwave | Manage Single</title>
            </Helmet>
            <div className="flex flex-col gap-8 w-full h-full">
                <h1 className="font-semibold text-2xl mm:text-center">{t("Manage my single")}</h1>
                <div className="flex flex-col gap-10 mm:gap-4 w-full">
                    {
                        singles && rx.error.length === 0 ?
                            singles?.map(item => {
                                return (
                                    <div key={Guid.create().toString()} className="grid grid-cols-12 w-full">
                                        <div className="col-span-12 w-full">
                                            <SoundItemSingle
                                                item={item}
                                                onDelete={async () => await onRemoveTrack(item.track?.returnId)} />
                                        </div>
                                    </div>
                                )
                            })
                            :
                            <>
                                <FontAwesomeIcon className="text-7xl mt-[10vh] font-medium text-dark-200 dark:text-light-200 mm:mt-[20%]" icon={faMusic} />
                                <div className="flex flex-col items-center gap-8 text-dark-200 dark:text-light-200">
                                    <div className="flex flex-col gap-3 items-center">
                                        <h1 className="font-medium text-3xl text-center">{t("Uplaod you first single")}</h1>
                                        <p className="font-medium text-xl text-center">{t("You can also upload a new album or create new playlist")}</p>
                                    </div>
                                    <div>
                                        <DefaultButton onClick={() => { nav("/upload") }} text={t("Upload you first single")} />
                                    </div>
                                </div>
                            </>
                    }
                </div>
            </div>
        </div>
    );
};