import { Guid } from "guid-typescript";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useActions } from "../../../../../Hooks/useActions";
import { useTypedSelector } from "../../../../../Hooks/useTypedSelector";
import { IGetNotificationsRequest } from "../../../../../Redux/Reducers/NotificationReducer/types";
import { NotifyCard } from "../../../../Commons/Cards/NotifyCard";

export const ActionsAccount: React.FC = () => {
    const { getActions, addActions } = useActions();
    const reducer = useTypedSelector(state => state.notificationReducer);
    const user = useTypedSelector(state => state.userReducer.profile);
    const scrollHadler = async () => {
        if (document.documentElement.scrollHeight - (document.documentElement.scrollTop + window.innerHeight) <= 0) {
            if (reducer.nextPage && !reducer.loading) {
                await fetchnext();
            }
        }
    }
    const fetchnext = async () => {
        if (user && reducer.nextPage) {
            const request: IGetNotificationsRequest = {
                findEmail: user.email,
                page: reducer.nextPage
            }
            await addActions(request);
        }
    }
    useEffect(() => {
        const work = async (page: number) => {
            if (user) {
                const request: IGetNotificationsRequest = {
                    findEmail: user.email,
                    page: page
                }
                await getActions(request);
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
                <title>Soundwave | Your account action</title>
            </Helmet>
            {
                reducer.error &&
                <div className="flex flex-col py-5 items-center justify-center bg-red-500/80 rounded-xl">
                    <h1 className="text-light-100 font-medium">{reducer.error}</h1>
                </div>
            }
            {
                reducer.notifications?.map(item => {
                    return (
                        <NotifyCard key={Guid.create().toString()}
                        device={item.device}
                        message={`Action ${item.message}`}
                        type={item.transaction === "Success" ? "success" : "error"} date={new Date(item.date)} />
                    )
                })
            }
        </div>
    )
}