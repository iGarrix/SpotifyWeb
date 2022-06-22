import { IQueue, ITrackResponse } from "../Redux/Reducers/SelectAlbumReducer/types";
import { IHistory, StorageVariables } from "../types";


export const SetPlayingTrack = (item: ITrackResponse | null) => {
    if (item) {
        const storageQueue = localStorage.getItem(StorageVariables.Queue);
        if (storageQueue) {
            if ((JSON.parse(storageQueue) as IQueue).soundobjs[0].track?.returnId === item.track?.returnId && (JSON.parse(storageQueue) as IQueue).isPlay) {
                const newQueue: IQueue = { soundobjs: [...(JSON.parse(storageQueue) as IQueue).soundobjs], isPlay: false };
                localStorage.setItem(StorageVariables.Queue, JSON.stringify(newQueue));
                return newQueue;
            }
            if ((JSON.parse(storageQueue) as IQueue).soundobjs.length === 1) {
                const newQueue: IQueue = { soundobjs: [item], isPlay: true };
                localStorage.setItem(StorageVariables.Queue, JSON.stringify(newQueue));
                return newQueue;
            }
            const newQueue: IQueue = { soundobjs: [item, ...(JSON.parse(storageQueue) as IQueue).soundobjs.filter(f => f.track?.returnId !== item.track?.returnId)], isPlay: true };
            localStorage.setItem(StorageVariables.Queue, JSON.stringify(newQueue));
            return newQueue;
        }
        const newQueue: IQueue = { soundobjs: [item], isPlay: true };
        localStorage.setItem(StorageVariables.Queue, JSON.stringify(newQueue));
        return newQueue;
    }
    return null;
}

export const AddToQueue = (item: ITrackResponse | null, isPlay: boolean | any) => {
    if (item) {
        const storageQueue = localStorage.getItem(StorageVariables.Queue);
        if (storageQueue) {
            const queue : IQueue = JSON.parse(storageQueue) as IQueue;
            const index = queue.soundobjs.findIndex(f => f.track?.returnId === item.track?.returnId);
            if (index >= 0) {
                const newQueue: IQueue = {
                    soundobjs: [...(JSON.parse(storageQueue) as IQueue).soundobjs],
                    isPlay,
                };
                localStorage.setItem(StorageVariables.Queue, JSON.stringify(newQueue));
                return newQueue;
            }
            const newQueue: IQueue = { soundobjs: [...(JSON.parse(storageQueue) as IQueue).soundobjs, item], isPlay };
            localStorage.setItem(StorageVariables.Queue, JSON.stringify(newQueue));
            return newQueue;
        }
        const newQueue: IQueue = { soundobjs: [item], isPlay };
        localStorage.setItem(StorageVariables.Queue, JSON.stringify(newQueue));
        return newQueue;
    }
    return null;
}

export const AddToHistory = (item: ITrackResponse | null) => {
    if (item) {
        const storageHistory = localStorage.getItem(StorageVariables.History);
        if (storageHistory) {
            const history : IHistory = JSON.parse(storageHistory) as IHistory;
            const index = history.soundobjs.findIndex(f => f.track?.returnId === item.track?.returnId);
            if (index >= 0) {
                const newHistory: IHistory = {
                    soundobjs: [item, ...(JSON.parse(storageHistory) as IHistory).soundobjs.filter(f => f.track?.returnId !== item.track?.returnId)]
                };
                localStorage.setItem(StorageVariables.History, JSON.stringify(newHistory));
                return newHistory;
            }
            const newHistory: IHistory = {
                soundobjs: [item, ...(JSON.parse(storageHistory) as IHistory).soundobjs]
            };
            localStorage.setItem(StorageVariables.History, JSON.stringify(newHistory));
            return newHistory;
        }
        const newHistory: IHistory = {
            soundobjs: [item]
        };
        localStorage.setItem(StorageVariables.History, JSON.stringify(newHistory));
        return newHistory;
    }
    return null;
}

export const RemoveWithHistory = (trackId : string) => {
    if (trackId) {
        const storageHistory = localStorage.getItem(StorageVariables.History);
        if (storageHistory) {     
            const newHistory: IHistory = {
                soundobjs: [...(JSON.parse(storageHistory) as IHistory).soundobjs.filter(f => f.track?.returnId !== trackId)]
            };
            localStorage.setItem(StorageVariables.History, JSON.stringify(newHistory));
            return newHistory;
        }
        return null;
    }
    return null;
}

export const RemoveWithQueue = (trackId : string, isPlay: boolean) => {
    if (trackId) {
        const storageQueue = localStorage.getItem(StorageVariables.Queue);
        if (storageQueue) {     
            const newQueue: IQueue = {
                soundobjs: [...(JSON.parse(storageQueue) as IQueue).soundobjs.filter(f => f.track?.returnId !== trackId)],
                isPlay,
            };
            if (newQueue.soundobjs.length === 0) {
                localStorage.removeItem(StorageVariables.Queue);
                return null
            }        
            localStorage.setItem(StorageVariables.Queue, JSON.stringify(newQueue));
            return newQueue;
        }
        localStorage.removeItem(StorageVariables.Queue);
        return null;
    }
    localStorage.removeItem(StorageVariables.Queue);
    return null;
}