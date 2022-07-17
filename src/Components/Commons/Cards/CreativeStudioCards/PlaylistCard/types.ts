export interface IPlaylistCard {
    image: string | any,
    name: string | any,
    date: Date | any,
    listening: number | any,
    onClick: () => void,
    onEdit: () => void,
    onDelete: () => void,
}