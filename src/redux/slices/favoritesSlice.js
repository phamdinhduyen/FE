import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import favoritesService from "../api/favorites.service";

export const favorites = createAsyncThunk("favorites", async (value) => {
  try {
    return await favoritesService.postFavorites(value);
  } catch (error) {
    throw new Error(JSON.stringify(error.response.data));
  }
});

export const getFavorites = createAsyncThunk("favorites/get", async (id) => {
  try {
    return await favoritesService.getFavorites(id);
  } catch (error) {
    throw new Error(JSON.stringify(error.response.data));
  }
});

export const unlikeFavorites = createAsyncThunk(
  "favorites/delete",
  async (id) => {
    try {
      return await favoritesService.unlikeFavorites(id);
    } catch (error) {
      throw new Error(JSON.stringify(error.response.data));
    }
  }
);

const initialState = {
  entities: [],
  loading: false,
  favorites: null,
};

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  // post
  extraReducers: (builder) => {
    builder.addCase(favorites.pending, (state, action) => {
      console.log("Pending favoritesSlice ...");
      state.loading = true;
    });
    builder.addCase(favorites.fulfilled, (state, action) => {
      console.log(`Fulfilled favoritesSlice`);
      state.loading = false;
      state.favorites = action.payload;
    });
    builder.addCase(favorites.rejected, (state, action) => {
      console.log(action.error);
      console.log(`Rejected favoritesSlice...`);
      state.loading = false;
    });

    // get
    builder.addCase(getFavorites.pending, (state, action) => {
      console.log("Pending favoritesSlice ...");
      state.loading = true;
    });
    builder.addCase(getFavorites.fulfilled, (state, action) => {
      console.log(`Fulfilled favoritesSlice`);
      state.loading = false;
      state.entities = action.payload;
    });
    builder.addCase(getFavorites.rejected, (state, action) => {
      console.log(action.error);
      console.log(`Rejected favoritesSlice...`);
      state.loading = false;
    });
  },
});

export default favoritesSlice.reducer;
