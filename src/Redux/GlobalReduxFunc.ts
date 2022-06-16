import { Dispatch } from "redux";
import { MyAlbumActionTypes } from "./Reducers/MyAlbumReducer/types";
import { MyPlaylistActionTypes } from "./Reducers/MyPlaylistReducer/types";
import { MySingleActionTypes } from "./Reducers/MySingleReducer/types";
import { SelectAlbumActionTypes } from "./Reducers/SelectAlbumReducer/types";
import { UserActionTypes } from "./Reducers/UserReducer/types";

export function ClearRedux (dispatch: Dispatch<any>) {
    dispatch({ type: UserActionTypes.INITUSER_CLEAR });
    dispatch({ type: MyPlaylistActionTypes.INITMYPLAYLIST_CLEAR });
    dispatch({ type: MyAlbumActionTypes.INITMYALBUM_CLEAR });
    dispatch({ type: MySingleActionTypes.INITMYSINGLE_CLEAR });
    dispatch({ type: SelectAlbumActionTypes.INITSELECTALBUMS_CLEAR });
    localStorage.removeItem("token");
    localStorage.removeItem("refreshtoken");
    localStorage.removeItem("expiredin");
};