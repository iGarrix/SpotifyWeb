import { Guid } from "guid-typescript";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useActions } from "../../../../../Hooks/useActions";
import { useTypedSelector } from "../../../../../Hooks/useTypedSelector";
import { IGetAppelationRequest } from "../../../../../Redux/Reducers/NotificationReducer/types";
import { DeviceType } from "../../../../../types";
import { NotifyCard } from "../../../../Commons/Cards/NotifyCard";
import { FullScreenModal } from "../../../../Commons/Modals/FullScreenModal";
import { AnswerAppelationModal } from "../../../../Commons/Modals/FullScreenModal/AnswerAppelationModal";

export const AppelationLogs: React.FC = () => {
    const { getAppelations, addAppelations } = useActions();
    const reducer = useTypedSelector(state => state.notificationReducer);
    const user = useTypedSelector(state => state.userReducer.profile);
    const [open, setOpen] = useState(false);
    const [answer, setAnswer] = useState("");
    const scrollHadler = async () => {
        if (document.documentElement.scrollHeight - (document.documentElement.scrollTop + window.innerHeight) <= 0) {
            if (reducer.nextPage && !reducer.loading) {
                await fetchnext();
            }
        }
    }
    const fetchnext = async () => {
        if (user && reducer.nextPage) {
            const request: IGetAppelationRequest = {
                email: user.email,
                page: reducer.nextPage,
            }
            await addAppelations(request);
        }
    }
    useEffect(() => {
        const work = async (page: number) => {
            if (user) {
                const request: IGetAppelationRequest = {
                    email: user.email,
                    page: page,
                }
                await getAppelations(request);
            }
        }
        work(1);
    }, [user]);
    useEffect(() => {
        const listener = () => {
            document.addEventListener("scroll", scrollHadler);
        }
        listener();

        return function () {
            document.removeEventListener("scroll", scrollHadler);
        }

    }, [reducer.nextPage && reducer.loading])
    return (
        <div className="flex flex-col w-full gap-3">
            <Helmet>
                <title>Soundwave | Your sended appelation</title>
            </Helmet>
            <FullScreenModal visible={open} center>
                    <AnswerAppelationModal answer={answer} onClose={() => { setOpen(false) }} />
            </FullScreenModal>
            {
                reducer.error &&
                <div className="flex flex-col py-5 items-center justify-center bg-red-500/80 rounded-xl">
                    <h1 className="text-light-100 font-medium">{reducer.error}</h1>
                </div>
            }
            {
                reducer.appelations?.map(item => {
                    return (
                        <NotifyCard key={Guid.create().toString()} message={`Your message: ${item.message}`} device={DeviceType.desktop} type={item.answer ? "success" : "wait"} date={new Date(item.sendDate)}
                        onClick={() => {setAnswer(item.answer); setOpen(true);}} isFunc={item.answer ? true : false} />
                    )
                })
            }
        </div>
    )

}