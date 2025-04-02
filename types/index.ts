import { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import { Dispatch } from "react";

export enum TokenError {
  RefreshAccessTokenError = "RefreshAccessTokenError",
}

export interface ExtendedToken extends JWT {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: number;
  user: User;
  error?: TokenError;
}

export interface ExtendedSession extends Session {
  accessToken: ExtendedToken["accessToken"];
  error: ExtendedToken["error"];
}

export interface PlaylistContextState {
  playlists: SpotifyApi.PlaylistObjectSimplified[];
  selectedPlaylistId: string | null;
  selectedPlaylist: any | null;
}

export interface IPlaylistContext {
  playlistContextState: PlaylistContextState;
  updatePlaylistContextState: (
    updateObj: Partial<PlaylistContextState>
  ) => void;
}

export interface SongContextState {
  selectedSongId: string | null;
  selectedSong: any | null;
  isPLaying: boolean;
  volume: number;
  deviceId: string | null;
}

export interface ISongContext {
  songContextState: SongContextState;
  dispatchSongAction: Dispatch<SongReducerAction>;
  // updateSongContextState: (updateObj: Partial<SongContextState>) => void;
}

export enum SongReducerActionType {
  SetDevice = "SetDevice",
  ToggleIsPlaying = "ToggleIsPlaying",
}
export type SongReducerAction =
  | {
      type: SongReducerActionType.SetDevice;
      payload: Pick<SongContextState, "deviceId" | "volume">;
    }
  | {
      type: SongReducerActionType.ToggleIsPlaying;
      payload: boolean;
    };
