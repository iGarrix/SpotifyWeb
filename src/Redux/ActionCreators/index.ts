import * as UserActions from "../Reducers/UserReducer/actions";
import * as MyPlaylistActions from "../Reducers/MyPlaylistReducer/actions";
import * as MyAlbumActions from "../Reducers/MyAlbumReducer/actions";
import * as MySingleActions from "../Reducers/MySingleReducer/actions";
import * as SelectedAlbumActions from "../Reducers/PlayingReducer/actions";
import * as NotificationActions from "../Reducers/NotificationReducer/action";
import * as GenreActions from "../Reducers/GenreReducer/actions";
import * as MainActions from "../Reducers/MainReducer/actions";
import * as MyMediaLibraryAction from "../Reducers/MyMediaLibraryReducer/action";
import * as SearchActions from "../Reducers/SearchReducer/actions";
import * as Uploadctions from "../Reducers/UploadReducer/actions";
import * as GlobalActions from "../Reducers/GlobalReducer/action";

export default {
  ...UserActions,
  ...MyPlaylistActions,
  ...MyAlbumActions,
  ...MySingleActions,
  ...SelectedAlbumActions,
  ...NotificationActions,
  ...GenreActions,
  ...MainActions,
  ...MyMediaLibraryAction,
  ...SearchActions,
  ...Uploadctions,
  ...GlobalActions,
};
