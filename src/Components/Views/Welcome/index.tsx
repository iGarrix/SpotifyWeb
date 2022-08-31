import { faMusic } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Guid } from "guid-typescript";
import React, { useEffect, useTransition } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { AddToHistory, SetPlayingTrack } from "../../../Helpers/QueueHelper";
import { useActions } from "../../../Hooks/useActions";
import { useTypedSelector } from "../../../Hooks/useTypedSelector";
import { IPagableMyAlbumItem } from "../../../Redux/Reducers/MyAlbumReducer/types";
import { ITrackResponse } from "../../../Redux/Reducers/PlayingReducer/types";
import { baseUrl, defaultAlbumImage, defaultAvatarImage, GetUserAvatar, IHistory, StorageVariables } from "../../../types";
import { AlbumCard } from "../../Commons/Cards/AlbumCard";
import { SingleCard } from "../../Commons/Cards/SingleCard";
import { SoundItem } from "../../Commons/Cards/SoundItem";

const icon_play = require('../../../Assets/Icons/Play.png');
const bg = require('../../../Assets/Background2.png');

export const Welcome: React.FC = () => {
  const { initHistory, getMainArtist, getMainAlbums, getMainTracks, initQueue, clearTracks, initSelectAlbum } = useActions();
  const [isPending, startTransition] = useTransition();

  const playingReducer = useTypedSelector(state => state.playingReducer);
  const mainReducer = useTypedSelector(state => state.mainReducer);
  const user = useTypedSelector(state => state.userReducer.profile);
  const nav = useNavigate();
  const { t } = useTranslation();
  useEffect(() => {
    const storage_history = localStorage.getItem(StorageVariables.History);
    if (storage_history) {
      let stor_history = JSON.parse(storage_history) as IHistory;
      const size = stor_history.soundobjs.length;
      stor_history.soundobjs.splice(4, size);
      initHistory(stor_history);
    }

    startTransition(() => {
      const initLocalAsync = async (page: number) => {
        await getMainAlbums(page);
      }
      initLocalAsync(1);
    })
  }, []);

  useEffect(() => {
    startTransition(() => {
      const initLocalAsync = async (page: number) => {
        await getMainArtist(page);
      }
      initLocalAsync(1);
    })
  }, []);

  useEffect(() => {
    const album = mainReducer.albums;
    if (album && album[0]) {
      startTransition(() => {
        const initLocalTracksAsync = async (page: number) => {
          await getMainTracks(album[0].albomDto?.returnId, page, user ? user.email : "");
        }
        initLocalTracksAsync(1);
      })
    }
  }, [mainReducer.albums])

  const onSelectTrack = (item: ITrackResponse | null) => {
    const response = SetPlayingTrack(item);
    if (response) {
      initQueue(response);
      AddToHistory(item);
    }
  }

  const onSelectAlbum = async (item: IPagableMyAlbumItem | null) => {
    if (item) {
      await clearTracks();
      await initSelectAlbum(null);
      nav("/album/" + item?.albomDto?.returnId);
    }
  }

  const onRedirectToAlbum = () => {
    const album = mainReducer.albums;
    if (album && album[0]) {
      onSelectAlbum(album[0]);
    }
  }

  return (
    <div className="flex flex-col text-dark-200 dark:text-light-200 z-10 overflow-x-hidden">
      <Helmet>
        <title>Soundwave</title>
      </Helmet>
      {
        mainReducer.albums && mainReducer.albums[0] && mainReducer.albums[0].creatorsAlbom && mainReducer.albums[0].creatorsAlbom[0].username &&
        <div className="py-10 grid grid-cols-12 gap-x-8 mm:gap-4 mm:flex mm:flex-col mm:items-center bg-cover bg-no-repeat object-cover relative" style={{ backgroundImage: `url('${baseUrl + "Images/AlbomTemplates/" + mainReducer.albums[0].albomDto?.templateimage}')` }}>
          <div className="absolute w-full h-full top-0 left-0 bg-dark-200/70"></div>
          <div className="flex col-span-5 w-full justify-end mm:justify-center items-center z-[2]">
            <img alt="bestofweek"
              className="bg-no-repeat object-cover bg-cover rounded-xl shadow-xl w-[264px] h-[264px] mm:w-[164px] mm:h-[164px] sm:w-[164px] sm:h-[164px] md:w-[184px] md:h-[184px] lg:w-[200px] lg:h-[200px] xl:w-[244px] xl:h-[244px]"
              src={baseUrl + "Images/AlbomImages/" + mainReducer.albums[0].albomDto?.image} onError={(tg: any) => { tg.target.src = defaultAlbumImage }} />
          </div>
          <div className="flex flex-col mm:items-center gap-4 sm:gap-2 md:gap-2 lg:gap-2 col-start-6 col-span-7 z-[2]">
            <p className="font-medium text-xl md:text-lg xl:text-lg select-none text-light-200 mm:hidden sm:hidden">{t("The best of week")}</p>
            <h1 className="font-semibold text-4xl mm:text-2xl sm:text-2xl md:text-2xl lg:text-2xl text-light-200">{mainReducer.albums[0].albomDto?.name}</h1>
            <p className="text-xl mm:text-base sm:text-base md:text-base lg:text-lg grid-cols-4 text-gray-200">{t("Creat")} {mainReducer.albums[0].creatorsAlbom && mainReducer.albums[0].creatorsAlbom.map(item => item.username).join(", ")}</p>
            <div className="bg-no-repeat object-cover bg-cover flex items-center justify-center sm:mt-auto md:mt-auto lg:mt-auto
             w-[64px] h-[64px] mm:w-[54px] mm:h-[54px] sm:w-[54px] sm:h-[54px] md:w-[54px] md:h-[54px] lg:w-[54px] lg:h-[54px] rounded-full cursor-pointer"
              onClick={onRedirectToAlbum}
              style={{ backgroundImage: `url(${bg})` }}>
              <img alt="icon" className="w-[30px] mm:w-[28px] sm:w-[28px] md:w-[28px] lg:w-[28px] -translate-x-[0.8px] select-none" src={icon_play} />
            </div>
          </div>
        </div>
      }
      <div className="py-4 px-6 mm:px-2 flex flex-col gap-6 mm:gap-4 sm:gap-4">
        <div className="flex flex-col gap-3">
          {
            mainReducer.albums &&
            <div className="w-full flex justify-between items-center">
              <h1 className="font-medium text-2xl">{t("Weekly top albums")}</h1>
              <p className="hover:text-primary-100 cursor-pointer select-none" onClick={() => { nav("weeklyalbums") }}>{t("See all")}</p>
            </div>
          }
          <div className="flex gap-[18px] w-full flex-wrap">
            {
              mainReducer.albums &&
              mainReducer.albums.slice(0, 8).map(item => {
                return (
                  <AlbumCard key={Guid.create().toString()}
                    name={item.albomDto ? item.albomDto?.name.substring(0, 12) + `${item.albomDto.name.length >= 12 ? "..." : ""}` : "Unknown"}
                    songs={item.songs}
                    image={baseUrl + "Images/AlbomImages/" + item.albomDto?.image} onClick={() => { onSelectAlbum(item) }} />

                )
              })
            }
          </div>
        </div>
        <div className="w-full grid grid-rows-1 grid-cols-2 mt-4 gap-10">
          <div className="w-full gap-2 flex flex-col mm:col-span-full sm:col-span-full md:col-span-full lg:col-span-full">
            <div className="w-full flex justify-between">
              <h1 className="font-medium text-2xl">{t("Weekly top tracks")}</h1>
              <p className="hover:text-primary-100 cursor-pointer select-none" onClick={onRedirectToAlbum}>{t("See all")}</p>
            </div>
            {
              mainReducer.tracks ?
                <div className="flex flex-col gap-[15px]">
                  {
                    mainReducer.tracks.map(item => {
                      return (
                        <SoundItem key={Guid.create().toString()}
                          isPlay={playingReducer.queue && item.track ? playingReducer.queue.soundobjs[playingReducer.queue.playedIndex].track?.returnId === item.track.returnId && playingReducer.queue?.isPlay : false}
                          item={item} onClick={() => { onSelectTrack(item) }} />
                      )
                    })
                  }
                </div>
                :
                <div className="flex flex-col justify-center w-full gap-5 mt-[5%]">
                  <FontAwesomeIcon className="text-4xl font-medium" icon={faMusic} />
                  <div className="flex flex-col items-center gap-8">
                    <div className="flex flex-col gap-3 items-center">
                      <h1 className="font-medium text-xl">{t("Tracks not found")}</h1>
                    </div>
                  </div>
                </div>

            }
          </div>
          <div className="w-full gap-2 flex flex-col mm:col-span-full sm:col-span-full md:col-span-full lg:col-span-full">
            <div className="w-full flex justify-between items-center">
              <h1 className="font-medium text-2xl">{t("Weekly top artist")}</h1>
              <p className="hover:text-primary-100 cursor-pointer select-none" onClick={() => { nav("weeklyartist") }}>{t("See all")}</p>
            </div>
            <div className="flex gap-4 flex-wrap">
              {
                mainReducer.artists &&
                mainReducer.artists.slice(0, 6).map(item => {
                  return (
                    <div key={Guid.create().toString()} className="flex flex-col cursor-pointer gap-1" onClick={() => { nav("/overview/" + item.username) }}>
                      <img alt="artist" src={GetUserAvatar(item)}
                        onError={(tg: any) => { tg.target.src = defaultAvatarImage }}
                        className="w-[110px] h-[110px] mm:w-[164px] mm:h-[164px] bg-cover object-cover bg-no-repeat rounded-xl transition-all hover:shadow-xl" />
                      <p className="text-center font-medium">{item.username}</p>
                    </div>
                  )
                })
              }
            </div>
            {
              playingReducer.history &&
              <div className="flex flex-col gap-2">
                <div className="w-full flex justify-between mt-6 items-center">
                  <h1 className="font-medium text-2xl">{t("Recent played")}</h1>
                  <p className=" hover:text-primary-100 cursor-pointer select-none" onClick={() => { nav("history") }}>{t("See all")}</p>
                </div>
                <div className="flex gap-4 flex-wrap">
                  {
                    playingReducer.history.soundobjs.map(item => {
                      return (
                        <SingleCard key={Guid.create().toString()} image={baseUrl + "Images/Tracks/" + item.track?.image} onClick={() => { onSelectTrack(item); }} title={item.track?.name + "dfjghdfjghdfjkghdfjkghdfjkghdfjghxcbvnm"} />
                      )
                    })
                  }
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
};