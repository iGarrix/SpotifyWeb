import { faCheck, faEye, faShare, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { useActions } from "../../../Hooks/useActions";
import { useTypedSelector } from "../../../Hooks/useTypedSelector";
import { baseUrl, defaultAvatarImage, GetUserAvatar, GetUserBackground, VerifyType } from "../../../types";
import { ProfileButton } from "../../Commons/Buttons/ProfileButton";
import { SubscribeButton } from "../../Commons/Buttons/SubscribeButton";
import { FullScreenModal } from "../../Commons/Modals/FullScreenModal";
import { ShareModal } from "../../Commons/Modals/FullScreenModal/Shares/ShareModal";

export const OverviewProfile: React.FC = () => {

  const { nickname } = useParams();
  const history = useLocation();
  const user = useTypedSelector(state => state.userReducer);
  const nav = useNavigate();
  const [verifyImage, setVerifyImage] = useState<any>();
  const { getOverwiever, getSubscribeUser, DeleteSubscribe, SubscribeUser } = useActions();
  const [shareModal, setShareModal] = useState(false);
  const [isSubs, setSubs] = useState(false);
  useEffect(() => {
    const func = async () => {
      if (nickname) {
        await getOverwiever(nickname);
        if (user.profile) {
          await getSubscribeUser(user.profile?.username, nickname);
        }
      }
    }

    func();
  }, []);

  useEffect(() => {
    const func = async () => {
      if (user.profile && user.overviewer) {
        await getSubscribeUser(user.profile?.username, user.overviewer?.username);
      }
    }

    func();
  }, [user.profile, user.overviewer])

  useEffect(() => {
    if (user.overviewer != null) {
      setVerifyImage(user.overviewer.verify === VerifyType.profile ? <FontAwesomeIcon icon={faUser} width={20} height={20} /> :
        user.overviewer.verify === VerifyType.verify ? <FontAwesomeIcon icon={faCheck} width={20} height={20} /> : null);
    }
  }, [user.overviewer]);
  useEffect(() => {
    if (user.profile?.username === nickname) {
      nav('/profile', { replace: true })
    }
  }, [user.profile, nickname])

  const onShare = () => {
    setShareModal(true);
  }

  const onSubscribe = async () => {
    if (user.profile && user.overviewer) {
      if (user.isSubscribe) {
        setSubs(false);
        await DeleteSubscribe({
          fromEmail: user.profile.email,
          toEmail: user.overviewer.email,
        });
      }
      else {
        setSubs(true);
        await SubscribeUser({
          fromEmail: user.profile.email,
          toEmail: user.overviewer.email,
        });
      }
    }
    else {
      nav("/authorizate")
    }
  }

  return (
    <div className="overflow-x-hidden text-light-100 flex flex-col h-full">
      <Helmet>
        <title>Soundwave | {user.overviewer ? user.overviewer.username : "Unknown"}</title>
      </Helmet>
      <div className="w-full flex bg-cover bg-no-repeat object-cover bg-fixed relative">
        <FullScreenModal visible={shareModal} center>
          <ShareModal
            onClose={() => { setShareModal(false) }}
            title={"Share account"}
            link={document.location.origin + "/overview/" + user.overviewer?.username}
            banner={
              <div className="flex w-full gap-2">
                <img alt="singleImage" src={`${baseUrl}Images/Users/${user.overviewer?.avatar}`}
                  className="h-28 w-28 rounded-xl object-cover bg-cover" onError={(tg: any) => { tg.target.src = defaultAvatarImage }} />
                <div className="flex flex-col">
                  <div className="flex gap-2 items-center">
                    <h1 className="font-['Lexend'] text-xl">{user.overviewer?.username}</h1>
                    <p className="bg-light-300 rounded-2xl px-3">
                      <span className="text-center text-sm">Sharing</span>
                    </p>
                  </div>
                  <p className="">{user.overviewer?.name} {user.overviewer?.surname}</p>
                </div>
              </div>
            } />
        </FullScreenModal>
        <img alt="bg" className="absolute top-0 left-0 w-full h-full object-cover" src={GetUserBackground(user.overviewer)} />
        <div className="absolute top-0 left-0 w-full h-full bg-black/40"></div>
        <div className="flex flex-col w-full px-20 pt-16 pb-8 z-[2]">
          <div className="flex gap-6 w-full">
            {
              user?.overviewer?.avatar.length !== 0 ?
                <div className="w-48 h-48 relative overflow-hidden rounded-xl">
                  <img alt="avatar" src={GetUserAvatar(user.overviewer)} className="transition-all object-cover w-full h-full" onError={(tg: any) => { tg.target.src = defaultAvatarImage }} />
                </div> :
                <div className="bg-gray-600 animate-pulse rounded-2xl cursor-pointer w-48 h-48 flex justify-center items-center">
                </div>
            }
            <div className="flex flex-col gap-1">
              <h1 className="font-semibold text-5xl font-['Lexend'] flex gap-4">{user.overviewer?.username}
                <p className="translate-y-[-5px]">{verifyImage}</p>
              </h1>
              <p className="text-light-100/80">{user?.overviewer?.emojie}</p>        
            </div>
          </div>
          <div className="flex items-center gap-4 justify-between">
          <p className="mt-auto text-[18px] tracking-wide gap-2 font-['Lexend']">{ user.overviewer && user.overviewer.views > 0 ?
          user.overviewer.views.toLocaleString(undefined, { maximumFractionDigits: 2 }) :
          "NO"} Views for all time</p>
            <div className="flex gap-2">
              <FontAwesomeIcon className={`text-xl p-3 rounded-lg border border-light-100 cursor-pointer
              hover:border-blue-500 hover:text-blue-500 active:bg-blue-500 active:text-light-100 ${shareModal && "bg-blue-500 border-blue-500 text-light-100"}`} icon={faShare} onClick={onShare} />
              <SubscribeButton isSubscribe={user.isSubscribe || isSubs} onClick={onSubscribe} subscribedText="Unsubscribe" text="Subscribe" />
            </div>
          </div>
        </div>
      </div>
      <div className={`h-full w-full flex flex-col items-center mt-5`}>
        <div className="bg-light-200/100 flex px-[50px] rounded-xl py-3 justify-center gap-[100px]">
          <ProfileButton text="Singles" isSelect={history.pathname === "/overview/" + user.overviewer?.username} onClick={() => { nav("") }} />
          <ProfileButton text="Playlists" isSelect={history.pathname.includes("playlists")} onClick={() => { nav("playlists") }} />
          <ProfileButton text="Albums" isSelect={history.pathname.includes("albums")} onClick={() => { nav("albums") }} />
        </div>
        <Outlet />
      </div>
    </div>
  );
}