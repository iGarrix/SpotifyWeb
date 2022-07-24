import { ITrackResponse } from "../../../../Redux/Reducers/PlayingReducer/types";

export interface ISoundItem {
    isPlay: boolean,
    item: ITrackResponse,
    onClick: () => void,
}