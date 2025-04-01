import { usePlaylistContext } from "contexts/PlaylistContexts";
import Song from "./Song";

const Songs = () => {
  const {
    playlistContextState: { selectedPlaylist },
  } = usePlaylistContext();

  if (!selectedPlaylist) return null;

  return (
    <div className="flex flex-col space-y-1 px-8 pb-28">
      {selectedPlaylist.tracks.items.map(
        (item: SpotifyApi.PlaylistTrackObject, index: number) => (
          <Song key={item.track?.id} item={item} itemIndex={index} />
        )
      )}
    </div>
  );
};

export default Songs;
