import { IUserSearch } from "../../../../../Redux/Reducers/SearchReducer/types";

export interface IRemoveCreatorWithAlbumModal {
    artists: Array<IUserSearch>,
    onClose: () => void,
    onRemove: (user: IUserSearch) => void,
}