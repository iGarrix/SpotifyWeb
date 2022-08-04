import { Guid } from "guid-typescript";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useActions } from "../../../../../Hooks/useActions";
import { useTypedSelector } from "../../../../../Hooks/useTypedSelector";
import { IGetInviteRequest } from "../../../../../Redux/Reducers/NotificationReducer/types";
import { InviteCard } from "../../../../Commons/Cards/InviteCard";

export const Invites : React.FC = () => {
    const { getInvite, addInvite, rejectInvite, acceptInvite } = useActions();
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
            const request: IGetInviteRequest = {
                email: user.email,
                page: reducer.nextPage,
            }
            await addInvite(request);
        }
    }
    useEffect(() => {
        const work = async (page: number) => {
            if (user) {
                const request: IGetInviteRequest = {
                    email: user.email,
                    page: page,
                }
                await getInvite(request);
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

    const onAcceptInvite = async (inviteId: string) => {
        try {
            await acceptInvite(inviteId);
        } catch (error) {
            
        }
    }

    const onRejectInvite = async (inviteId: string) => {
        try {
            await rejectInvite(inviteId);
        } catch (error) {
            
        }
    }

    return (
        <div className="flex flex-col w-full gap-3">
            <Helmet>
                <title>Soundwave | Your invites</title>
            </Helmet>
            {
                reducer.error &&
                <div className="flex flex-col py-5 items-center justify-center bg-red-500/80 rounded-xl">
                    <h1 className="text-light-100 font-medium text-center">{reducer.error}</h1>
                </div>
            }
            <div className="flex flex-col gap-4">
                {
                    reducer.invites?.map(item => {
                        return (
                            <InviteCard key={Guid.create().toString()} invite={item} onAccept={() => {onAcceptInvite(item.id)}} onRejected={() => {onRejectInvite(item.id)}} />
                        )
                    })
                }
            </div>
        </div>
    )
}