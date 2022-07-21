import { ITrackResponse } from "../../../../../Redux/Reducers/PlayingReducer/types";

export interface ISoundItemSingle {
    item: ITrackResponse,
    listening: number,
    onDelete: () => void
}