import { combineReducers } from "@reduxjs/toolkit";
import { default as tracksReducer } from "./slices/tracksSlice";
import { default as extrasReducer } from "./slices/extrasSlice";
import { default as filtersReducer } from "./slices/filtersSlice";

export const rootReducer = combineReducers({
  tracks: tracksReducer,
  extras: extrasReducer,
  filters: filtersReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
