"use client";

import useSpotify from "hooks/useSpotify";
import { useSession } from "next-auth/react";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { IPlaylistContext, PlaylistContextState } from "types";

const defaultPlaylistContextState: PlaylistContextState = {
  playlists: [],
  selectedPlaylistId: null,
  selectedPlaylist: null,
};

// Tạo context với giá trị mặc định
export const PlaylistContext = createContext<IPlaylistContext>({
  playlistContextState: defaultPlaylistContextState,
  updatePlaylistContextState: (updateObj: Partial<PlaylistContextState>) => {}, // Hàm placeholder
});

export const usePlaylistContext = () => useContext(PlaylistContext);

const PlaylistContextProvider = ({ children }: { children: ReactNode }) => {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();

  const [playlistContextState, setPlaylistContext] = useState(
    defaultPlaylistContextState
  );

  const updatePlaylistContextState = (
    updateObj: Partial<PlaylistContextState>
  ) => {
    setPlaylistContext((prevState) => ({
      ...prevState,
      ...updateObj,
    }));
  };

  useEffect(() => {
    const getUserPlaylists = async () => {
      try {
        if (spotifyApi.getAccessToken()) {
          const userPlaylistResponse = await spotifyApi.getUserPlaylists();
          console.log("User Playlist Response:", userPlaylistResponse);

          if (userPlaylistResponse.body && userPlaylistResponse.body.items) {
            updatePlaylistContextState({
              playlists: userPlaylistResponse.body.items,
            });
          } else {
            console.warn("No playlists found in the response");
            updatePlaylistContextState({ playlists: [] });
          }
        } else {
          console.log("Access Token not available");
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách playlist:", error);
      }
    };

    if (session?.accessToken) {
      getUserPlaylists();
    }
  }, [session, spotifyApi]);

  useEffect(() => {
    console.log("Access Token:", spotifyApi.getAccessToken());
  }, [spotifyApi]);

  const playlistContextProviderData = {
    playlistContextState,
    updatePlaylistContextState,
  };

  return (
    <PlaylistContext.Provider value={playlistContextProviderData}>
      {children}
    </PlaylistContext.Provider>
  );
};

export default PlaylistContextProvider;
