import React, { useState } from "react";
import "./App.scss";

import { Outlet, Route, Routes } from "react-router-dom";
import { NotFound } from "./Components/Views/NotFound";
import { LayAuth } from "./Components/Layout/LayAuth";
import { LayStartup } from "./Components/Layout/LayStartup";
import { Login } from "./Components/Views/Auth/Login";
import { Register } from "./Components/Views/Auth/Register";
import { Settings } from "./Components/Views/Settings";
import { Profile } from "./Components/Views/Profile";
import { LayProfile } from "./Components/Layout/LayProfile";
import { Welcome } from "./Components/Views/Welcome";
import { Search } from "./Components/Views/Search";
import { Queue } from "./Components/Views/Queue";
import { ProfilePlaylists } from "./Components/Views/Profile/ProfilePlaylists";
import { ProfileAlbums } from "./Components/Views/Profile/ProfileAlbums";
import { ProfileSingles } from "./Components/Views/Profile/ProfileSingles";
import { ListeningSingle } from "./Components/Views/ListeningPage/ListeningSingle";
import { ListeningAlbum } from "./Components/Views/ListeningPage/ListeningAlbum";

function App() {
  const [isDark, setDark] = useState(false);

  return (
    <div
      className={`w-full min-h-screen flex scroller ${
        isDark ? "dark" : ""
      }`}
    >
      <Routes>
        <Route path="/" element={<LayStartup />}>
          <Route index element={<Welcome />} />
          <Route path="search" element={<Search />} />
          <Route path="genres" element={<Settings />} />
          <Route path="createplaylist" element={<Settings />} />
          <Route path="history" element={<Settings />} />
          <Route path="queue" element={<Queue />} />
          <Route path="settings" element={<Settings />} />

          <Route path="single" element={<Outlet />}>
            <Route path=":id" element={<ListeningSingle />} />
          </Route>
          <Route path="album" element={<Outlet />}>
            <Route path=":id" element={<ListeningAlbum />} />
          </Route>
          <Route path="playlist" element={<Outlet />}>
            <Route path=":id" element={<ListeningSingle />} />
          </Route>

          <Route path="profile" element={<LayProfile />}>
              <Route path="" element={<Profile />}>
                <Route index element={<ProfileSingles />} />
                <Route path="playlists" element={<ProfilePlaylists />} />
                <Route path="albums" element={<ProfileAlbums />} />
              </Route>
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
