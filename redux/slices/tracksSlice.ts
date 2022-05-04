import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../rootReducer";
import { Track } from "../types";

type InitialState = { tracks: Track[]; searchTracks: Track[]; searchInput: string };

const initialState: InitialState = { tracks: [], searchTracks: [], searchInput: "" };

const tracksSlice = createSlice({
  name: "tracks",
  initialState: initialState,
  reducers: {
    setTracks(state, action: PayloadAction<Track[]>) {
      return { ...state, tracks: action.payload };
    },

    addTrack(state, action: PayloadAction<Track>) {
      const existing = state.tracks.find((t) => t.trackId === action.payload.trackId);

      if (existing) return state;

      const newTracks = [...state.tracks, action.payload];

      return { ...state, tracks: newTracks };
    },

    removeTrack(state, action: PayloadAction<Track>) {
      return { ...state, tracks: state.tracks.filter((t) => t.trackId !== action.payload.trackId) };
    },

    setSearchTracks(state, action: PayloadAction<Track[]>) {
      return { ...state, searchTracks: action.payload };
    },

    setSearchInput(state, action: PayloadAction<string>) {
      return { ...state, searchInput: action.payload };
    },
  },
});

const { actions, reducer } = tracksSlice;

export const { setTracks, setSearchTracks, setSearchInput, addTrack, removeTrack } = actions;

export const selectTracks = (state: RootState) => state.tracks.tracks;
export const selectSearchTracks = (state: RootState) => state.tracks.searchTracks;
export const selectSearchInput = (state: RootState) => state.tracks.searchInput;

export default reducer;
