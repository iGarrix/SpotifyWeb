import { faMusic } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Guid } from "guid-typescript";
import React, { useEffect, useTransition } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { AddToHistory, SetPlayingTrack } from "../../../Helpers/QueueHelper";
import { useActions } from "../../../Hooks/useActions";
import { useTypedSelector } from "../../../Hooks/useTypedSelector";
import { IPagableMyAlbumItem } from "../../../Redux/Reducers/MyAlbumReducer/types";
import { ITrackResponse } from "../../../Redux/Reducers/SelectAlbumReducer/types";
import { baseUrl, defaultAvatarImage, GetUserAvatar, IHistory, StorageVariables } from "../../../types";
import { AlbumCard } from "../../Commons/Cards/AlbumCard";
import { SoundItem } from "../../Commons/Cards/SoundItem";

const icon_play = require('../../../Assets/Icons/Play.png');
const bg = require('../../../Assets/Background2.png');

export const Welcome: React.FC = () => {
  const { initHistory, getMainArtist, getMainAlbums, getMainTracks, initQueue, clearTracks } = useActions();
  const [isPending, startTransition] = useTransition();

  const playingReducer = useTypedSelector(state => state.playingReducer);
  const mainReducer = useTypedSelector(state => state.mainReducer);
  const nav = useNavigate();

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
          await getMainTracks(album[0].albomDto?.returnId, page);
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
      localStorage.setItem(StorageVariables.Album, JSON.stringify(item));
      nav("/album/" + item?.albomDto?.returnId);
      await clearTracks();
    }
  }

  const onRedirectToAlbum = () => {
    const album = mainReducer.albums;
    if (album && album[0]) {
      onSelectAlbum(album[0]);
    }
  }
  return (
    <div className="flex flex-col text-white">
      <Helmet>
        <title>Soundwave</title>
      </Helmet>
      {
        mainReducer.albums &&
        <div className="py-10 grid grid-cols-12 gap-x-8 bg-cover bg-no-repeat object-cover relative" style={{ backgroundImage: `url('${baseUrl + "Images/AlbomTemplates/" + mainReducer.albums[0].albomDto?.templateimage}')` }}>
          <div className="absolute w-full h-full top-0 left-0 bg-dark-200/70"></div>
          <div className="flex col-span-5 w-full justify-end items-center z-[2]">
            <img alt="bestofweek"
              className="bg-no-repeat object-cover bg-cover rounded-xl shadow-xl w-[264px] h-[264px]"
              src={baseUrl + "Images/AlbomImages/" + mainReducer.albums[0].albomDto?.image} />
          </div>
          <div className="flex flex-col gap-2 col-start-6 col-span-7 z-[2]">
            <p className="font-medium text-xl">The best of week</p>
            <h1 className="font-semibold font-['Lexend'] text-4xl">{mainReducer.albums[0].albomDto?.name}</h1>
            <p className="text-xl grid-cols-4 font-['Lexend'] text-gray-200">{mainReducer.albums[0].creatorsAlbom && mainReducer.albums[0].creatorsAlbom[0].username}</p>
            <div className="bg-no-repeat object-cover bg-cover flex items-center justify-center w-[64px] h-[64px] rounded-full cursor-pointer"
              onClick={() => { }}
              style={{ backgroundImage: `url(${bg})` }}>
              <img alt="icon" className="w-[30px] -translate-x-[0.8px]" src={icon_play} onClick={onRedirectToAlbum} />
            </div>
          </div>
        </div>
      }
      <div className="py-4 px-6 flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          {
            mainReducer.albums &&
            <div className="w-full flex justify-between items-center">
              <h1 className="font-medium text-2xl text-dark-200">Weekly top albums</h1>
              <p className="text-dark-200/80 hover:text-primary-100 cursor-pointer select-none" onClick={() => { nav("weeklyalbums") }}>See all</p>
            </div>
          }
          <div className="flex items-center justify-between w-full flex-wrap">
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
          <div className="w-full gap-2 flex flex-col">
            <div className="w-full flex justify-between">
              <h1 className="font-medium text-2xl text-dark-200">Weekly top tracks</h1>
              <p className="text-dark-200/80 hover:text-primary-100 cursor-pointer select-none" onClick={onRedirectToAlbum}>See all</p>
            </div>
            {
              mainReducer.tracks ?
                <div>
                  {
                    mainReducer.tracks.map(item => {
                      return (
                        <SoundItem key={Guid.create().toString()} isPlay={playingReducer.queue && item.track ? playingReducer.queue.soundobjs[0].track?.returnId === item.track.returnId && playingReducer.queue?.isPlay : false}
                          isLiked={false} item={item} onClick={() => { onSelectTrack(item) }} />
                      )
                    })
                  }
                </div>
                :
                <div className="flex flex-col justify-center w-full gap-5 mt-[5%]">
                  <FontAwesomeIcon className="text-4xl font-medium text-dark-200" icon={faMusic} />
                  <div className="flex flex-col items-center gap-8 text-dark-200">
                    <div className="flex flex-col gap-3 items-center">
                      <h1 className="font-medium text-xl">Tracks not found</h1>
                    </div>
                  </div>
                </div>

            }
          </div>
          <div className="w-full gap-2 flex flex-col">
            <div className="w-full flex justify-between items-center">
              <h1 className="font-medium text-2xl text-dark-200">Weekly top artist</h1>
              <p className="text-dark-200/80 hover:text-primary-100 cursor-pointer select-none" onClick={() => { nav("weeklyartist") }}>See all</p>
            </div>
            <div className="flex items-center justify-between gap-4 flex-wrap">
              {
                mainReducer.artists &&
                mainReducer.artists.slice(0, 6).map(item => {
                  return (
                    <div key={Guid.create().toString()} className="flex flex-col cursor-pointer text-dark-200 gap-1" onClick={() => { nav("/overview/" + item.username) }}>
                      <img alt="artist" src={GetUserAvatar(item)}
                        onError={(tg: any) => { tg.target.src = defaultAvatarImage }}
                        className="w-[110px] h-[110px] bg-cover object-cover bg-no-repeat rounded-xl transition-all hover:shadow-xl" />
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
                  <h1 className="font-medium text-2xl text-dark-200">Recent played</h1>
                  <p className="text-dark-200/80 hover:text-primary-100 cursor-pointer select-none" onClick={() => { nav("history") }}>See all</p>
                </div>
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  {
                    playingReducer.history.soundobjs.map(item => {
                      return (
                        <AlbumCard key={Guid.create().toString()} name={item.track?.name} image={baseUrl + "Images/Tracks/" + item.track?.image} onClick={() => { onSelectTrack(item); nav("/history") }} />
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