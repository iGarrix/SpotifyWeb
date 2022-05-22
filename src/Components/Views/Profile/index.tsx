import moment from "moment";
import React, { useEffect, useState } from "react";
import { useTypedSelector } from "../../../Hooks/useTypedSelector";
import { IInitGet } from "../../../Redux/Reducers/UserReducer/types";
import jwtDecode from "jwt-decode";

export const Profile: React.FC = () => {
  const user = useTypedSelector((state) => state.userReducer.profile);

  const [provider, setProvider] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null) {   
      const data = jwtDecode(token) as IInitGet;
      setProvider(data.provider);
    }
  }, []);


  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      {user !== null && user.avatar !== "" ? (
        <div>
          <img
            alt="avatar"
            className="rounded-full"
            width={300}
            height={300}
            src={`${provider !== null ? user.avatar : `https://localhost:7286/Images/Users/${user.avatar}`}`}
          />
        </div>
      ) : 
      <div>
        <img
          alt="avatar"
          className="rounded-full"
          width={300}
          height={300}
          src={`https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png`}
        />
      </div>
    }
      <div className="flex flex-col items-center   justify-between gap-4">
        <h1 className="font-medium text-lg flex gap-2">
          {user?.name} {user?.surname} {user?.verify}
        </h1>
        <h1 className="font-medium text-lg flex gap-2">
          {user?.gender} {moment(user?.birthday).format("MM.DD.YYYY")}{" "}
          {user?.emailconfirm}
        </h1>
        <h1 className="font-medium text-lg flex gap-2">
          {user?.emojie} {user?.country} {user?.phone}
        </h1>
        <h1 className="font-medium text-lg flex gap-2">{user?.username}</h1>
      </div>
    </div>
  );
};
