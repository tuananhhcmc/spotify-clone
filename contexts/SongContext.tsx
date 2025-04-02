import useSpotify from "hooks/useSpotify";
import { useSession } from "next-auth/react";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";
import {
  ISongContext,
  PlaylistContextState,
  SongContextState,
  SongReducerActionType,
} from "types";
import { songReducer } from "reducers/songReducer";

const defaultSongContextState: SongContextState = {
  selectedSongId: null,
  selectedSong: null,
  isPlaying: false,
  volume: 50,
  deviceId: null,
};

export const SongContext = createContext<ISongContext>({
  songContextState: defaultSongContextState,
  dispatchSongAction: () => {},
});

export const useSongContext = () => useContext(SongContext);

const SongContextProvider = ({ children }: { children: ReactNode }) => {
  const spotifyApi = useSpotify();

  const { data: session } = useSession();

  const [songContextState, dispatchSongAction] = useReducer(
    songReducer,
    defaultSongContextState
  );

  useEffect(() => {
    const setCurrentDevice = async () => {
      const availableDeviceResponse = await spotifyApi.getMyDevices();

      if (!availableDeviceResponse.body.devices.length) return;

      const { id: deviceId, volume_percnet } =
        availableDeviceResponse.body.devices[0];

      dispatchSongAction({
        type: SongReducerActionType.SetDevice,
        payload: {
          deviceId,
          volume: volume_percnet as number,
        },
      });

      await spotifyApi.transferMyPlayBack(deviceId as string);
    };
    if (spotifyApi.getAccessToken()) {
      setCurrentDevice();
    }
  }, [spotifyApi, session]);

  const songContextStateProviderData = {
    songContextState: defaultSongContextState, // Changed from SongContextState to songContextState
    dispatchSongAction,
  };

  return (
    <SongContext.Provider value={songContextStateProviderData}>
      {children}
    </SongContext.Provider>
  );
};

export default SongContextProvider;
