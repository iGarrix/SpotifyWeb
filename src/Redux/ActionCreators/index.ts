import * as UserActions from "../Reducers/UserReducer/actions";
import * as MyPlaylistActions from "../Reducers/MyPlaylistReducer/actions";
import * as MyAlbumActions from "../Reducers/MyAlbumReducer/actions";
/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  ...UserActions,
  ...MyPlaylistActions,
  ...MyAlbumActions,
};
