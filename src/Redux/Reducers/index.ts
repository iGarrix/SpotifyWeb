import { combineReducers } from "redux";
import { myAlbumsReducer } from "./MyAlbumReducer";
import { myPlaylistReducer } from "./MyPlaylistReducer";
import { mySinglesReducer } from "./MySingleReducer";
import { playingReducer } from "./SelectAlbumReducer";
import { userReducer } from "./UserReducer";

export const rootReducer = combineReducers({
  userReducer: userReducer,
  myPlaylistReducer: myPlaylistReducer,
  myAlbumsReducer: myAlbumsReducer,
  mySingleReducer: mySinglesReducer,
  playingReducer: playingReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
