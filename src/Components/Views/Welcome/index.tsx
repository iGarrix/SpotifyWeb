import React from "react";
import { useNavigate } from "react-router-dom";
import { useActions } from "../../../Hooks/useActions";


export const Welcome: React.FC = () => {
  const nav = useNavigate();

  const { LogoutUser } = useActions();
  

  return (
    <div className="flex justify-center gap-5">
      <button
        onClick={() => {
          nav("authorizate");
        }}
      >
        Login
      </button>  

      <button
        onClick={() => {
          nav("authorizate/register");
        }}
      >
        Register
      </button>
      <button
        onClick={() => {
          nav("profile");
        }}
      >
        Profile
      </button>
      <button
        onClick={() => {
          nav("settings");
        }}
      >
        Settings
      </button>
      <button
        onClick={async () => {
          await LogoutUser();
        }}
      >
        Logout
      </button>
    </div>
  );
};
