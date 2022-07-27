import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState, useTransition } from "react";
import { useActions } from "../../../../../Hooks/useActions";
import { useTypedSelector } from "../../../../../Hooks/useTypedSelector";
import { IPagableMyPlaylistItem, IPlaylist } from "../../../../../Redux/Reducers/MyPlaylistReducer/types";
import { IAddTrackToPlaylistRequest } from "../../../../../Redux/Reducers/PlayingReducer/types";
import { FoundPlaylistCard } from "../../../Cards/FoundPlaylistCard";
import { SearchField } from "../../../Inputs/SearchField";
import { IAddTrackToPlaylistModal } from "./types";

const icon_search = require('../../../../../Assets/Icons/Search.png');

export const AddTrackToPlaylistModal: React.FC<IAddTrackToPlaylistModal> = ({ ...props }) => {

    const [isPending, startTransition] = useTransition();
    const [searchQuery, setSearchQuery] = useState<string>("");

    const { searchMyPlaylists, addTrackToPlaylist } = useActions();

    useEffect(() => {
        const fetch = async () => {
            await searchMyPlaylists("*");
        }
        fetch();
    }, []);

    useEffect(() => {
        const work = async (query: string) => {
            await searchMyPlaylists(query);
        }
        if (searchQuery && searchQuery.length > 0) {
            startTransition(() => {
                work(searchQuery);
            })
        }
    }, [searchQuery])

    const foundedPlaylist = useTypedSelector(state => state.myPlaylistReducer.searchPlaylists);

    const onAddHandle = async (playlist: IPagableMyPlaylistItem | null) => {
        if (playlist && props.trackId) {
            await AddTrackToPlaylist(playlist, props.trackId);
        }
    }

    const AddTrackToPlaylist = async (item: IPagableMyPlaylistItem, trackId: string) => {
        if (item && item.playlistDto && item.playlistCreator) {
            const rq : IAddTrackToPlaylistRequest = {
                playlistFind: {
                    findPlaylistName: item.playlistDto?.name,
                    findPlaylistCreatorEmail: item.playlistCreator?.email
                },
                trackId: trackId,
            }
            await addTrackToPlaylist(rq, true);
        }
    }

    const onCloseHandle = () => {
        props.onClose();
    }

    return (
        <div className="rounded-md py-6 flex flex-col items-center gap-3 text-dark-200 bg-light-100 shadow-xl px-8 border border-light-200">
            <div className="flex justify-between w-full">
                <h1 className="text-xl font-['Lexend'] whitespace-nowrap">Add track to playlist</h1>
                <div className="w-full flex justify-end"><FontAwesomeIcon className="text-dark-200 font-medium text-2xl cursor-pointer hover:text-red-500 rounded-sm px-1" icon={faClose} onClick={onCloseHandle} /></div>
            </div>
            <hr className="w-full" />
            <div className="flex flex-col gap-4">
                <SearchField placeholder={"Search playlist"} value={searchQuery} onChange={(e: any) => {
                    setSearchQuery(e.target.value)
                }} icon={<img alt="icon" className="invert w-[28px]" src={icon_search} />} />

                <div className="flex flex-col gap-2">
                    {
                        foundedPlaylist ?
                            foundedPlaylist.map(item => {
                                return (
                                    <FoundPlaylistCard key={item.playlistDto?.returnId} onClick={() => { onAddHandle(item) }}
                                        image={item.playlistDto?.image} name={item.playlistDto?.name} />
                                )
                            })
                            :
                            <div className="flex flex-col items-center gap-3">
                                <p className="text-center text-lg">No Result</p>
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}