import {
  SongContextState,
  SongReducerAction,
  SongReducerActionType,
} from "types";

export const songReducer = (
  state: SongContextState,
  { type, payload }: SongReducerAction
): SongContextState => {
  switch (type) {
    case SongReducerActionType.SetDevice:
      return {
        ...state,
        deviceId: payload.deviceId,
        volume: payload.volume,
      };

    case SongReducerActionType.ToggleIsPlaying:
      return {
        ...state,
        isPLaying: payload,
      };

    default:
      return state;
  }
};
