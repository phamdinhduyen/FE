import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import carouselService from "../api/carousel.service";

export const getCarousel = createAsyncThunk("carousel", async () => {
  try {
    return await carouselService.getCarousel();
  } catch (error) {
    throw new Error(JSON.stringify(error.response.data));
  }
});

const initialState = {
  entities: [],
  loading: false,
  carousel: null,
};

export const CarouselSlice = createSlice({
  name: "carousel",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(getCarousel.pending, (state, action) => {
      console.log("Pending CarouselSlice ...");
      state.loading = true;
    });
    builder.addCase(getCarousel.fulfilled, (state, action) => {
      console.log(`Fulfilled CarouselSlice`);
      state.loading = false;
      state.entities = action.payload;
    });
    builder.addCase(getCarousel.rejected, (state, action) => {
      console.log(action.error);
      console.log(`Rejected CarouselSlice...`);
      state.loading = false;
    });
  },
});

export default CarouselSlice.reducer;
