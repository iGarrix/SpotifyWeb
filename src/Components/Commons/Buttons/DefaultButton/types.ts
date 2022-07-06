export interface IDefaultButton {
    text: any,
    type?: "submit" | "button",
    importantDark?: boolean,
    onClick: () => void,
}