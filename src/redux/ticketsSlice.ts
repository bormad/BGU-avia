import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { TicketProps } from "../data/types";
import ticketsAPI from "../API";

const initialState: {
  entities: TicketProps[];
  loading: "idle" | "fulfilled" | "rejected" | "pending";
  error: string | undefined;
} = {
  entities: [],
  loading: "idle",
  error: "",
};

const fetchTickets = createAsyncThunk(
  "tickets/fetchTicketsStatus",
  async () => {
    const tickets = await ticketsAPI.getTickets();
    return tickets;
  }
);

export const ticketsSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTickets.pending, (state) => {
      state.loading = "pending";
      state.error = "";
    });
    builder.addCase(
      fetchTickets.fulfilled,
      (state, action: PayloadAction<TicketProps[]>) => {
        state.entities = action.payload;
        state.loading = "fulfilled";
        state.error = "";
      }
    );
    builder.addCase(fetchTickets.rejected, (state, action) => {
      state.loading = "rejected";
      state.error = action.error.message;
    });
  },
});

export { fetchTickets };
export default ticketsSlice.reducer;
