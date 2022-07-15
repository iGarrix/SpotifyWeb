import { faCheck, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from "react-router-dom";
import { useActions } from "../../../Hooks/useActions";
import { useTypedSelector } from "../../../Hooks/useTypedSelector";
import { baseUrl, defaultAvatarImage, defaultBackgroundImage, GetUserAvatar, GetUserBackground, VerifyType } from "../../../types";

export const OverviewProfile: React.FC = () => {

  const { nickname } = useParams();
  const user = useTypedSelector(state => state.userReducer);
  const nav = useNavigate();
  const [verifyImage, setVerifyImage] = useState<any>();
  const { getOverwiever } = useActions();
  useEffect(() => {
    const func = async () => {
      if (nickname) {
        await getOverwiever(nickname);
      }
    }

    func();
  }, []);

  useEffect(() => {
    if (user.overviewer != null) {
      setVerifyImage(user.overviewer.verify === VerifyType.profile ? <FontAwesomeIcon icon={faUser} width={20} height={20} /> :
      user.overviewer.verify === VerifyType.verify ? <FontAwesomeIcon icon={faCheck} width={20} height={20} /> : null);
    }
  }, [user.overviewer]);
  useEffect(() => {
    if (user.profile?.username === nickname) {
      nav('/profile', {replace: true})
    }
  }, [user.profile])
  return (
    <div className="overflow-x-hidden text-light-100 flex flex-col h-full">
      <Helmet>
        <title>Soundwave | {user.overviewer? user.overviewer.username : "Unknown"}</title>
      </Helmet>
      <div className="w-full flex bg-cover bg-no-repeat object-cover bg-fixed relative">
      <img alt="bg" className="absolute top-0 left-0 w-full h-full object-cover" src={GetUserBackground(user.overviewer)} />
        <div className="absolute top-0 left-0 w-full h-full bg-black/40"></div>
        <div className="flex flex-col w-full px-20 py-16 z-[2]">
          <div className="flex gap-6 w-full">
            {
              user?.overviewer?.avatar.length !== 0 ? 
                <div className="w-48 h-48 relative overflow-hidden rounded-xl">
                  <img alt="avatar" src={GetUserAvatar(user.overviewer)} className="transition-all object-cover w-full h-full" onError={(tg: any) => { tg.target.src = defaultAvatarImage }}/>
                </div> :
                <div className="bg-gray-600 animate-pulse rounded-2xl cursor-pointer w-48 h-48 flex justify-center items-center">
                </div>
            }
            <div className="flex flex-col gap-2">
              <h1 className="font-semibold text-5xl font-['Lexend'] flex gap-4">{user.overviewer?.username}
                <p className="translate-y-[-5px]">{verifyImage}</p>
              </h1>
              <p className="font-medium text-lg">{user?.overviewer?.name} {user?.overviewer?.surname}</p>
              <p className="font-medium text-lg">{user?.overviewer?.emojie} dfd</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}