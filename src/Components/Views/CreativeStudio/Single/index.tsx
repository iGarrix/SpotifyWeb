import { faMusic } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Guid } from "guid-typescript";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { useActions } from "../../../../Hooks/useActions";
import { useTypedSelector } from "../../../../Hooks/useTypedSelector";
import { IGetAllMySingleRequest } from "../../../../Redux/Reducers/MySingleReducer/types";
import { DefaultButton } from "../../../Commons/Buttons/DefaultButton";
import { SoundItemSingle } from "../../../Commons/Cards/CreativeStudioCards/SingleCard";

export const StudioSingle: React.FC = () => {
    const nav = useNavigate();
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
        <div className="w-full px-[3%] py-[2%] flex flex-col gap-6 items-start text-dark-200 bg-no-repeat h-full">
            <Helmet>
                <title>Soundwave | Manage Single</title>
            </Helmet>
            <div className="flex flex-col gap-8 w-full h-full">
                <h1 className="font-semibold text-2xl">Manage my single</h1>
                <div className="flex flex-col gap-10 w-full">
                {
                            singles && rx.error.length === 0 ?
                                singles?.map(item => {
                                    return (
                                        <div key={Guid.create().toString()} className="grid grid-cols-12 w-full">
                                            <div className="col-span-12 w-full">
                                                <SoundItemSingle
                                                    item={item}
                                                    listening={1000}
                                                    onDelete={async () => await onRemoveTrack(item.track?.returnId)} />
                                            </div>
                                        </div>
                                    )
                                })
                                :
                                <>
                                    <FontAwesomeIcon className="text-7xl font-medium text-dark-200" icon={faMusic} />
                                    <div className="flex flex-col items-center gap-8 text-dark-200">
                                        <div className="flex flex-col gap-3 items-center">
                                            <h1 className="font-medium text-3xl">Create you first single</h1>
                                            <p className="font-medium text-xl">You can also apply to verify your account</p>
                                        </div>
                                        <div>
                                            <DefaultButton onClick={() => { nav("/uploads") }} text={"Upload you first single"} />
                                        </div>
                                    </div>
                                </>
                    }
                </div>
            </div>
        </div>
    );
};