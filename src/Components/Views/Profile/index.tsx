import { faCheck, faCompactDisc, faImage, faPen, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useActions } from "../../../Hooks/useActions";
import { useTypedSelector } from "../../../Hooks/useTypedSelector";
import { IChangeAvatarRequest } from "../../../Redux/Reducers/UserReducer/types";
import { baseUrl, VerifyType } from "../../../types";
import { ProfileButton } from "../../Commons/Buttons/ProfileButton";
import { FullScreenModal } from "../../Commons/Modals/FullScreenModal";
import { RenameBioModal } from "../../Commons/Modals/FullScreenModal/RenameBioModal";
import "./style.scss";

const icon_crop = require('../../../Assets/Icons/Crop.png');

export const Profile: React.FC = () => {
  const user = useTypedSelector((state) => state.userReducer.profile);
  const nav = useNavigate();

  const [openModal, setOpenModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(window.location.pathname);

  const [ImageSrc, setImageSrc] = useState("");
  const [BackgroundSrc, setBackgroundSrc] = useState("");
  const [verifyImage, setVerifyImage] = useState<any>();

  const {updateAvatarUser, updateBackgroundUser} = useActions();

  useEffect(() => {
    if (user != null) {
      setImageSrc(user.avatar.includes("http") ? user.avatar
        : baseUrl + "Images/Users/" + user.avatar);
        setVerifyImage(user.verify === VerifyType.profile ? <FontAwesomeIcon icon={faUser} width={20} height={20} /> :
        user.verify === VerifyType.artist ? <FontAwesomeIcon icon={faCompactDisc} width={20} height={20} /> :
        user.verify === VerifyType.verify ? <FontAwesomeIcon icon={faCheck} width={20} height={20} /> : null);
        if (user.background && user.background.length !== 0) {
            if (user.background.includes("http")) {
              setBackgroundSrc(user.background);
            }
            else {
              setBackgroundSrc(baseUrl + "Images/Users/" + user.background);
            }
        }
        else {
          setBackgroundSrc('https://www.rmets.org/sites/default/files/cloud%2520to%2520cloud%2520lightning_0.jpg');
        }
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

  const onChangeAvatar = async (e : any) => {
    try {
      const file = e.target.files[0];
      if (user && file) {   
        const request : IChangeAvatarRequest = {
          findEmail: user?.email,
          newAvatar: file
        }
        await updateAvatarUser(request);
      }
      
    } catch (error) {
      
    }
  }

  const onChangeBackground = async (e : any) => {
    try {
      const file = e.target.files[0];
      if (user && file) {   
        const request : IChangeAvatarRequest = {
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
      {
        user && openModal ?
          <FullScreenModal visible center>
            <RenameBioModal onSave={onSaveChanges} onClose={onCloseModal} />
          </FullScreenModal> : null
      }
      <div className="w-full flex bg-cover bg-no-repeat object-cover bg-fixed relative" style={{ backgroundImage: `url("${BackgroundSrc}")` }}>
        <div className="absolute top-0 left-0 w-full h-full bg-black/20"></div>
        <div className="flex flex-col w-full px-20 pt-16 z-[2]">
          <div className="flex gap-6 w-full">
            {
              user?.avatar.length !== 0 ? ImageSrc !== "" ? 
              <div className="w-48 h-48 relative overflow-hidden rounded-xl">
                <div className="w-full h-full transition-all bg-black/60 opacity-0 hover:opacity-100 absolute flex justify-center items-center">
                <input type="file" id="file" accept="image/*" onChange={onChangeAvatar} className="hidden" /> 
                  <label htmlFor="file"><FontAwesomeIcon className="text-6xl cursor-pointer" icon={faImage} /> </label>
                </div>
                <img alt="avatar" src={ImageSrc} className="cursor-pointer transition-all object-cover w-full h-full" />
              </div> :
                <div className="bg-gray-600 animate-pulse rounded-2xl cursor-pointer w-48 h-48 flex justify-center items-center">
                </div>
                :
                <div className="bg-green-600 rounded-2xl cursor-pointer w-48 h-48 flex justify-center items-center">
                  <h1 className="text-white text-8xl select-none">{user?.username.charAt(0)}</h1>
                </div>
            }
            <div className="flex flex-col gap-2">
              <h1 className="font-semibold text-5xl font-['Lexend'] flex gap-4 profilenames">{user?.name} {user?.surname}
                <FontAwesomeIcon className="text-lg profilechangenames" icon={faPen} onClick={onChangeName} />
              </h1>
              <p className="font-medium flex gap-1 items-start">{user?.username} {verifyImage}</p>
              <p className="font-medium text-lg">{user?.emojie}</p>
            </div>
          </div>
          <div className="flex items-end justify-end pb-6">
              <input type="file" id="filebg" accept="image/*" onChange={onChangeBackground} className="hidden" />
              <ProfileButton text={
                <label htmlFor="filebg" className="cursor-pointer"><div className="flex gap-2"><img alt="crop" src={icon_crop} /> <h1 className="text-lg">Change image</h1></div></label>     
              } onClick={() => {}} isSelect={true} />       
          </div>
        </div>
      </div>
      <div className={`h-full w-full flex flex-col items-center mt-5`}>
          <div className="bg-dark-100/100 flex px-[50px] rounded-xl py-3 justify-center gap-[100px]">
              <ProfileButton text="My singles" isSelect={currentItem === "/profile"}  onClick={() => {onCurrentItem("/profile")}}/>
              <ProfileButton text="My Playlists" isSelect={currentItem === "/profile/playlists"}  onClick={() => {onCurrentItem("/profile/playlists")}}/>
              <ProfileButton text="My albums" isSelect={currentItem === "/profile/albums"}  onClick={() => {onCurrentItem("/profile/albums")}}/>
          </div>
          <Outlet />
      </div>
    </div>
  );
};