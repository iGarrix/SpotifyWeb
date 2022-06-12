import { faArrowDown, faMusic } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Guid } from "guid-typescript";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useActions } from "../../../../Hooks/useActions";
import { useTypedSelector } from "../../../../Hooks/useTypedSelector";
import { IGetAllMySingleRequest, IPagableMySingleItem } from "../../../../Redux/Reducers/MySingleReducer/types";
import { AlbumItem } from "../../../Commons/AlbumItem";
import { DefaultButton } from "../../../Commons/Buttons/DefaultButton";
import { QuadraticLoader } from "../../../Commons/Loaders/QuadraticLoader";
import { SingleItem } from "../../../Commons/SingleItem";

export const ProfileSingles : React.FC = () => {

    const nav = useNavigate();

    const { getMySingle, addMySingle } = useActions();

    const rx = useTypedSelector(state => state.mySingleReducer);
    const singles = useTypedSelector(state => state.mySingleReducer.singles);
    const user = useTypedSelector(state => state.userReducer.profile);

    useEffect(() => {
        const fetchData = async () => {      
            if (user && !singles && rx.error !== "List empty") {           
                const rq: IGetAllMySingleRequest = {
                    email: user.email,
                    page: 1
                }
                await getMySingle(rq);       
            }     
        }
        fetchData();
    }, [user, singles]);

    const FetchNext = async () => {
        if (rx.singles && rx.nextPage && user) {       
            const rq: IGetAllMySingleRequest = {
                email: user?.email,
                page: rx.nextPage,
            }
            await addMySingle(rq);
        }
    }

    const onSelectSingle = (item: IPagableMySingleItem | null) => {
        if (item) {          
            localStorage.setItem("selectedSingle", JSON.stringify(item));
            nav("/single/" + item?.albomDto?.returnId);
        }
    }

    return (
        <div className="w-full h-full flex flex-col justify-center items-center py-8 gap-12 relative">
            {
                rx.loading ?
                <QuadraticLoader isVisisble={true} />
                :
                singles && rx.error.length === 0 ?
                <div className="w-full flex flex-col items-center gap-20">
                        <div className="grid grid-cols-4 gap-16">
                            {
                                singles.map(item => {
                                    return (
                                        <SingleItem key={Guid.create().toString()} onClick={() => {onSelectSingle(item); } } name={item.albomDto?.name} title={`Single`} imageSrc={item.albomDto?.image} />
                                    )
                                })
                            }  
                        </div>
                        {
                            rx.nextPage ?
                            <div className="flex w-full justify-end py-5 px-64">
                                <button onClick={FetchNext}><FontAwesomeIcon className="text-2xl bg-white text-black rounded-full px-4 py-3" icon={faArrowDown} /></button>
                            </div>
                            :
                            null
                        }
                </div>
                :
                <>
                    <FontAwesomeIcon className="text-7xl font-medium" icon={faMusic}  />
                    <div className="flex flex-col items-center gap-8">
                        <div className="flex flex-col gap-3 items-center">
                            <h1 className="font-medium text-3xl">Create you first single song</h1>
                            <p className="font-medium text-xl">You can also apply to verify your account as an artist</p>
                        </div>
                        <div>
                            <DefaultButton onClick={() => { } } text={"Upload you first single song"}/>
                        </div>
                    </div>
                </>
            }
            
        </div>
    )
}