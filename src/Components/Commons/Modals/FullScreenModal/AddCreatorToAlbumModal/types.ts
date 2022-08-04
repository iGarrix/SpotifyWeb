import { IUserSearch } from "../../../../../Redux/Reducers/SearchReducer/types";

export interface IAddCreatorToAlbumModal {
    onClose: () => void,
    onAdd: (user: IUserSearch) => void,
}