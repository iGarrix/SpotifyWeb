export interface IAlbumCard {
    image: string | any,
    description: string | any,
    name: string | any,
    date: Date | any,
    type?: boolean | any,
    listening: number | any,
    id: string | any,
    onEdit: () => void,
    onDelete: () => void,
}