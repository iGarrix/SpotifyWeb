import { combineReducers } from "redux";
import { myAlbumsReducer } from "./MyAlbumReducer";
import { myPlaylistReducer } from "./MyPlaylistReducer";
import { mySinglesReducer } from "./MySingleReducer";
import { notificationReducer } from "./NotificationReducer";
import { playingReducer } from "./SelectAlbumReducer";
import { userReducer } from "./UserReducer";

export const rootReducer = combineReducers({
  userReducer: userReducer,
  myPlaylistReducer: myPlaylistReducer,
  myAlbumsReducer: myAlbumsReducer,
  mySingleReducer: mySinglesReducer,
  playingReducer: playingReducer,
  notificationReducer: notificationReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
