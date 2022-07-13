export interface ITrackResultCard {
    name: string | any,
    image: string | any,
    creators: string [] | any,
    isPlay?: boolean,
    onNavigate?: () => void,
    onSelect?: () => void,
}