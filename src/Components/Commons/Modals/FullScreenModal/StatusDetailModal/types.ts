import { IUserStatusResponse } from "../../../../../Redux/Reducers/NotificationReducer/types";

export interface IStatusDetailModal {
    data: IUserStatusResponse,
    onClose: () => void,
}