import { ITrackResponse } from "../../../Redux/Reducers/SelectAlbumReducer/types";

export interface ISoundItem {
    isPlay: boolean,
    isLiked: boolean,
    item: ITrackResponse,
    onClick: () => void,
}