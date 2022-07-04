import { faCheck, faCompactDisc, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from "react-router-dom";
import { useActions } from "../../../Hooks/useActions";
import { useTypedSelector } from "../../../Hooks/useTypedSelector";
import { baseUrl, VerifyType } from "../../../types";

export const OverviewProfile: React.FC = () => {

  const { nickname } = useParams();
  const user = useTypedSelector(state => state.userReducer);
  const nav = useNavigate();
  const [ImageSrc, setImageSrc] = useState("");
  const [BackgroundSrc, setBackgroundSrc] = useState("");
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
    if (user.profile?.username === nickname) {
      nav('/profile')
    }
  }, [user.profile])
  useEffect(() => {
    if (user.overviewer != null) {
      setImageSrc(user.overviewer.avatar.includes("http") ? user.overviewer.avatar
        : baseUrl + "Images/Users/" + user.overviewer.avatar);
      setVerifyImage(user.overviewer.verify === VerifyType.profile ? <FontAwesomeIcon icon={faUser} width={16} height={16} /> :
        user.overviewer.verify === VerifyType.artist ? <FontAwesomeIcon icon={faCompactDisc} width={16} height={16} /> :
          user.overviewer.verify === VerifyType.verify ? <FontAwesomeIcon icon={faCheck} width={16} height={16} /> : null);
      if (user.overviewer.background && user.overviewer.background.length !== 0) {
        if (user.overviewer.background.includes("http")) {
          setBackgroundSrc(user.overviewer.background);
        }
        else {
          setBackgroundSrc(baseUrl + "Images/Users/" + user.overviewer.background);
        }
      }
      else {
        setBackgroundSrc('https://www.rmets.org/sites/default/files/cloud%2520to%2520cloud%2520lightning_0.jpg');
      }
    }
  }, [user.overviewer])
  return (
    <div className="overflow-x-hidden text-light-100 flex flex-col h-full">
      <Helmet>
        <title>Soundwave | {user.overviewer? user.overviewer.username : "Unknown"}</title>
      </Helmet>
      <div className="w-full flex bg-cover bg-no-repeat object-cover bg-fixed relative" style={{ backgroundImage: `url("${BackgroundSrc}")` }}>
        <div className="absolute top-0 left-0 w-full h-full bg-black/20"></div>
        <div className="flex flex-col w-full px-20 py-16 z-[2]">
          <div className="flex gap-6 w-full">
            {
              user?.overviewer?.avatar.length !== 0 ? ImageSrc !== "" ?
                <div className="w-48 h-48 relative overflow-hidden rounded-xl">
                  <img alt="avatar" src={ImageSrc} className="transition-all object-cover w-full h-full" />
                </div> :
                <div className="bg-gray-600 animate-pulse rounded-2xl cursor-pointer w-48 h-48 flex justify-center items-center">
                </div>
                :
                <div className="bg-green-600 rounded-2xl cursor-pointer w-48 h-48 flex justify-center items-center">
                  <h1 className="text-white text-8xl select-none">{user?.overviewer?.username.charAt(0)}</h1>
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