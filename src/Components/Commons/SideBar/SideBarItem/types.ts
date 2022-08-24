export interface ISideBarItem {
    text: string,
    icon?: any,
    isSelect?: boolean,
    isShowLabel?: boolean,
    onClick: () => void,
}