import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "../api/user.service";

export const register = createAsyncThunk("user/register", async (user) => {
  try {
    return await userService.register(user);
  } catch (error) {
    throw new Error(JSON.stringify(error.response.data));
  }
});

export const login = createAsyncThunk("user/login", async (user) => {
  try {
    return await userService.login(user);
  } catch (error) {
    throw new Error(JSON.stringify(error.response.data));
  }
});

const initialState = {
  entities: [],
  loading: false,
  user: null,
  messageErrorRegister: null,
  messageErrorLogin: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setNullMessageError: (state, action) => {
      console.log(action.payload);
      state.messageErrorRegister = null;
      state.messageErrorLogin = null;
      return state;
    },
  },
  // register
  extraReducers: (builder) => {
    // Fetch user
    builder.addCase(register.pending, (state, action) => {
      console.log("Pending register ...");
      state.loading = true;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      console.log(`Fulfilled register`);
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(register.rejected, (state, action) => {
      console.log(action.error);
      console.log(`Rejected register...`);
      state.loading = false;
      state.messageErrorRegister =
        "Email đã được đăng ký. Vui lòng kiểm tra lại!";
    });

    // Fetch user
    builder.addCase(login.pending, (state, action) => {
      console.log("Pending login ...");
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      console.log(`Fulfilled login`);
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(login.rejected, (state, action) => {
      console.log(action.error);
      console.log(`Rejected login...`);
      state.loading = false;
      state.messageErrorLogin =
        "Email hoặc mật khẩu không đúng. Vui lòng kiểm tra lại!";
    });
  },
});

export const { setNullMessageError } = userSlice.actions;

export default userSlice.reducer;
