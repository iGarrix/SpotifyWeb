import React, { useEffect, useState } from "react";
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
import { StorageVariables, TempTake } from "./types";
import { useActions } from "./Hooks/useActions";
import { useTypedSelector } from "./Hooks/useTypedSelector";
import { AuthorizateRoute } from "./Components/ProtectedRoutes/AuthorizateRoute";
import { StudioIntro } from "./Components/IntroView/StudioIntro";
import { UploadIntro } from "./Components/IntroView/UploadIntro";
import { History } from "./Components/Views/History";
import { LayAnalytics } from "./Components/Layout/LayAnalytics";
import { OverviewProfile } from "./Components/Views/OverViewProfile";


function App() {
  const [isDark, setDark] = useState(false);

  const { initQueue, setPlayingTrack } = useActions();

  document.documentElement.scrollTo(0, 0);

  const user = useTypedSelector(state => state.userReducer.profile);

  useEffect(() => {
    // const queueStorage = localStorage.getItem(StorageVariables.Queue);
    // if (queueStorage) {
    //   let queue: IQueue = (JSON.parse(queueStorage) as IQueue);
    //   if (queue) {
    //     if (queue.isPlay === true) {
    //       queue.isPlay = false;
    //       localStorage.setItem(StorageVariables.Queue, JSON.stringify(queue));
    //     }
    //     initQueue(queue);
    //   }
    // }

    const storage_queue = localStorage.getItem(StorageVariables.Queue);
        if (storage_queue) {
            let stor_queue = JSON.parse(storage_queue) as IQueue;
            const size = stor_queue.soundobjs.length;
            if (stor_queue.isPlay === true) {
              stor_queue.isPlay = false;
              localStorage.setItem(StorageVariables.Queue, JSON.stringify(stor_queue));
            }
            stor_queue.soundobjs?.splice(TempTake, size);
            initQueue(stor_queue);
        }
  }, []);

  return (
    <div
      className={`w-full min-h-screen flex scroller bg-gradient-to-b from-dark-200/80 to-dark-200 ${isDark ? "dark" : ""
        }`}
    >
      <Routes>
        <Route path="/" element={<LayStartup />}>
          <Route index element={<Welcome />} />
          <Route path="search" element={<Search />} />
          <Route path="genres" element={<Settings />} />
          <Route path="createplaylist" element={<Settings />} />
          <Route path="history" element={<History />} />
          <Route path="queue" element={<Queue />} />
          <Route path="settings" element={<Settings />} />

          <Route path="album" element={<Outlet />}>
            <Route path=":id" element={<ListeningAlbum />} />
          </Route>
          <Route path="playlist" element={<Outlet />}>
          </Route>

          <Route path="overview" element={<Outlet />}>
            <Route path=":nickname" element={<OverviewProfile />} />
          </Route>

          <Route path="profile" element={<LayProfile />}>
            <Route path="" element={<Profile />}>
              <Route index element={<ProfileSingles />} />
              <Route path="playlists" element={<ProfilePlaylists />} />
              <Route path="albums" element={<ProfileAlbums />} />
            </Route>
          </Route>
        </Route>

        <Route path="s&a" element={<AuthorizateRoute user={user}><Outlet /></AuthorizateRoute>}>
          <Route index element={<StudioIntro />} />
          <Route path="creativestudio" element={<div>studio</div>} />
          <Route path="analytics" element={<LayAnalytics />}>
            <Route index element={<Welcome />} />
            <Route path="audience" element={<Welcome />} />
            <Route path="research" element={<Welcome />} />
          </Route>
        </Route>

        <Route path="upload" element={<AuthorizateRoute user={user}><Outlet /></AuthorizateRoute>}>
          <Route index element={<UploadIntro />} />
          <Route path="album" element={<div>album</div>} />
          <Route path="single" element={<div>single</div>} />
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
