import React, { useEffect } from "react";
import "./App.scss";

import { Route, Routes, useNavigate } from "react-router-dom";
import { NotFound } from "./Components/Views/NotFound";
import { LayAuth } from "./Components/Layout/LayAuth";
import { LayStartup } from "./Components/Layout/LayStartup";
import { Login } from "./Components/Views/Auth/Login";
import { Register } from "./Components/Views/Auth/Register";
import { Settings } from "./Components/Views/Settings";
import { useTypedSelector } from "./Hooks/useTypedSelector";
import { Profile } from "./Components/Views/Profile";
import { LayProfile } from "./Components/Layout/LayProfile";
import { Welcome } from "./Components/Views/Welcome";

function App() {
  const nav = useNavigate();

  return (
    <div className="w-full min-h-screen overflow-y-hidden">
      <Routes>
        <Route path="/" element={<LayStartup />}>
          <Route index element={<Welcome />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="profile" element={<LayProfile />}>
          <Route index element={<Profile />} />
        </Route>
        <Route path="authorizate" element={<LayAuth />}>
          <Route index element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
