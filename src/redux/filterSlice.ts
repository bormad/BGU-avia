import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { sorts, companies, transfersData } from "../data/dummy";
import { checkboxesData } from "../data/types";

export interface Filters {
  sortType: string;
  company: string;
  transfers: {
    [prop: string]: {
      value: boolean;
      label: string;
      num: number;
    };
  };
  origin: string;
  destination: string;
  dateStart: number | null;
  dateEnd: number | null;
}

const initialState: Filters = {
  sortType: Object.keys(sorts)[0],
  company: Object.keys(companies)[0],
  transfers: transfersData,
  destination: "",
  origin: "",
  dateStart: null,
  dateEnd: null,
};

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSortType: (state, action: PayloadAction<string>) => {
      state.sortType = action.payload;
    },
    setCompany: (state, action: PayloadAction<string>) => {
      state.company = action.payload;
    },
    setTransfers: (state, action: PayloadAction<checkboxesData>) => {
      state.transfers = {
        ...state.transfers,
        ...action.payload,
      };
    },
    setDestination: (state, action: PayloadAction<string>) => {
      state.destination = action.payload;
    },
    setOrigin: (state, action: PayloadAction<string>) => {
      state.origin = action.payload;
    },
    setDateStart: (state, action: PayloadAction<number | null>) => {
      if (state.dateEnd && action.payload && state.dateEnd < action.payload) {
        state.dateStart = state.dateEnd;
        state.dateEnd = action.payload;
      } else {
        state.dateStart = action.payload;
      }
    },
    setDateEnd: (state, action: PayloadAction<number | null>) => {
      if (
        state.dateStart &&
        action.payload &&
        action.payload < state.dateStart
      ) {
        state.dateEnd = state.dateStart;
        state.dateStart = action.payload;
      } else {
        state.dateEnd = action.payload;
      }
    },
    switchPlaces: (state) => {
      const origin = state.origin;
      const destination = state.destination;

      state.origin = destination;
      state.destination = origin;
    },
  },
});

export const {
  setSortType,
  setCompany,
  setTransfers,
  setDestination,
  setOrigin,
  setDateStart,
  setDateEnd,
  switchPlaces,
} = filtersSlice.actions;

export default filtersSlice.reducer;
