import { faCheck, faEye, faShare, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { useActions } from "../../../Hooks/useActions";
import { useTypedSelector } from "../../../Hooks/useTypedSelector";
import { baseUrl, defaultAvatarImage, GetUserAvatar, GetUserBackground, VerifyType } from "../../../types";
import { ProfileButton } from "../../Commons/Buttons/ProfileButton";
import { SubscribeButton } from "../../Commons/Buttons/SubscribeButton";
import { FullScreenModal } from "../../Commons/Modals/FullScreenModal";
import { ShareModal } from "../../Commons/Modals/FullScreenModal/Shares/ShareModal";

export const OverviewProfile: React.FC = () => {
  const { t } = useTranslation();
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
            title={t("Share account")}
            link={document.location.origin + "/overview/" + user.overviewer?.username}
            banner={
              <div className="flex w-full gap-2">
                <img alt="singleImage" src={`${baseUrl}Images/Users/${user.overviewer?.avatar}`}
                  className="h-28 w-28 rounded-xl object-cover bg-cover" onError={(tg: any) => { tg.target.src = defaultAvatarImage }} />
                <div className="flex flex-col">
                  <div className="flex gap-2 items-center">
                    <h1 className="font-['Lexend'] text-xl">{user.overviewer?.username}</h1>
                    <p className="bg-light-300 dark:bg-dark-100 rounded-2xl px-3 mm:hidden">
                      <span className="text-center text-sm text-dark-200 dark:text-light-200">{t("Sharing")}</span>
                    </p>
                  </div>
                  <p className="">{user.overviewer?.name} {user.overviewer?.surname}</p>
                </div>
              </div>
            } />
        </FullScreenModal>
        <img alt="bg" className="absolute top-0 left-0 w-full h-full object-cover" src={GetUserBackground(user.overviewer)} />
        <div className="absolute top-0 left-0 w-full h-full bg-black/40"></div>
        <div className="flex flex-col w-full px-20 pt-16 mm:pt-6 sm:pt-6 z-[2] mm:gap-4">
          <div className="flex mm:flex-col mm:items-center gap-6 mm:gap-3 sm:gap-3 md:gap-3 w-full">
            {
              user?.overviewer?.avatar.length !== 0 ?
                <div className="w-48 h-48 mm:w-36 mm:h-36 sm:w-36 sm:h-36 md:w-36 md:h-36 relative overflow-hidden rounded-xl">
                  <img alt="avatar" src={GetUserAvatar(user.overviewer)} className="transition-all object-cover w-full h-full" onError={(tg: any) => { tg.target.src = defaultAvatarImage }} />
                </div> :
                <div className="bg-gray-600 animate-pulse rounded-2xl cursor-pointer w-48 h-48 flex justify-center items-center">
                </div>
            }
            <div className="flex flex-col gap-2 mm:gap-0 sm:gap-0">
              <h1 className="font-semibold text-5xl mm:text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-4xl font-['Lexend'] flex gap-4">{user.overviewer?.username}
                <p className="translate-y-[-5px]">{verifyImage}</p>
              </h1>
              <p className="text-light-100/80 mm:text-base sm:text-base">{user?.overviewer?.emojie}</p>        
            </div>
          </div>
          <div className="flex  mm:flex-col mm:items-center items-end gap-4 justify-between pb-6 w-full mm:gap-2">
          <p className="mt-auto text-[18px] mm:text-base tracking-wide gap-2 font-['Lexend']">{ user.overviewer && user.overviewer.views > 0 ?
          user.overviewer.views.toLocaleString(undefined, { maximumFractionDigits: 2 }) :
          "NO"} {t("Views for all time")}</p>
            <div className="flex gap-2 mm:scale-90">
              <FontAwesomeIcon className={`text-xl p-3 rounded-lg border border-light-100 cursor-pointer
              hover:border-blue-500 hover:text-blue-500 active:bg-blue-500 active:text-light-100 ${shareModal && "bg-blue-500 border-blue-500 text-light-100"}`} icon={faShare} onClick={onShare} />
              <SubscribeButton isSubscribe={user.isSubscribe || isSubs} onClick={onSubscribe} subscribedText={t("Unsubscribe")} text={t("Subscribe")} />
            </div>
          </div>
        </div>
      </div>
      <div className={`h-full w-full flex flex-col items-center mm:items-start sm:items-start md:items-start mm:px-[2%] sm:px-[2%] md:px-[2%] mt-5`}>
        <div className="bg-light-200 dark:bg-dark-100 mm:w-full sm:w-full md:w-full
         flex mm:flex-col px-[50px] mm:px-[10px] sm:px-[20px] md:px-[30px] lg:px-[40px] rounded-xl py-3 justify-center gap-[100px] mm:gap-[10px] sm:gap-[10px]">
          <ProfileButton text={t("Singles")} isSelect={!history.pathname.includes("playlist") && !history.pathname.includes("albums") } onClick={() => { nav("") }} />
          <ProfileButton text={t("Playli")} isSelect={history.pathname.includes("playlists")} onClick={() => { nav("playlists") }} />
          <ProfileButton text={t("Albu")} isSelect={history.pathname.includes("albums")} onClick={() => { nav("albums") }} />
        </div>
        <Outlet />
      </div>
    </div>
  );
}