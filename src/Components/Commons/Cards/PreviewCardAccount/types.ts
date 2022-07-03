import { IconProp } from "@fortawesome/fontawesome-svg-core";

export interface IPreviewCardAccount {
    ImageSrc: string,
    BackgroundSrc: string,
    title: string,
    nickname: string,
    email: string,
    icon: IconProp,
    isSelect?: boolean,
    onSelect?: () => void,
}