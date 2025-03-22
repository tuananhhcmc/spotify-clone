"use client";


import useSpotify from "hooks/useSpotify";
import { useSession } from "next-auth/react";
import { Context, createContext, ReactNode, useContext, useEffect, useState } from "react";
import { IPlaylistContext, PlaylistContextState } from "types";

const defaultPlaylistContextState: PlaylistContextState = {
  playlists: []
}

// Tạo context với giá trị mặc định
export const PlaylistContext = createContext<IPlaylistContext>({
  playlistContextState: defaultPlaylistContextState
})

export const usePlaylistContext = () => useContext(PlaylistContext)

const PlaylistContextProvider = ({children}: {children: ReactNode}) => {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();

  const [playlistContextState, setPlaylistContext] = useState(
    defaultPlaylistContextState
  )

  useEffect(() => {
    const getUserPlaylists = async () => {
      try {
        if (spotifyApi.getAccessToken()) {
          const userPlaylistResponse = await spotifyApi.getUserPlaylists();
          console.log('User Playlist res', userPlaylistResponse);
          setPlaylistContext({
            playlists: userPlaylistResponse.body.items
          })
        }
      } catch (error) {
        console.error('Lỗi khi lấy danh sách playlist:', error);
      }
    
    if(spotifyApi.getAccessToken())
      getUserPlaylists();
    }
  }, [session,spotifyApi])

  const playlistContextProviderData = {
    playlistContextState
  }

  return (
    <PlaylistContext.Provider value={playlistContextProviderData}>
      {children}
    </PlaylistContext.Provider>
  )
}

export default PlaylistContextProvider;
