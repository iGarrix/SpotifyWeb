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
import { ListeningAlbum } from "./Components/Views/ListeningPage/ListeningAlbum";
import { IQueue } from "./Redux/Reducers/SelectAlbumReducer/types";
import { useActions } from "./Hooks/useActions";
import { StorageVariables } from "./types";


function App() {
  const [isDark, setDark] = useState(false);
  
  const {initQueue} = useActions();
  
  const queueStorage = localStorage.getItem(StorageVariables.Queue);
  if (queueStorage) {
    let queue : IQueue = (JSON.parse(queueStorage) as IQueue);
    queue.isPlay = false;
    if (queue) {
      initQueue(queue);
      console.log("App");
    }
  }
  
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

          <Route path="album" element={<Outlet />}>
            <Route path=":id" element={<ListeningAlbum />} />
          </Route>
          <Route path="playlist" element={<Outlet />}>
          
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
