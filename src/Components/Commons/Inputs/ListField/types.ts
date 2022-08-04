import { IUserSearch } from "../../../../Redux/Reducers/SearchReducer/types";

export interface IListField {
    title: string | any,
    placeholder: string | any,
    items: Array<IUserSearch>,
    value?: string | any,
    onRemove?: () => void,
    onOpenList?: () => void,
}