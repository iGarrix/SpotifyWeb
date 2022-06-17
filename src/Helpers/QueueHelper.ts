import { IQueue, ITrackResponse } from "../Redux/Reducers/SelectAlbumReducer/types";
import { StorageVariables } from "../types";


export const SetPlayingTrack = async (item: ITrackResponse | null) => {
    if (item) {
        const storageQueue = localStorage.getItem(StorageVariables.Queue);
        if (storageQueue) {
            if ((JSON.parse(storageQueue) as IQueue).soundobjs[0].track?.returnId === item.track?.returnId && (JSON.parse(storageQueue) as IQueue).isPlay) {
                const newQueue : IQueue = {soundobjs: [...(JSON.parse(storageQueue) as IQueue).soundobjs], isPlay: false};
                localStorage.setItem(StorageVariables.Queue, JSON.stringify(newQueue));
                return newQueue;
            }
            if ((JSON.parse(storageQueue) as IQueue).soundobjs.length === 1) {
                const newQueue : IQueue = {soundobjs: [item], isPlay: true};
                localStorage.setItem(StorageVariables.Queue, JSON.stringify(newQueue));
                return newQueue;
            }
            const newQueue : IQueue = {soundobjs: [item, ...(JSON.parse(storageQueue) as IQueue).soundobjs], isPlay: true};
            localStorage.setItem(StorageVariables.Queue, JSON.stringify(newQueue));
            return newQueue;
        }
        const newQueue : IQueue = {soundobjs: [item], isPlay: true};
        localStorage.setItem(StorageVariables.Queue, JSON.stringify(newQueue));
        return newQueue;
    }
    return null;
}