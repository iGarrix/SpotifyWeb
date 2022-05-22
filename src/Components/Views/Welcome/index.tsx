import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useActions } from "../../../Hooks/useActions";

import { gapi } from "gapi-script";




export const Welcome: React.FC = () => {
  const nav = useNavigate();

  const { LogoutUser } = useActions();

  useEffect(() => {

    function start()
    {
        gapi.client.init({
          clientId: "62751843627-3hvrb4vhojmd60im3q708b1usgoob3ka.apps.googleusercontent.com",
          scope: "",
        })
    }
    gapi.load('client:auth2', start);

  }, []);


  

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
