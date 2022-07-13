export interface IAlbumResultCard {
    name: string | any,
    creators: string[] | any,
    image: string | any,
    isPlay?: boolean,
    onNavigate?: () => void,
    onSelect?: () => void,
}