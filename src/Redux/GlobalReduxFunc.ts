import { Dispatch } from "redux";
import { MyGenreActionTypes } from "./Reducers/GenreReducer/types";
import { MyAlbumActionTypes } from "./Reducers/MyAlbumReducer/types";
import { MyPlaylistActionTypes } from "./Reducers/MyPlaylistReducer/types";
import { MySingleActionTypes } from "./Reducers/MySingleReducer/types";
import { PlayingActionTypes } from "./Reducers/SelectAlbumReducer/types";
import { UserActionTypes } from "./Reducers/UserReducer/types";

export function ClearRedux (dispatch: Dispatch<any>) {
    dispatch({ type: UserActionTypes.INITUSER_CLEAR });
    dispatch({ type: MyPlaylistActionTypes.INITMYPLAYLIST_CLEAR });
    dispatch({ type: MyAlbumActionTypes.INITMYALBUM_CLEAR });
    dispatch({ type: MySingleActionTypes.INITMYSINGLE_CLEAR });
    dispatch({ type: PlayingActionTypes.INITSELECTALBUMS_CLEAR });
    dispatch({ type: MyGenreActionTypes.INITGENRE_CLEAR });
    localStorage.removeItem("token");
    localStorage.removeItem("refreshtoken");
    localStorage.removeItem("expiredin");
};