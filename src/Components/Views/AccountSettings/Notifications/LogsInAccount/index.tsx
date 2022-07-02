import { Guid } from "guid-typescript";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useActions } from "../../../../../Hooks/useActions";
import { useTypedSelector } from "../../../../../Hooks/useTypedSelector";
import { IGetNotificationsRequest } from "../../../../../Redux/Reducers/NotificationReducer/types";
import { NotifyCard } from "../../../../Commons/Cards/NotifyCard";

export const LogsInAccount: React.FC = () => {

    const { getLogins, addLogins } = useActions();
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
            await addLogins(request);
        }
    }

    useEffect(() => {
        const work = async (page: number) => {
            if (user) {
                const request: IGetNotificationsRequest = {
                    findEmail: user.email,
                    page: page
                }
                await getLogins(request);
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
                <title>Soundwave | Your logins in account</title>
            </Helmet>
            {
                reducer.error &&
                <div className="flex flex-col py-5 items-center justify-center bg-red-500/60 rounded-xl">
                    <h1 className="text-center text-lg">{reducer.   error}</h1>
                </div>
            }
            {
                reducer.notifications?.map(item => {
                    return (
                        <NotifyCard key={Guid.create().toString()}
                        message={
                            <p className="w-full flex justify-between items-center"><span>Entries {item.status}</span> <span className="font-medium text-white/80 whitespace-nowrap">{item.device}</span></p>
                        } type={item.transaction === "Success" ? "success" : "error"} date={new Date(item.date)} />
                    )
                })
            }
            {/* <NotifyCard message={"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Exercitationem minima, libero pariatur iste illo illum recusandae aliquid temporibus esse praesentium nesciunt quas dignissimos sequi fuga dolorum? Maiores fugit minus voluptas."} 
            type="success" date={new Date(2022, 10, 6, 19, 10)} />     
            <NotifyCard message={"Hello world"} type="wait" date={new Date(2022, 10, 6, 19, 10)} />
            <NotifyCard message={"Hello world"} type="error" date={new Date(2022, 10, 6, 19, 10)} /> */}
        </div>
    )
}