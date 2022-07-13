export interface IArtistResultCard {
    type: "Artist" | "Profile",
    name: string | any,
    surname: string | any,
    nickname: string | any,
    image: string | any
    onNavigate?: () => void,
    onSelect?: () => void,
}