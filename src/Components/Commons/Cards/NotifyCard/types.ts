export interface INotifyCard {
    message: any,
    date: Date,
    type?: "wait" | "success" | "error",
    isFunc?: boolean,
    onClick?: () => void,
}