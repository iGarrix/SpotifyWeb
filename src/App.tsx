import { useEffect, useState } from "react";
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
import { IQueue } from "./Redux/Reducers/PlayingReducer/types";
import { StorageVariables, TempTake } from "./types";
import { useActions } from "./Hooks/useActions";
import { useTypedSelector } from "./Hooks/useTypedSelector";
import { AuthorizateRoute } from "./Components/ProtectedRoutes/AuthorizateRoute";
import { StudioIntro } from "./Components/IntroView/StudioIntro";
import { UploadIntro } from "./Components/IntroView/UploadIntro";
import { History } from "./Components/Views/History";
import { PasswordSendEmail } from "./Components/Views/Auth/ForgotPassword/SendEmail";
import { PasswordVerifyCode } from "./Components/Views/Auth/ForgotPassword/VerifyCode";
import { NewPasswordChange } from "./Components/Views/Auth/ForgotPassword/NewPasswordChange";
import { LayAnalytics } from "./Components/Layout/LayAnalytics";
import { OverviewProfile } from "./Components/Views/OverViewProfile";
import { LayAccountSettings } from "./Components/Layout/LayAccountSettings";
import { VerifyEmail } from "./Components/Views/AccountSettings/VerifyEmail/SendCode";
import { VerifyCodEmail } from "./Components/Views/AccountSettings/VerifyEmail/VerifyCode";
import { DeleteProfile } from "./Components/Views/AccountSettings/DeleteProfile";
import { PersonalData } from "./Components/Views/AccountSettings/PersonalData";
import { VerifyAccount } from "./Components/Views/AccountSettings/VerifyAccount";
import { RequirementsVerified } from "./Components/Views/AccountSettings/VerifyAccount/RequirementsVerified";
import { RequirementsDefault } from "./Components/Views/AccountSettings/VerifyAccount/RequirementsDefault";
import { SendAppelation } from "./Components/Views/AccountSettings/SendAppelation";
import { Notifications } from "./Components/Views/AccountSettings/Notifications";
import { LogsInAccount } from "./Components/Views/AccountSettings/Notifications/LogsInAccount";
import { ActionsAccount } from "./Components/Views/AccountSettings/Notifications/ActionsAccount";
import { AppelationLogs } from "./Components/Views/AccountSettings/Notifications/AppelationLogs";
import { Genres } from "./Components/Views/Genre";
import { GenreDetails } from "./Components/Views/Genre/Details";
import { StatusAccount } from "./Components/Views/AccountSettings/Notifications/StatusAccount";
import { ListeningPlaylist } from "./Components/Views/ListeningPage/ListeningPlaylist";
import { WeeklyAlbums } from "./Components/Views/Welcome/WeeklyAlbums";
import { WeeklyArtist } from "./Components/Views/Welcome/WeeklyArtist";
import { MyMediaLibrary } from "./Components/Views/MyMediaLibrary";
import { MyMediaLibrarySingle } from "./Components/Views/MyMediaLibrary/SingleTracks";
import { MyMediaLibraryAlbums } from "./Components/Views/MyMediaLibrary/Albums";
import { MyMediaLibraryCreators } from "./Components/Views/MyMediaLibrary/Creators";
import { MyMediaLibraryPlaylists } from "./Components/Views/MyMediaLibrary/Playlists";
import { AllResultSearch } from "./Components/Views/Search/AllResult";
import { AlbumsResult } from "./Components/Views/Search/AlbumsResult";
import { PlaylistResult } from "./Components/Views/Search/PlaylistResult";
import { TracksResult } from "./Components/Views/Search/TracksResult";
import { ProfileResult } from "./Components/Views/Search/ProfileResult";
import { CreatorsResult } from "./Components/Views/Search/CreatorsResult";

function App() {
  const [isDark, setDark] = useState(false);

  const { initQueue } = useActions();

  document.documentElement.scrollTo(0, 0);

  const user = useTypedSelector(state => state.userReducer.profile);

  useEffect(() => {

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
      className={`w-full min-h-screen flex scroller bg-light-100/90 ${isDark ? "dark" : ""
        }`}
    >
      <Routes>
        <Route path="/" element={<LayStartup />}>
          <Route index element={<Welcome />} />
          <Route path="weeklyalbums" element={<WeeklyAlbums />} />
          <Route path="weeklyartist" element={<WeeklyArtist />} />
          <Route path="search" element={<Search />}>
            <Route index element={<AllResultSearch />} />
            <Route path="albums" element={<AlbumsResult />} />
            <Route path="playlists" element={<PlaylistResult />} />
            <Route path="tracks" element={<TracksResult />} />
            <Route path="artists" element={<CreatorsResult />} />
            <Route path="profiles" element={<ProfileResult />} />
          </Route>
          <Route path="genres" element={<Outlet />} >
            <Route index element={<Genres />} />
            <Route path=":name" element={<GenreDetails />} />
          </Route>
          <Route path="createplaylist" element={<Settings />} />
          <Route path="history" element={<History />} />
          <Route path="queue" element={<Queue />} />
          <Route path="settings" element={<Settings />} />

          <Route path="album" element={<Outlet />}>
            <Route path=":id" element={<ListeningAlbum />} />
          </Route>
          <Route path="playlist" element={<Outlet />}>
            <Route path=":id" element={<ListeningPlaylist />} />
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

          <Route path="medialibrary" element={<AuthorizateRoute user={user}><Outlet /></AuthorizateRoute>}>
            <Route path="" element={<MyMediaLibrary />} >
              <Route index element={<MyMediaLibrarySingle />} />
              <Route path="albums" element={<MyMediaLibraryAlbums />} />
              <Route path="playlists" element={<MyMediaLibraryPlaylists />} />
              <Route path="creators" element={<MyMediaLibraryCreators />} />
            </Route>
            {/* <Route path=":name" element={<GenreDetails />} /> */}
          </Route>
        </Route>

        <Route path="accountsettings" element={<AuthorizateRoute user={user}><Outlet /></AuthorizateRoute>}>
          <Route path="" element={<LayAccountSettings />}>
            <Route index element={<PersonalData />} />
            <Route path="verifyemail" element={<VerifyEmail />} />
            <Route path="verifycodeemail" element={<VerifyCodEmail />} />
            <Route path="deleteaccount" element={<DeleteProfile />} />
            <Route path="sendappelation" element={<SendAppelation />} />
            <Route path="verifyaccount" element={<VerifyAccount />}>
              <Route index element={<RequirementsDefault />} />
              <Route path="verified" element={<RequirementsVerified />} />
            </Route>
            <Route path="notification" element={<Notifications />}>
              <Route index element={<LogsInAccount />} />
              <Route path="actions" element={<ActionsAccount />} />
              <Route path="appeal" element={<AppelationLogs />} />
              <Route path="status" element={<StatusAccount />} />
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
          <Route path="passwordSendEmail" element={<PasswordSendEmail />} />
          <Route path="passwordVerifyCode" element={<PasswordVerifyCode />} />
          <Route path="newPasswordChange" element={<NewPasswordChange />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
