import moment from "moment";
import React from "react";
import { useTypedSelector } from "../../../Hooks/useTypedSelector";

export const Profile: React.FC = () => {
  const user = useTypedSelector((state) => state.userReducer.profile);
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      {user !== null && user.avatar !== "" ? (
        <div>
          <img
            alt="avatar"
            className="rounded-full"
            width={300}
            height={300}
            src={`https://localhost:7286/Images/Users/${user?.avatar}`}
          />
        </div>
      ) : null}
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
