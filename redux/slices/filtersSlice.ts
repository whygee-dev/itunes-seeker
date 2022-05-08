import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FILTERS } from "../../tools/constants";
import { RootState } from "../rootReducer";
import { Filter } from "../types";

type InitialState = { filter: Filter };

const initialState: InitialState = { filter: FILTERS[0] };

const filtersSlice = createSlice({
  name: "extras",
  initialState: initialState,
  reducers: {
    setFilter(state, action: PayloadAction<Filter>) {
      state.filter = action.payload;
    },
  },
});

const { actions, reducer } = filtersSlice;

export const { setFilter } = actions;

export const selectFilter = (state: RootState) => state.filters.filter;

export default reducer;
