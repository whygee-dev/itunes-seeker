import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FILTERS } from "../../tools/constants";
import { RootState } from "../rootReducer";
import { Filter, Track } from "../types";

type InitialState = { tracks: Track[]; searchTracks: Track[]; searchInput: string; filter: Filter };

const initialState: InitialState = { tracks: [], searchTracks: [], searchInput: "", filter: FILTERS[0] };

const tracksSlice = createSlice({
  name: "tracks",
  initialState: initialState,
  reducers: {
    setTracks(state, action: PayloadAction<Track[]>) {
      state.tracks = action.payload;
    },

    addTrack(state, action: PayloadAction<Track>) {
      const existing = state.tracks.find((t) => (t.trackId ? t.trackId === action.payload.trackId : t.collectionId === action.payload.collectionId));

      if (existing) return state;

      state.tracks.push({ ...action.payload, filter: state.filter.name });
    },

    removeTrack(state, action: PayloadAction<Track>) {
      state.tracks = state.tracks.filter((t) => (t.trackId ? t.trackId !== action.payload.trackId : t.collectionId !== action.payload.collectionId));
    },

    setSearchTracks(state, action: PayloadAction<Track[]>) {
      state.searchTracks = action.payload;
    },

    setSearchInput(state, action: PayloadAction<string>) {
      state.searchInput = action.payload;
    },

    setFilter(state, action: PayloadAction<Filter>) {
      state.filter = action.payload;
    },
  },
});

const { actions, reducer } = tracksSlice;

export const { setTracks, setSearchTracks, setSearchInput, addTrack, removeTrack, setFilter } = actions;

export const selectTracks = (state: RootState) => state.tracks.tracks;

export const selectFilteredTracks = (state: RootState) => {
  const tracks = state.tracks.tracks;

  return tracks.filter((t) => t.filter === state.tracks.filter.name);
};

export const selectSearchTracks = (state: RootState) => state.tracks.searchTracks;
export const selectSearchInput = (state: RootState) => state.tracks.searchInput;
export const selectFilter = (state: RootState) => state.tracks.filter;

export default reducer;
