import { IQueue, ITrackResponse } from "../Redux/Reducers/PlayingReducer/types";
import { IHistory, shuffle, StorageVariables } from "../types";


export const SetPlayingTrack = (item: ITrackResponse | null) => {
    if (item) {
        const storageQueue = localStorage.getItem(StorageVariables.Queue);
        if (storageQueue) {
            const convertQueue = (JSON.parse(storageQueue) as IQueue);
            let findIndex = convertQueue.soundobjs.findIndex(f => f.track?.returnId === item.track?.returnId);
            if (findIndex >= 0) {
                const newQueue: IQueue = { soundobjs: convertQueue.soundobjs, isPlay: convertQueue.isPlay && findIndex === convertQueue.playedIndex ? false : true, playedIndex: findIndex, };
                localStorage.setItem(StorageVariables.Queue, JSON.stringify(newQueue));
                return newQueue;
            }
            const newQueue: IQueue = { soundobjs: [...(JSON.parse(storageQueue) as IQueue).soundobjs, item], isPlay: true, playedIndex: convertQueue.soundobjs.length, };
            localStorage.setItem(StorageVariables.Queue, JSON.stringify(newQueue));
            return newQueue;
        }
        const newQueue: IQueue = { soundobjs: [item], isPlay: true, playedIndex: 0, };
        localStorage.setItem(StorageVariables.Queue, JSON.stringify(newQueue));
        return newQueue;
    }
    return null;
}

export const AddToQueue = (item: ITrackResponse | null, isPlay: boolean | any) => {
    if (item) {
        const storageQueue = localStorage.getItem(StorageVariables.Queue);
        if (storageQueue) {
            const queue: IQueue = JSON.parse(storageQueue) as IQueue;
            const index = queue.soundobjs.findIndex(f => f.track?.returnId === item.track?.returnId);
            if (index >= 0) {
                const newQueue: IQueue = {
                    soundobjs: [...(JSON.parse(storageQueue) as IQueue).soundobjs],
                    playedIndex: queue.playedIndex,
                    isPlay,
                };
                localStorage.setItem(StorageVariables.Queue, JSON.stringify(newQueue));
                return newQueue;
            }
            const newQueue: IQueue = { soundobjs: [...(JSON.parse(storageQueue) as IQueue).soundobjs, item], isPlay, playedIndex: queue.playedIndex, };
            localStorage.setItem(StorageVariables.Queue, JSON.stringify(newQueue));
            return newQueue;
        }
        const newQueue: IQueue = { soundobjs: [item], isPlay, playedIndex: 0, };
        localStorage.setItem(StorageVariables.Queue, JSON.stringify(newQueue));
        return newQueue;
    }
    return null;
}

export const ForwardQueue = () => {
    const storageQueue = localStorage.getItem(StorageVariables.Queue);
    if (storageQueue) {
        let queue: IQueue = JSON.parse(storageQueue) as IQueue;
        if (queue) {         
            if (queue.soundobjs.length === 1) {
                return null;
            }
            if (queue.playedIndex < queue.soundobjs.length - 1) {
                const nextIndex = queue.playedIndex + 1;
                queue.playedIndex = nextIndex;
                localStorage.setItem(StorageVariables.Queue, JSON.stringify(queue));
                return queue;
            }
            else {
                queue.playedIndex = 0;
                localStorage.setItem(StorageVariables.Queue, JSON.stringify(queue));
                return queue;
            }
        }
    }
}

export const BackwardQueue = () => {
    const storageQueue = localStorage.getItem(StorageVariables.Queue);
    if (storageQueue) {
        let queue: IQueue = JSON.parse(storageQueue) as IQueue;
        if (queue) {         
            if (queue.soundobjs.length === 1) {
                return null;
            }
            if (queue.playedIndex === 0) {
                const nextIndex = queue.soundobjs.length - 1;
                queue.playedIndex = nextIndex;
                localStorage.setItem(StorageVariables.Queue, JSON.stringify(queue));
                return queue;
            }
            else {
                const nextIndex = queue.playedIndex - 1;
                queue.playedIndex = nextIndex;
                localStorage.setItem(StorageVariables.Queue, JSON.stringify(queue));
                return queue;
            }
        }
    }
}

export const ShuffleQueue = () => {
    const storageQueue = localStorage.getItem(StorageVariables.Queue);
    if (storageQueue) {
        let queue: IQueue = JSON.parse(storageQueue) as IQueue;
        const playedObj = queue.soundobjs[queue.playedIndex];
        if (queue && playedObj) {
            const objs = queue.soundobjs;
            const shuffle_objs = shuffle<ITrackResponse>(objs);
            const findIndex = shuffle_objs.findIndex(f => f.track?.returnId === playedObj.track?.returnId);
            queue.playedIndex = findIndex;
            queue.soundobjs = shuffle_objs;
            localStorage.setItem(StorageVariables.Queue, JSON.stringify(queue));
            return queue;      
        }
    }
    return null;
}

// export const NextTrackInQeueue = () => {
//     const storageQueue = localStorage.getItem(StorageVariables.Queue);
//     if (storageQueue) {
//         let queue: IQueue = JSON.parse(storageQueue) as IQueue;
//         if (queue.soundobjs.length > 1) {
//             queue.soundobjs.shift();
//             localStorage.setItem(StorageVariables.Queue, JSON.stringify(queue));
//             return queue;
//         }
//         localStorage.removeItem(StorageVariables.Queue);
//         return null
//     }
// }

export const AddToHistory = (item: ITrackResponse | null) => {
    if (item) {
        const storageHistory = localStorage.getItem(StorageVariables.History);
        if (storageHistory) {
            const history: IHistory = JSON.parse(storageHistory) as IHistory;
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

export const RemoveWithHistory = (trackId: string) => {
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

export const RemoveWithQueue = (trackId: string, isPlay: boolean) => {
    if (trackId) {
        const storageQueue = localStorage.getItem(StorageVariables.Queue);
        if (storageQueue) {
            const convertQueue = (JSON.parse(storageQueue) as IQueue);
            const newObjs: ITrackResponse[] = convertQueue.soundobjs.filter(f => f.track?.returnId !== trackId);
            const playedIndex = newObjs.findIndex(f => f.track?.returnId === trackId);
            const newQueue: IQueue = {
                soundobjs: newObjs,
                isPlay,
                playedIndex: playedIndex > 0 ? playedIndex : 0,
            };
            if (newQueue.soundobjs.length === 0) {
                localStorage.removeItem(StorageVariables.Queue);
                return null;
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