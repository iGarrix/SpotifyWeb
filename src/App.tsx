import React, { useEffect, useState } from "react";
import "./App.scss";

import { Route, Routes } from "react-router-dom";
import { NotFound } from "./Components/Views/NotFound";
import { LayAuth } from "./Components/Layout/LayAuth";
import { LayStartup } from "./Components/Layout/LayStartup";
import { Login } from "./Components/Views/Auth/Login";
import { Register } from "./Components/Views/Auth/Register";
import { Settings } from "./Components/Views/Settings";
import { Profile } from "./Components/Views/Profile";
import { LayProfile } from "./Components/Layout/LayProfile";
import { Welcome } from "./Components/Views/Welcome";

function App() {
  const [isDark, setDark] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme"));

  useEffect(() => {
    if (theme !== null && theme !== undefined && theme !== "") {
      if (theme === "dark") {
        setDark(true);
      } else {
        setDark(false);
      }
    }
  }, [localStorage.getItem("theme")]);

  return (
    <div
      className={`w-full min-h-screen overflow-y-hidden ${
        isDark ? "dark" : null
      }`}
    >
      <Routes>
        <Route path="/" element={<LayStartup />}>
          <Route index element={<Welcome />} />
          <Route path="settings" element={<Settings />} />
          <Route path="profile" element={<LayProfile />}>
            <Route index element={<Profile />} />
          </Route>
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
