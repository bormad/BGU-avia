import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { Company } from "../data/types";
import { companiesLogo } from "../data/dummy";
import ticketsAPI from "../API";

const initialState: {
  entities: Company[];
  loading: "idle" | "pending" | "fulfilled" | "rejected";
  error: string | undefined;
} = {
  entities: [],
  loading: "idle",
  error: "",
};

const fetchCompanies = createAsyncThunk(
  "companies/fetchCompaniesStatus",
  async () => {
    const companies = await ticketsAPI.getCompanies();
    return companies;
  }
);

export const companiesSlice = createSlice({
  name: "companies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCompanies.pending, (state) => {
      state.loading = "pending";
      state.error = "";
    });
    builder.addCase(
      fetchCompanies.fulfilled,
      (state, action: PayloadAction<Company[]>) => {
        const companies = action.payload.map((company) => ({
          ...company,
          logo: companiesLogo[company.id],
        }));
        state.entities = companies;
        state.loading = "fulfilled";
        state.error = "";
      }
    );
    builder.addCase(fetchCompanies.rejected, (state, action) => {
      state.loading = "rejected";
      state.error = action.error.message;
      state.entities = [];
    });
  },
});

export { fetchCompanies };
export default companiesSlice.reducer;
