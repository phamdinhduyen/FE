import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import priceService from "../api/price.service";

export const getOtpPrice = createAsyncThunk("price", async () => {
  try {
    return await priceService.optPrice();
  } catch (error) {
    throw new Error(JSON.stringify(error.response.data));
  }
});

const initialState = {
  entities: [],
  loading: false,
  optPrice: null,
};

export const optPriceSlice = createSlice({
  name: "optPrice",
  initialState,
  reducers: {
    setNullMessageError: (state, action) => {
      console.log(action.payload);

      return state;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getOtpPrice.pending, (state, action) => {
      console.log("Pending getgetOtpPrice...");
      state.loading = true;
    });
    builder.addCase(getOtpPrice.fulfilled, (state, action) => {
      console.log(`Fulfilled getgetOtpPrice`);
      state.loading = false;
      state.entities = action.payload;
    });
    builder.addCase(getOtpPrice.rejected, (state, action) => {
      console.log(action.error);
      console.log(`Rejected getgetOtpPrice...`);
      state.loading = false;
    });
  },
});

export const { setNullMessageError } = optPriceSlice.actions;

export default optPriceSlice.reducer;
