export interface IDropdownButtonItem {
    text: string,
    isDanger?: boolean,
    notifications?: string | null,
    icon?: any,
    onClick: () => void,
}