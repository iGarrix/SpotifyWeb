import React from "react";
import { useNavigate } from "react-router-dom";

export const Welcome: React.FC = () => {
  const nav = useNavigate();

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
    </div>
  );
};
