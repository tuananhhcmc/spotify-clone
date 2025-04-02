import {
  BuildingLibraryIcon,
  HeartIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  PlusCircleIcon,
  RssIcon,
} from "@heroicons/react/24/outline";
import { PauseIcon, PlayIcon } from "@heroicons/react/24/outline";
import { useSongContext } from "contexts/SongContext";
import useSpotify from "hooks/useSpotify";

import { useState } from "react";
import { SongReducerActionType } from "types";

const isPLaying = false;

const Player = () => {
  const spotifyApi = useSpotify();

  const { dispatchSongAction } = useSongContext();

  const [isPlaying, setIsPlaying] = useState(false);
  const handlePLayPause = async () => {
    const response = await spotifyApi.getMyCurrentPlaybackState();

    if (!response.body) return;

    if (response.body.is_playing) {
      await spotifyApi.pause();
      dispatchSongAction({
        type: SongReducerActionType.ToggleIsPlaying,
        payload: false,
      });
    } else {
      await spotifyApi.play();
      dispatchSongAction({
        type: SongReducerActionType.ToggleIsPlaying,
        payload: true,
      });
    }
  };

  return (
    <div className="h-24 bg-gradient-to-b from-black to-gray-900 grid grid-cols-3 text-xs md:text-base px-2 md:px-8">
      {/* LEFT */}
      <div className="flex items-center space-x-4">SELECTED SONG</div>

      {/* CENTER */}
      <div className="flex justify-evenly items-center">
        <HomeIcon className="icon-playback" />
        <MagnifyingGlassIcon className="icon-playback" />
        {isPlaying ? (
          <PauseIcon className="icon-playback" onClick={handlePLayPause} />
        ) : (
          <PlayIcon className="icon-playback" onClick={handlePLayPause} />
        )}
        <PlusCircleIcon className="icon-playback" />
        <RssIcon className="icon-playback" />
      </div>

      {/* RIGHT */}
      <div className="flex justify-end items-center pr-5 space-x-3 md:space-x-4">
        <HeartIcon className="icon-playback" />
        <input type="range" min={0} max={100} className="w-20 md:w-auto" />
      </div>
    </div>
  );
};

export default Player;
