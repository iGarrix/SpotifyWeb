import { ITrack } from "../../../../Redux/Reducers/SelectAlbumReducer/types";
import { IUser } from "../../../../types";

export interface ISoundHistoryItem {
    track: ITrack | null,
    trackCreators: IUser[] | null,
    options?: {
        icon: any,
        title: any,
        onClick: () => void,
    }[],
    onClick?: () => void,
}