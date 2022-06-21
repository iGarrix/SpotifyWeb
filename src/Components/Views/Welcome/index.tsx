import React from "react"; 
import { useNavigate } from "react-router-dom"; 
import { useActions } from "../../../Hooks/useActions"; 
import { useTypedSelector } from "../../../Hooks/useTypedSelector"; 
import { AlbumCard } from "../../Commons/Cards/AlbumCard";
 
const icon_play = require('../../../Assets/Icons/Play.png'); 
const icon_pause = require('../../../Assets/Icons/Pause.png'); 
const bg = require('../../../Assets/Background2.png'); 
 
export const Welcome: React.FC = () => { 
  const nav = useNavigate(); 
 
  const { LogoutUser } = useActions(); 
  const playingReducer = useTypedSelector(state => state.playingReducer); 
 
  const onPause = () => { 
 
 
  } 
 
  return ( 
    <div className="flex flex-col text-white"> 
      <div className="py-16 grid grid-cols-12 gap-x-8 bg-cover bg-no-repeat object-cover relative" style={{ backgroundImage: `url('https://m.media-amazon.com/images/M/MV5BYTMxZmI0ZmUtZTMyMy00MjVkLTgxOWEtMjE4NTkyN2IzYmJiXkEyXkFqcGdeQXVyNDg4MjkzNDk@._V1_.jpg')` }}> 
        <div className="absolute w-full h-full top-0 left-0 bg-dark-200/70"></div> 
        <div className="flex col-span-5 w-full justify-end items-center z-[2]"> 
          <img alt="bestofweek" 
          className="bg-no-repeat object-cover bg-cover rounded-xl shadow-xl w-[264px] h-[264px]"  
          src="https://m.media-amazon.com/images/M/MV5BYTMxZmI0ZmUtZTMyMy00MjVkLTgxOWEtMjE4NTkyN2IzYmJiXkEyXkFqcGdeQXVyNDg4MjkzNDk@._V1_.jpg" /> 
        </div> 
        <div className="flex flex-col gap-2 col-start-6 col-span-7 z-[2]"> 
          <p className="font-medium text-xl">The best of week</p> 
          <h1 className="font-semibold font-['Lexend'] text-4xl">Love The Way You Lie</h1> 
          <p className="text-xl grid-cols-4 font-['Lexend'] text-gray-200">Eminem</p> 
          <div className="bg-no-repeat object-cover bg-cover flex items-center justify-center w-[64px] h-[64px] rounded-full cursor-pointer" 
            onClick={onPause} 
            style={{ backgroundImage: `url(${bg})` }}> 
            { 
              playingReducer.queue?.isPlay ? 
                <img alt="icon" className="w-[30px] -translate-x-[0.5px]" src={icon_pause} /> 
                : 
                <img alt="icon" className="w-[30px] -translate-x-[0.8px]" src={icon_play} /> 
 
            } 
          </div> 
        </div> 
      </div> 
      <div className="py-4 px-6 flex flex-col gap-4"> 
          <h1 className="font-medium text-2xl">Weekly top albums</h1>
          <div className="flex justify-between gap-6">
            <AlbumCard name={"Love The Way You Lie"} songs={25} image={"https://m.media-amazon.com/images/M/MV5BYTMxZmI0ZmUtZTMyMy00MjVkLTgxOWEtMjE4NTkyN2IzYmJiXkEyXkFqcGdeQXVyNDg4MjkzNDk@._V1_.jpg"} onClick={() => {}} />
            <AlbumCard name={"Love The Way You Lie"} songs={25} image={"https://m.media-amazon.com/images/M/MV5BYTMxZmI0ZmUtZTMyMy00MjVkLTgxOWEtMjE4NTkyN2IzYmJiXkEyXkFqcGdeQXVyNDg4MjkzNDk@._V1_.jpg"} onClick={() => {}} />
            <AlbumCard name={"Love The Way You Lie"} songs={25} image={"https://m.media-amazon.com/images/M/MV5BYTMxZmI0ZmUtZTMyMy00MjVkLTgxOWEtMjE4NTkyN2IzYmJiXkEyXkFqcGdeQXVyNDg4MjkzNDk@._V1_.jpg"} onClick={() => {}} />
            <AlbumCard name={"Love The Way You Lie"} songs={25} image={"https://m.media-amazon.com/images/M/MV5BYTMxZmI0ZmUtZTMyMy00MjVkLTgxOWEtMjE4NTkyN2IzYmJiXkEyXkFqcGdeQXVyNDg4MjkzNDk@._V1_.jpg"} onClick={() => {}} />
            <AlbumCard name={"Love The Way You Lie"} songs={25} image={"https://m.media-amazon.com/images/M/MV5BYTMxZmI0ZmUtZTMyMy00MjVkLTgxOWEtMjE4NTkyN2IzYmJiXkEyXkFqcGdeQXVyNDg4MjkzNDk@._V1_.jpg"} onClick={() => {}} />
            <AlbumCard name={"Love The Way You Lie"} songs={25} image={"https://m.media-amazon.com/images/M/MV5BYTMxZmI0ZmUtZTMyMy00MjVkLTgxOWEtMjE4NTkyN2IzYmJiXkEyXkFqcGdeQXVyNDg4MjkzNDk@._V1_.jpg"} onClick={() => {}} />
            <AlbumCard name={"Love The Way You Lie"} songs={25} image={"https://m.media-amazon.com/images/M/MV5BYTMxZmI0ZmUtZTMyMy00MjVkLTgxOWEtMjE4NTkyN2IzYmJiXkEyXkFqcGdeQXVyNDg4MjkzNDk@._V1_.jpg"} onClick={() => {}} />
            <AlbumCard name={"Love The Way You Lie"} songs={25} image={"https://m.media-amazon.com/images/M/MV5BYTMxZmI0ZmUtZTMyMy00MjVkLTgxOWEtMjE4NTkyN2IzYmJiXkEyXkFqcGdeQXVyNDg4MjkzNDk@._V1_.jpg"} onClick={() => {}} />
          </div>
      </div> 
    </div> 
  ); 
};