import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import categoriesService from "../api/category.service";

export const getCategories = createAsyncThunk("categories", async () => {
  try {
    return await categoriesService.categories();
  } catch (error) {
    throw new Error(JSON.stringify(error.response.data));
  }
});

const initialState = {
  entities: [],
  loading: false,
  categories: null,
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setNullMessageError: (state, action) => {
      console.log(action.payload);

      return state;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state, action) => {
      console.log("Pending getCategories...");
      state.loading = true;
    });
    builder.addCase(getCategories.fulfilled, (state, action) => {
      console.log(`Fulfilled getCategories`);
      state.loading = false;
      state.entities = action.payload;
    });
    builder.addCase(getCategories.rejected, (state, action) => {
      console.log(action.error);
      console.log(`Rejected getCategories...`);
      state.loading = false;
    });
  },
});

export const { setNullMessageError } = categoriesSlice.actions;

export default categoriesSlice.reducer;
