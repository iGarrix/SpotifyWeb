import React from "react";
import { Helmet } from "react-helmet";
import { AlbumCard } from "../../Commons/Cards/AlbumCard";

const icon_play = require('../../../Assets/Icons/Play.png');
const bg = require('../../../Assets/Background2.png');

export const Welcome: React.FC = () => {

  return (
    <div className="flex flex-col text-white">
      <Helmet>
        <title>Soundwave | Favorite playlists | Idol artists</title>
      </Helmet>
      <div className="py-16 grid grid-cols-12 gap-x-8 bg-cover bg-no-repeat object-cover relative" style={{ backgroundImage: `url('https://cdn6.f-cdn.com/contestentries/1485199/11870803/5ca345afdf90b_thumb900.jpg')` }}>
        <div className="absolute w-full h-full top-0 left-0 bg-dark-200/70"></div>
        <div className="flex col-span-5 w-full justify-end items-center z-[2]">
          <img alt="bestofweek"
            className="bg-no-repeat object-cover bg-cover rounded-xl shadow-xl w-[264px] h-[264px]"
            src="https://cdn6.f-cdn.com/contestentries/1485199/11870803/5ca345afdf90b_thumb900.jpg" />
        </div>
        <div className="flex flex-col gap-2 col-start-6 col-span-7 z-[2]">
          <p className="font-medium text-xl">The best of week</p>
          <h1 className="font-semibold font-['Lexend'] text-4xl">Love The Way You Lie</h1>
          <p className="text-xl grid-cols-4 font-['Lexend'] text-gray-200">Eminem</p>
          <div className="bg-no-repeat object-cover bg-cover flex items-center justify-center w-[64px] h-[64px] rounded-full cursor-pointer"
            onClick={() => { }}
            style={{ backgroundImage: `url(${bg})` }}>
            <img alt="icon" className="w-[30px] -translate-x-[0.8px]" src={icon_play} />
          </div>
        </div>
      </div>
      <div className="py-4 px-6 flex flex-col gap-4">
        <h1 className="font-medium text-2xl">Weekly top albums</h1>
        <div className="flex justify-between gap-6">
          <AlbumCard name={"Love The Way You Lie"} songs={25} image={"https://cdn.singulart.com/artworks/v2/cropped/8331/main/fhd/753167_3a97ba237814bbfb4f7f3caa48bc60e0.jpeg"} onClick={() => { }} />
          <AlbumCard name={"Love The Way You Lie"} songs={25} image={"https://qph.fs.quoracdn.net/main-qimg-6f159101be18691448fd490d91a11e40-lq"} onClick={() => { }} />
          <AlbumCard name={"Love The Way You Lie"} songs={25} image={"https://i.scdn.co/image/ab67616d0000b273a0397f44bdadffb85fa2a3b5"} onClick={() => { }} />
          <AlbumCard name={"Love The Way You Lie"} songs={25} image={"https://cdn.singulart.com/artworks/v2/cropped/8331/main/fhd/753167_3a97ba237814bbfb4f7f3caa48bc60e0.jpeg"} onClick={() => { }} />
          <AlbumCard name={"Love The Way You Lie"} songs={25} image={"https://qph.fs.quoracdn.net/main-qimg-6f159101be18691448fd490d91a11e40-lq"} onClick={() => { }} />
          <AlbumCard name={"Love The Way You Lie"} songs={25} image={"https://i.scdn.co/image/ab67616d0000b273a0397f44bdadffb85fa2a3b5"} onClick={() => { }} />
          <AlbumCard name={"Love The Way You Lie"} songs={25} image={"https://cdn.singulart.com/artworks/v2/cropped/8331/main/fhd/753167_3a97ba237814bbfb4f7f3caa48bc60e0.jpeg"} onClick={() => { }} />
          <AlbumCard name={"Love The Way You Lie"} songs={25} image={"https://qph.fs.quoracdn.net/main-qimg-6f159101be18691448fd490d91a11e40-lq"} onClick={() => { }} />
          <AlbumCard name={"Love The Way You Lie"} songs={25} image={"https://i.scdn.co/image/ab67616d0000b273a0397f44bdadffb85fa2a3b5"} onClick={() => { }} />
        </div>
      </div>
    </div>
  );
};