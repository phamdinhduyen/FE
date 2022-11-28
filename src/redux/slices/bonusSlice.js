import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import bonusService from "../api/bonus.service";

export const getBonus = createAsyncThunk("bonus/get-list", async (value) => {
  try {
    return await bonusService.getBonus(value);
  } catch (error) {
    throw new Error(JSON.stringify(error.response.data));
  }
});

const initialState = {
  entities: [],
  loading: false,
  messageErrorBonus: null,
  coupon: null,
};

export const bonusSlice = createSlice({
  name: "bonus",
  initialState,
  reducers: {
    setNullMessageCouponError: (state, action) => {
      console.log(action.payload);
      state.messageErrorBonus = null;
      return state;
    },
  },
  extraReducers: (builder) => {
    // Fetch list
    builder.addCase(getBonus.pending, (state, action) => {
      console.log("Pending getBonus ...");
      state.loading = true;
    });
    builder.addCase(getBonus.fulfilled, (state, action) => {
      console.log(`Fulfilled getBonus`);
      state.loading = false;
      state.coupon = action.payload;
      if (action.payload.data.length === 0) {
        state.messageErrorBonus = "Coupon not found";
      }
      console.log(action.payload);
    });
    builder.addCase(getBonus.rejected, (state, action) => {
      console.log(action.error);
      console.log(`Rejected getBonus...`);
      state.loading = false;
    });
  },
});

export const { setNullMessageCouponError } = bonusSlice.actions;

export default bonusSlice.reducer;
