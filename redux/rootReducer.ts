import { combineReducers } from "@reduxjs/toolkit";
import { default as tracksReducer } from "./slices/tracksSlice";
import { default as extrasReducer } from "./slices/extrasSlice";

export const rootReducer = combineReducers({
  tracks: tracksReducer,
  extras: extrasReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
