import { ITrackResponse } from "../../../../../Redux/Reducers/PlayingReducer/types";

export interface ISoundItemPlaylist {
    item: ITrackResponse,
    onDelete: () => void,
}