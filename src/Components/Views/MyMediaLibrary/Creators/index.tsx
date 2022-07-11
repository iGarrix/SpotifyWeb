import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Guid } from "guid-typescript";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { useActions } from "../../../../Hooks/useActions";
import { useTypedSelector } from "../../../../Hooks/useTypedSelector";
import { IPagableMyAlbumItem } from "../../../../Redux/Reducers/MyAlbumReducer/types";
import { defaultAvatarImage, GetUserAvatar, StorageVariables } from "../../../../types";
import { DefaultButton } from "../../../Commons/Buttons/DefaultButton";
import { QuadraticLoader } from "../../../Commons/Loaders/QuadraticLoader";

export const MyMediaLibraryCreators: React.FC = () => {
  const nav = useNavigate();
  const { getMyMediaLibraryArtists, addMyMediaLibraryArtists, clearTracks } = useActions();
  const rx = useTypedSelector(state => state.myMediaLibraryReducer);
  const artists = useTypedSelector(state => state.myMediaLibraryReducer.artists);
  const user = useTypedSelector(state => state.userReducer.profile);
  const scrollHadler = async () => {
      if (document.documentElement.scrollHeight - (document.documentElement.scrollTop + window.innerHeight) <= 0) {
          if (rx.nextPage && !rx.loading) {
              const top = document.documentElement.scrollTop;
              await FetchNext();
              document.documentElement.scrollTop = top;
          }
      }
  }
  useEffect(() => {
      const fetchData = async () => {
          if (user) {
              // const rq: IGetAllMyAlbumRequest = {
              //     email: user.email,
              //     page: 1
              // }
              await getMyMediaLibraryArtists(1, user.email);
          }
      }
      fetchData();
  }, [user]);
  useEffect(() => {
      const listener = () => {
          document.addEventListener("scroll", scrollHadler);
      }
      listener();

      return function () {
          document.removeEventListener("scroll", scrollHadler);
      }

  }, [rx.nextPage && rx.loading])
  const FetchNext = async () => {
      if (rx.albums && rx.nextPage && user) {
          // const rq: IGetAllMyAlbumRequest = {
          //     email: user?.email,
          //     page: rx.nextPage,
          // }
          await addMyMediaLibraryArtists(1, user.email);
      }
  }
  const onSelectArtists = async (item: IPagableMyAlbumItem | null) => {
      if (item) {
          localStorage.setItem(StorageVariables.Album, JSON.stringify(item));
          nav("/users/" + item?.albomDto?.returnId);
          await clearTracks();
      }
  }
  return (
    <div className="w-full h-full flex flex-col justify-start items-center py-8 gap-12 relative">
      <Helmet>
        <title>Soundwave | MyMediaLibraryCreators</title>
      </Helmet>
      {
                rx.loading ?
                    <QuadraticLoader isVisisble={true} />
                    :
                    artists && rx.error.length === 0 ?
                        <div className="w-full flex flex-col items-center gap-20">
                            <div className="grid grid-cols-4 gap-16">
                                {/* {
                                    artists.map(item => {
                                        return (
                                          <h1></h1>
                                            // <ArtistsItem key={Guid.create().toString()} onClick={() => { onSelectArtists(item) }} name={item.playlistDto?.name} title={`${item.songs} songs`} imageSrc={item.playlistDto?.image} />
                                        )
                                    })
                                } */}
                                {
                                artists.map(item => {
                                    return (
                                        <div key={Guid.create().toString()} className="flex flex-col cursor-pointer text-dark-200 gap-1" onClick={() => { nav("/overview/" + item.username) }}>
                                          <img alt="artist" src={GetUserAvatar(item)}
                                            onError={(tg: any) => { tg.target.src = defaultAvatarImage }}
                                            className="w-[164px] h-[164px] bg-cover object-cover bg-no-repeat rounded-xl transition-all hover:shadow-xl" />
                                          <p className="text-center font-medium">{item.username}</p>
                                        </div>
                                      )
                                })
                            }
                            </div>
                        </div>
                        :
                        <>
                            <FontAwesomeIcon className="text-7xl font-medium text-dark-200" icon={faSquarePlus} />
                            <div className="flex flex-col items-center gap-8 text-dark-200">
                                <div className="flex flex-col gap-3 items-center">
                                    <h1 className="font-medium text-3xl">Save you first artist</h1>
                                    <p className="font-medium text-xl">You can also login your account</p>
                                </div>
                                <div>
                                    <DefaultButton onClick={() => { nav("/search") }} text={"Save you first artist"} />
                                </div>
                            </div>
                        </>
            }
    </div>
  );
};
