import { faCheck, faCompactDisc, faPen, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useTypedSelector } from "../../../Hooks/useTypedSelector";
import { baseUrl, VerifyType } from "../../../types";
import { FullScreenModal } from "../../Commons/Modals/FullScreenModal";
import { RenameBioModal } from "../../Commons/Modals/FullScreenModal/RenameBioModal";
import "./style.scss";

const image = require('../../../Assets/Background1.png');


export const Profile: React.FC = () => {
  const user = useTypedSelector((state) => state.userReducer.profile);

  const [openModal, setOpenModal] = useState(false);

  const [ImageSrc, setImageSrc] = useState("");
  const [verifyImage, setVerifyImage] = useState<any>();

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

  return (
    <div className="overflow-x-hidden text-white">
      {
        user && openModal ?
          <FullScreenModal visible center>
            <RenameBioModal onSave={onSaveChanges} onClose={onCloseModal} />
          </FullScreenModal> : null
      }
      <div className="w-full h-full flex bg-cover bg-no-repeat" style={{ backgroundImage: `url("${image}")` }}>
        <div className="flex gap-6 px-20 py-16">
          {
            user?.avatar.length !== 0 ? ImageSrc !== "" ? <div className="w-48 h-48"><img alt="avatar" src={ImageSrc} className="rounded-xl cursor-pointer transition-all object-cover w-full h-full" /></div> :
              <div className="bg-gray-600 animate-pulse rounded-2xl cursor-pointer w-48 h-48 flex justify-center items-center">
              </div>
              :
              <div className="bg-primary-100 rounded-2xl cursor-pointer w-48 h-48 flex justify-center items-center">
                <h1 className="text-white text-8xl select-none">{user?.username.charAt(0)}</h1>
              </div>
          }
          <div className="flex flex-col gap-2">
            <h1 className="font-semibold text-5xl font-['Lexend'] flex gap-4 profilenames">{user?.name} {user?.surname}
              <FontAwesomeIcon className="text-lg profilechangenames" icon={faPen} onClick={onChangeName} />
            </h1>
            <p className="font-['Lexend']">{user?.username}</p>
            <p className="font-medium font-['Lexend'] text-lg">{user?.verify === VerifyType.profile ? "Profile" :
              user?.verify === VerifyType.artist ? "Artist" :
                user?.verify === VerifyType.verify ? "Verified" : null} {verifyImage}</p>
          </div>
        </div>
      </div>
    </div>
  );
};