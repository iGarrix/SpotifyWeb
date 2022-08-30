import { faCheck, faImage, faPen, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { Outlet, useNavigate } from "react-router-dom";
import { useActions } from "../../../Hooks/useActions";
import { useTypedSelector } from "../../../Hooks/useTypedSelector";
import { IChangeAvatarRequest } from "../../../Redux/Reducers/UserReducer/types";
import { baseUrl, defaultAvatarImage, GetUserAvatar, GetUserBackground, VerifyType } from "../../../types";
import { ProfileButton } from "../../Commons/Buttons/ProfileButton";
import { FullScreenModal } from "../../Commons/Modals/FullScreenModal";
import { RenameBioModal } from "../../Commons/Modals/FullScreenModal/RenameBioModal";
import "./style.scss";

const icon_crop = require('../../../Assets/Icons/Crop.png');

export const Profile: React.FC = () => {
  const user = useTypedSelector((state) => state.userReducer.profile);
  const nav = useNavigate();
  const { t } = useTranslation();
  const [openModal, setOpenModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(window.location.pathname);
  const [verifyImage, setVerifyImage] = useState<any>();
  const { updateAvatarUser, updateBackgroundUser } = useActions();
  useEffect(() => {
    if (user != null) {
      setVerifyImage(user.verify === VerifyType.profile ? <FontAwesomeIcon icon={faUser} width={20} height={20} /> :
          user.verify === VerifyType.verify ? <FontAwesomeIcon icon={faCheck} width={20} height={20} /> : null);
    }
  }, [user]);
  const onChangeName = () => {
    setOpenModal(true);
  }
  const onSaveChanges = () => {
    setOpenModal(false);
  }
  const onCloseModal = () => {
    setOpenModal(false);
  }
  const onCurrentItem = (path: string) => {
    setCurrentItem(path);
    nav(path);
  }
  const onChangeAvatar = async (e: any) => {
    try {
      const file = e.target.files[0];
      if (user && file) {
        const request: IChangeAvatarRequest = {
          findEmail: user?.email,
          newAvatar: file
        }
        await updateAvatarUser(request);
      }
    } catch (error) {

    }
  }
  const onChangeBackground = async (e: any) => {
    try {
      const file = e.target.files[0];
      if (user && file) {
        const request: IChangeAvatarRequest = {
          findEmail: user?.email,
          newAvatar: file
        }
        await updateBackgroundUser(request);
      }

    } catch (error) {

    }
  }
  return (
    <div className="overflow-x-hidden text-white flex flex-col h-full">
      <Helmet>
        <title>Soundwave | My account</title>
      </Helmet>
      {
        user && openModal ?
          <FullScreenModal visible center>
            <RenameBioModal onSave={onSaveChanges} onClose={onCloseModal} />
          </FullScreenModal> : null
      }
      <div className="w-full flex relative">
        <img alt="bg" className="absolute top-0 left-0 w-full h-full object-cover" src={GetUserBackground(user)} />
        <div className="absolute top-0 left-0 w-full h-full bg-black/40"></div>
        <div className="flex flex-col mm:items-center w-full px-20 mm:px-5 pt-16 mm:pt-6 sm:pt-6 z-[2] mm:gap-4">
          <div className="flex mm:flex-col mm:items-center gap-6 mm:gap-3 sm:gap-3 md:gap-3 w-full">
            {
              user?.avatar.length !== 0 ?
                <div className="w-48 h-48 mm:w-36 mm:h-36 sm:w-36 sm:h-36 md:w-36 md:h-36 relative overflow-hidden rounded-xl">
                  <div className="w-full h-full transition-all bg-black/60 opacity-0 hover:opacity-100 absolute flex justify-center items-center">
                    <input type="file" id="file" accept="image/*" onChange={onChangeAvatar} className="hidden" />
                    <label htmlFor="file"><FontAwesomeIcon className="text-6xl mm:text-3xl sm:text-3xl cursor-pointer" icon={faImage} /> </label>
                  </div>
                  <img alt="avatar" src={GetUserAvatar(user)} className="cursor-pointer transition-all object-cover w-full h-full" onError={(tg: any) => { tg.target.src = defaultAvatarImage}} />
                </div> :
                <div className="bg-gray-600 animate-pulse rounded-2xl cursor-pointer w-48 h-48 flex justify-center items-center">
                </div>
            }
            <div className="flex flex-col gap-2 mm:gap-0 sm:gap-0">
              <h1 className="font-semibold text-5xl mm:text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-4xl font-['Lexend'] flex gap-4 profilenames">{user?.name} {user?.surname}
                <FontAwesomeIcon className="text-lg profilechangenames" icon={faPen} onClick={onChangeName} />
              </h1>
              <p className="font-medium flex gap-1 items-start">{user?.username} {verifyImage}</p>
              <p className="font-medium text-lg mm:text-base sm:text-base">{user?.emojie}</p>
            </div>
          </div>
          <div className="flex mm:flex-col mm:items-center items-end justify-between pb-6 w-full mm:gap-2">
            <p className="mt-auto text-[18px] mm:text-base tracking-wide gap-2 ">{ user && user.views > 0 ?
            user.views.toLocaleString(undefined, { maximumFractionDigits: 2 }):
            "NO"} {t("Views for all time")}</p>
            <div className="flex mm:w-full">
              <input type="file" id="filebg" accept="image/*" onChange={onChangeBackground} className="hidden" />
                <ProfileButton text={
                  <label htmlFor="filebg" className="cursor-pointer"><div className="flex gap-2 items-center"><img alt="crop" src={icon_crop} /> <h1 className="text-lg mm:text-base ">{t("Change image")}</h1></div></label>
                } onClick={() => { }} isSelect={true} />
            </div>
          </div>
        </div>
      </div>
      <div className={`h-full w-full flex flex-col items-center mm:items-start sm:items-start md:items-start mm:px-[2%] sm:px-[2%] md:px-[2%] mt-5`}>
        <div className="bg-light-100 dark:bg-dark-100 mm:w-full sm:w-full md:w-full 
        flex mm:flex-col px-[50px] mm:px-[10px] sm:px-[20px] md:px-[30px] lg:px-[40px] rounded-xl py-3 justify-center gap-[100px] mm:gap-[10px] sm:gap-[10px]">
          <ProfileButton text={t("My singles")} isSelect={currentItem === "/profile"} onClick={() => { onCurrentItem("/profile") }} />
          <ProfileButton text={t("My Playlists")} isSelect={currentItem === "/profile/playlists"} onClick={() => { onCurrentItem("/profile/playlists") }} />
          <ProfileButton text={t("My albums")} isSelect={currentItem === "/profile/albums"} onClick={() => { onCurrentItem("/profile/albums") }} />
        </div>
        <Outlet />
      </div>
    </div>
  );
};