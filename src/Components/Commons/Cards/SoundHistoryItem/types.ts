import { ITrack } from "../../../../Redux/Reducers/PlayingReducer/types";
import { IUser } from "../../../../types";

export interface ISoundHistoryItem {
    track: ITrack | null,
    trackCreators: IUser[] | null,
    index?: number,
    selected?: boolean,
    options?: {
        icon: any,
        title: any,
        onClick: () => void,
    }[],
    onClick?: () => void,
    onLike?: () => void,
}