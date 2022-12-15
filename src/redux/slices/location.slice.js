import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import location from "../api/location.service";

export const getCityLocation = createAsyncThunk(
  "location/getCityLocationService",
  async () => {
    try {
      return await location.getCityLocation();
    } catch (error) {
      throw new Error(JSON.stringify(error.response.data));
    }
  }
);

export const getDistrictsLocation = createAsyncThunk(
  "location/getDistrictsLocationService",
  async (value) => {
    try {
      return await location.getDistrictsLocation(value);
    } catch (error) {
      throw new Error(JSON.stringify(error.response.data));
    }
  }
);

export const getWardsLocation = createAsyncThunk(
  "location/getWardsLocationService",
  async (value) => {
    try {
      return await location.getWardsLocation(value);
    } catch (error) {
      throw new Error(JSON.stringify(error.response.data));
    }
  }
);

export const searchCityLocation = createAsyncThunk(
  "location/searchCityLocation",
  async (cityCode) => {
    try {
      return await location.searchCityLocation(cityCode);
    } catch (error) {
      throw new Error(JSON.stringify(error.response.data));
    }
  }
);

export const searchDistrictsLocation = createAsyncThunk(
  "location/searchdistrictsLocation",
  async (DistrictCode) => {
    try {
      return await location.searchDistrictsLocation(DistrictCode);
    } catch (error) {
      throw new Error(JSON.stringify(error.response.data));
    }
  }
);

export const searchWardLocation = createAsyncThunk(
  "location/searchWardLocation",
  async (WardCode) => {
    try {
      return await location.searchWardsLocation(WardCode);
    } catch (error) {
      throw new Error(JSON.stringify(error.response.data));
    }
  }
);
const initialState = {
  entities: [],
  loading: false,
  cities: [],
  districts: [],
  wards: [],
};

export const locationSlice = createSlice({
  name: "location",
  initialState,
  // post
  extraReducers: (builder) => {
    builder.addCase(getCityLocation.pending, (state, action) => {
      console.log("Pending locationSlice ...");
      state.loading = true;
    });
    builder.addCase(getCityLocation.fulfilled, (state, action) => {
      console.log(`Fulfilled locationSlice`);
      state.loading = false;
      state.cities = action.payload;
    });
    builder.addCase(getCityLocation.rejected, (state, action) => {
      console.log(action.error);
      console.log(`Rejected locationSlice...`);
      state.loading = false;
    });
    ///
    builder.addCase(getDistrictsLocation.pending, (state, action) => {
      console.log("Pending locationSlice ...");
      state.loading = true;
    });
    builder.addCase(getDistrictsLocation.fulfilled, (state, action) => {
      console.log(`Fulfilled locationSlice`);
      state.loading = false;
      state.districts = action.payload;
    });
    builder.addCase(getDistrictsLocation.rejected, (state, action) => {
      console.log(action.error);
      console.log(`Rejected locationSlice...`);
      state.loading = false;
    });
    ///
    builder.addCase(getWardsLocation.pending, (state, action) => {
      console.log("Pending locationSlice ...");
      state.loading = true;
    });
    builder.addCase(getWardsLocation.fulfilled, (state, action) => {
      console.log(`Fulfilled locationSlice`);
      state.loading = false;
      state.wards = action.payload;
    });
    builder.addCase(getWardsLocation.rejected, (state, action) => {
      console.log(action.error);
      console.log(`Rejected locationSlice...`);
      state.loading = false;
    });
    //
    builder.addCase(searchCityLocation.pending, (state, action) => {
      console.log("Pending locationSlice ...");
      state.loading = true;
    });
    builder.addCase(searchCityLocation.fulfilled, (state, action) => {
      console.log(`Fulfilled locationSlice`);
      state.loading = false;
      state.cities = action.payload;
    });
    builder.addCase(searchCityLocation.rejected, (state, action) => {
      console.log(action.error);
      console.log(`Rejected locationSlice...`);
      state.loading = false;
    });
    //
    builder.addCase(searchDistrictsLocation.pending, (state, action) => {
      console.log("Pending locationSlice ...");
      state.loading = true;
    });
    builder.addCase(searchDistrictsLocation.fulfilled, (state, action) => {
      console.log(`Fulfilled locationSlice`);
      state.loading = false;
      state.districts = action.payload;
    });
    builder.addCase(searchDistrictsLocation.rejected, (state, action) => {
      console.log(action.error);
      console.log(`Rejected locationSlice...`);
      state.loading = false;
    });
    //
    builder.addCase(searchWardLocation.pending, (state, action) => {
      console.log("Pending locationSlice ...");
      state.loading = true;
    });
    builder.addCase(searchWardLocation.fulfilled, (state, action) => {
      console.log(`Fulfilled locationSlice`);
      state.loading = false;
      state.wards = action.payload;
    });
    builder.addCase(searchWardLocation.rejected, (state, action) => {
      console.log(action.error);
      console.log(`Rejected locationSlice...`);
      state.loading = false;
    });
    //
  },
});

export default locationSlice.reducer;
