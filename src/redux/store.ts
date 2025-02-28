import { configureStore } from "@reduxjs/toolkit";
import filtersReducer from "./filterSlice";
import ticketsReducer from "./ticketsSlice";
import companiesReducer from "./companiesSlice";

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    tickets: ticketsReducer,
    companies: companiesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
