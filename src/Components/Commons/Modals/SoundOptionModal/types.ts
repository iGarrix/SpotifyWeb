import { ITrackResponse } from "../../../../Redux/Reducers/SelectAlbumReducer/types";

export interface ISoundOptionModal {
    trigger: any,
    options?: {
        icon? : any,
        title: any,
        onClick: () => void,
    }[]
}
