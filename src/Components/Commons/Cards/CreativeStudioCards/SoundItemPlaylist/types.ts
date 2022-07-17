import { ITrackResponse } from "../../../../../Redux/Reducers/PlayingReducer/types";

export interface ISoundItemPlaylist {
    isPlay: boolean,
    item: ITrackResponse,
    onClick: () => void,
    onDelete: () => void,
}