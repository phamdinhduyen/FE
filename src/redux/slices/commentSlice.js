import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import commentService from "../api/comment.sevice";

export const postComment = createAsyncThunk("comment", async (value) => {
  try {
    return await commentService.postComment(value);
  } catch (error) {
    throw new Error(JSON.stringify(error.response.data));
  }
});

export const getComment = createAsyncThunk("comment/get", async (value) => {
  try {
    return await commentService.getComment(value);
  } catch (error) {
    throw new Error(JSON.stringify(error.response.data));
  }
});

export const deleteComment = createAsyncThunk(
  "comment/deleteComment",
  async (value) => {
    try {
      return await commentService.deleteComment(value);
    } catch (error) {
      throw new Error(JSON.stringify(error.response.data));
    }
  }
);

export const updateComment = createAsyncThunk(
  "comment/updateComment",
  async (value) => {
    try {
      return await commentService.updateComment(value);
    } catch (error) {
      throw new Error(JSON.stringify(error.response.data));
    }
  }
);
const initialState = {
  entities: [],
  loading: false,
  comment: null,
};

export const commentSlice = createSlice({
  name: "comments",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(postComment.pending, (state, action) => {
      console.log("Pending comment...");
      state.loading = true;
    });
    builder.addCase(postComment.fulfilled, (state, action) => {
      console.log(`Fulfilled comment`);
      state.loading = false;
      state.comment = action.payload;
    });
    builder.addCase(postComment.rejected, (state, action) => {
      console.log(action.error);
      console.log(`Rejected comment...`);
      state.loading = false;
    });
    // get comment
    builder.addCase(getComment.pending, (state, action) => {
      console.log("Pending getComment...");
      state.loading = true;
    });
    builder.addCase(getComment.fulfilled, (state, action) => {
      console.log(`Fulfilled comment`);
      state.loading = false;
      state.entities = action.payload;
    });
    builder.addCase(getComment.rejected, (state, action) => {
      console.log(action.error);
      console.log(`Rejected getComment...`);
      state.loading = false;
    });
    //update
    builder.addCase(updateComment.pending, (state, action) => {
      console.log("Pending updateComment...");
      state.loading = true;
    });
    builder.addCase(updateComment.fulfilled, (state, action) => {
      console.log(`Fulfilled comment`);
      state.loading = false;
      state.comment = action.payload;
    });
    builder.addCase(updateComment.rejected, (state, action) => {
      console.log(action.error);
      console.log(`Rejected updateComment...`);
      state.loading = false;
    });
  },
});

export default commentSlice.reducer;
