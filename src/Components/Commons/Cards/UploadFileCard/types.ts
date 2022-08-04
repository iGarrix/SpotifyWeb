import { ISongData } from "../../../../Redux/Reducers/UploadReducer/types";

export interface IUploadFileCard {
    file: ISongData,
    disable?: boolean,
    onDelete: () => void,
    onChange: (e: any) => void,
}