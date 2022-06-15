import React from "react";
import { useTypedSelector } from "../../../../Hooks/useTypedSelector";

export const PlayingFooter : React.FC = () => {
    
    const rx = useTypedSelector(state => state.selectedAlbumReducer.queue);

    return (
        <>
            {
                rx ? 
                <div className="w-full bg-gradient-to-b from-dark-200/20 to-dark-200 text-white z-20 h-28">
                    <h1>jdfhdjgfhdgj</h1>
                </div>
                : null
            }
        </>
    )
}