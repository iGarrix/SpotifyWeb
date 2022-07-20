import { IPagableMyAlbumItem } from "../../../../../Redux/Reducers/MyAlbumReducer/types";

export interface IChangeAlbumModal {
    onSave: () => void,
    onClose: () => void,
    album: IPagableMyAlbumItem,
}