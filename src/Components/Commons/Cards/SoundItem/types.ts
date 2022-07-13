import { ITrackResponse } from "../../../../Redux/Reducers/PlayingReducer/types";

export interface ISoundItem {
    isPlay: boolean,
    isLiked: boolean,
    item: ITrackResponse,
    onClick: () => void,
}