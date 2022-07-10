import { Guid } from "guid-typescript";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useActions } from "../../../../../Hooks/useActions";
import { useTypedSelector } from "../../../../../Hooks/useTypedSelector";
import { IGetStatusUserRequest, IUserStatusResponse } from "../../../../../Redux/Reducers/NotificationReducer/types";
import { NotifyCard } from "../../../../Commons/Cards/NotifyCard";
import { FullScreenModal } from "../../../../Commons/Modals/FullScreenModal";
import { StatusDetailModal } from "../../../../Commons/Modals/FullScreenModal/StatusDetailModal";

export const StatusAccount : React.FC = () => {

    const { getStatuses, addStatuses, setSelectStatus } = useActions();
    const reducer = useTypedSelector(state => state.notificationReducer);
    const user = useTypedSelector(state => state.userReducer.profile);
    const [open, setOpen] = useState(false);

    const scrollHadler = async () => {
        if (document.documentElement.scrollHeight - (document.documentElement.scrollTop + window.innerHeight) <= 0) {
            if (reducer.nextPage && !reducer.loading) {
                await fetchnext();
            }
        }
    }
    const fetchnext = async () => {
        if (user && reducer.nextPage) {
            const request: IGetStatusUserRequest = {
                email: user.email,
                isadmin: false,
                page: reducer.nextPage,
            }
            await addStatuses(request);
        }
    }
    useEffect(() => {
        const work = async (page: number) => {
            if (user) {
                const request: IGetStatusUserRequest = {
                    email: user.email,
                    isadmin: false,
                    page: page,
                }
                await getStatuses(request);
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

    const onSelect = (data : IUserStatusResponse) => {
        setSelectStatus(data);
        setOpen(true);
    }

    return (
        <div className="flex flex-col w-full gap-3">
            <Helmet>
                <title>Soundwave | Your account status</title>
            </Helmet>
            {
                reducer.selectedStatus &&
                <FullScreenModal visible={open} center>
                    <StatusDetailModal data={reducer.selectedStatus} onClose={() => {setOpen(false)}} />
                </FullScreenModal>
            }
            {
                reducer.error &&
                <div className="flex flex-col py-5 items-center justify-center bg-red-500/80 rounded-xl">
                    <h1 className="text-light-100 font-medium">{reducer.error}</h1>
                </div>
            }
            {
                reducer.statuses?.map(item => {
                    return (
                        <NotifyCard key={Guid.create().toString()}
                            isFunc
                            onClick={() => {onSelect(item)}}
                            message={
                                <p className="w-full flex gap-1 items-center">You have a <span className="font-medium text-primary-100">{item.userStatusDto.status}</span> status due to: <span className="font-medium text-primary-100">{item.userStatusDto.reason}</span></p>
                            } type={"error"} date={new Date(item.userStatusDto.create)} />
                    )
                })
            }
        </div>
    )
}