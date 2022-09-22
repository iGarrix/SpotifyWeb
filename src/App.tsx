import { useEffect, useState } from "react";
import "./App.scss";

import { Outlet, Route, Routes } from "react-router-dom";
import { NotFound } from "./Components/Views/NotFound";
import { LayAuth } from "./Components/Layout/LayAuth";
import { LayStartup } from "./Components/Layout/LayStartup";
import { Login } from "./Components/Views/Auth/Login";
import { Register } from "./Components/Views/Auth/Register";
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
import { LanguageVars, StorageVariables, TempTake, Theme } from "./types";
import { useActions } from "./Hooks/useActions";
import { useTypedSelector } from "./Hooks/useTypedSelector";
import { AuthorizateRoute } from "./Components/ProtectedRoutes/AuthorizateRoute";
import { UploadIntro } from "./Components/IntroView/UploadIntro";
import { History } from "./Components/Views/History";
import { PasswordSendEmail } from "./Components/Views/Auth/ForgotPassword/SendEmail";
import { PasswordVerifyCode } from "./Components/Views/Auth/ForgotPassword/VerifyCode";
import { NewPasswordChange } from "./Components/Views/Auth/ForgotPassword/NewPasswordChange";
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
import { StudioPlaylist } from "./Components/Views/CreativeStudio/Playlist/StudioPlaylist";
import { LayCreativeStudio } from "./Components/Layout/LayCreativeStudio";
import { OverViewPlaylist } from "./Components/Views/CreativeStudio/Playlist/OverviewPlaylist";
import { WebSettings } from "./Components/Views/WebSettings";
import { StudioSingle } from "./Components/Views/CreativeStudio/Single";
import { StudioAlbum } from "./Components/Views/CreativeStudio/Album";
import { OverviewProfileSingles } from "./Components/Views/OverViewProfile/OverviewProfileSingles";
import { OverviewProfilePlaylists } from "./Components/Views/OverViewProfile/OverviewProfilePlaylists";
import { OverviewProfileAlbums } from "./Components/Views/OverViewProfile/OverviewProfileAlbums";
import { LayUpload } from "./Components/Layout/LayUpload";
import { UploadSinglePage } from "./Components/Views/UploadingPages/UploadSinglePage";
import { UploadSingleStepOne } from "./Components/Views/UploadingPages/UploadSinglePage/UploadSingleStepOne";
import { UploadSingleStepTwo } from "./Components/Views/UploadingPages/UploadSinglePage/UploadSingleStepTwo";
import { UploadSingleStepThree } from "./Components/Views/UploadingPages/UploadSinglePage/UploadSingleStepThree";
import { UploadAlbumPage } from "./Components/Views/UploadingPages/UploadAlbumPage";
import { UploadAlbumStepOne } from "./Components/Views/UploadingPages/UploadAlbumPage/UploadAlbumStepOne";
import { UploadAlbumStepTwo } from "./Components/Views/UploadingPages/UploadAlbumPage/UploadAlbumStepTwo";
import { UploadAlbumStepThree } from "./Components/Views/UploadingPages/UploadAlbumPage/UploadAlbumStepThree";
import { Invites } from "./Components/Views/AccountSettings/Notifications/Invites";
import { useTranslation } from "react-i18next";

function App() {

  const { theme} = useTypedSelector(state => state.globalReducer);

  const { i18n } = useTranslation();

  const { initQueue } = useActions();

  document.documentElement.scrollTo(0, 0);

  const user = useTypedSelector(state => state.userReducer.profile);

  const [lang, setLang] = useState(() => {
    const local_lang = localStorage.getItem("lang");
    if (local_lang) {
        return local_lang;
    }
    else {
      localStorage.setItem("lang", LanguageVars.EN);
      return LanguageVars.EN;
    }
  });

  useEffect(() => {
    if (lang) {   
      i18n.changeLanguage(lang);
    }
    else {
      i18n.changeLanguage(LanguageVars.EN);
    }
  }, [lang]);

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
      className={`w-full min-h-screen flex scroller ${theme === Theme.dark ? "dark from-dark-200/80 to-dark-200/100 bg-gradient-to-b" : "bg-gradient-to-b from-light-200/80 to-light-100/100"}`}
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
          <Route path="history" element={<History />} />
          <Route path="queue" element={<Queue />} />

          <Route path="album" element={<Outlet />}>
            <Route path=":id" element={<ListeningAlbum />} />
          </Route>
          <Route path="playlist" element={<Outlet />}>
            <Route path=":id" element={<ListeningPlaylist />} />
          </Route>

          <Route path="overview" element={<Outlet />}>
            <Route path=":nickname" element={<OverviewProfile />} >
              <Route index element={<OverviewProfileSingles />} />
              <Route path="playlists" element={<OverviewProfilePlaylists />} />
              <Route path="albums" element={<OverviewProfileAlbums />} />
            </Route>
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
          </Route>

          <Route path="websettings" element={<WebSettings />} />
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
              <Route path="invites" element={<Invites />} />
            </Route>
          </Route>
        </Route>

        <Route path="creativestudio" element={<AuthorizateRoute user={user}><LayCreativeStudio /></AuthorizateRoute>}>
          <Route index element={<StudioPlaylist />}/>
          <Route path="overviewplaylist" element={<Outlet />} >
            <Route path=":id" element={<OverViewPlaylist />}/>
          </Route>
          <Route path="single" element={<StudioSingle />} />
          <Route path="album" element={<StudioAlbum />} />
        </Route>

        <Route path="upload" element={<LayUpload />}>
          <Route index element={<UploadIntro />} />
          <Route path="album" element={<UploadAlbumPage />}>
            <Route index element={<UploadAlbumStepOne />} />
            <Route path="information" element={<UploadAlbumStepTwo />}/>
            <Route path="overview" element={<UploadAlbumStepThree />}/>
          </Route>
          <Route path="single" element={<UploadSinglePage />}>
            <Route index element={<UploadSingleStepOne />} />
            <Route path="information" element={<UploadSingleStepTwo />}/>
            <Route path="overview" element={<UploadSingleStepThree />}/>
          </Route>
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
