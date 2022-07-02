import * as UserActions from "../Reducers/UserReducer/actions";
import * as MyPlaylistActions from "../Reducers/MyPlaylistReducer/actions";
import * as MyAlbumActions from "../Reducers/MyAlbumReducer/actions";
import * as MySingleActions from "../Reducers/MySingleReducer/actions";
import * as SelectedAlbumActions from "../Reducers/SelectAlbumReducer/actions";
import * as NotificationActions from "../Reducers/NotificationReducer/action";
/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  ...UserActions,
  ...MyPlaylistActions,
  ...MyAlbumActions,
  ...MySingleActions,
  ...SelectedAlbumActions,
  ...NotificationActions,
};
