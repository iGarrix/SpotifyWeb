import { IPagableMyPlaylistItem } from "../../../../../Redux/Reducers/MyPlaylistReducer/types";

export interface IChangePlaylistModal {
    onSave: () => void,
    onClose: () => void,
    playlist: IPagableMyPlaylistItem,
}