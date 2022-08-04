import { IInvite } from "../../../../Redux/Reducers/NotificationReducer/types";

export interface IInviteCardProps {
    invite: IInvite,
    onRejected?: () => void,
    onAccept?: () => void,
}