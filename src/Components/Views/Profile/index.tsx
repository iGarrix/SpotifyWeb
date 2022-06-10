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

const image = require('../../../Assets/Background1.png');
const bg2 = require('../../../Assets/Background2.png');

export const Profile: React.FC = () => {
  const user = useTypedSelector((state) => state.userReducer.profile);
  const nav = useNavigate();

  const [openModal, setOpenModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(window.location.pathname);

  const [ImageSrc, setImageSrc] = useState("");
  const [verifyImage, setVerifyImage] = useState<any>();

  const {updateAvatarUser} = useActions();

  useEffect(() => {
    if (user != null) {
      setImageSrc(user.avatar.includes("http") ? user.avatar
        : baseUrl + "Images/Users/" + user.avatar);
      setVerifyImage(user.verify === VerifyType.profile ? <FontAwesomeIcon icon={faUser} width={20} height={20} /> :
      user.verify === VerifyType.artist ? <FontAwesomeIcon icon={faCompactDisc} width={20} height={20} /> :
        user.verify === VerifyType.verify ? <FontAwesomeIcon icon={faCheck} width={20} height={20} /> : null)
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

  return (
    <div className="overflow-x-hidden text-white flex flex-col">
      {
        user && openModal ?
          <FullScreenModal visible center>
            <RenameBioModal onSave={onSaveChanges} onClose={onCloseModal} />
          </FullScreenModal> : null
      }
      <div className="w-full h-full flex bg-cover bg-no-repeat object-cover" style={{ backgroundImage: `url("${'https://www.rmets.org/sites/default/files/cloud%2520to%2520cloud%2520lightning_0.jpg'}")` }}>
        <div className="flex gap-6 px-20 py-16">
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
            <p className="font-['Lexend'] flex gap-1 items-center">{user?.username} {verifyImage}</p>
            <p className="font-medium font-['Lexend'] text-lg">{user?.emojie}</p>
          </div>
        </div>
      </div>
      <div className="w-full h-full flex flex-col">
          <div className="bg-dark-200/60 flex w-full justify-center gap-4">
              <ProfileButton text="My singles" isSelect={currentItem === "/profile"}  onClick={() => {onCurrentItem("/profile")}}/>
              <ProfileButton text="My Playlists" isSelect={currentItem === "/profile/playlists"}  onClick={() => {onCurrentItem("/profile/playlists")}}/>
              <ProfileButton text="My albums" isSelect={currentItem === "/profile/albums"}  onClick={() => {onCurrentItem("/profile/albums")}}/>
          </div>
          <Outlet />
      </div>
    </div>
  );
};