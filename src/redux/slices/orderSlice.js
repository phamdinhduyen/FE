import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import orderService from "../api/order.service";

export const orders = createAsyncThunk("orders", async (order) => {
  try {
    return await orderService.order(order);
  } catch (error) {
    throw new Error(JSON.stringify(error.response.data));
  }
});

export const TrackMyOrder = createAsyncThunk(
  "orders/trackmyorder",
  async (data) => {
    try {
      return await orderService.trackMyOrder(data);
    } catch (error) {
      throw new Error(JSON.stringify(error.response.data));
    }
  }
);

export const orderDetail = createAsyncThunk(
  "orders/orderDetail",
  async (id) => {
    try {
      return await orderService.orderDetail(id);
    } catch (error) {
      throw new Error(JSON.stringify(error.response.data));
    }
  }
);

const initialState = {
  entities: [],
  loading: false,
  orders: null,
  messageErrorOrder: null,
};

export const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setNullMessageError: (state, action) => {
      console.log(action.payload);

      state.messageErrorOrder = null;
      return state;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(orders.pending, (state, action) => {
      console.log("Pending order ...");
      state.loading = true;
    });
    builder.addCase(orders.fulfilled, (state, action) => {
      console.log(`Fulfilled order`);
      state.loading = false;
      state.order = action.payload;
    });
    builder.addCase(orders.rejected, (state, action) => {
      console.log(action.error);
      console.log(`Rejected order...`);
      state.loading = false;
      state.messageErrorOrder =
        "Mua hàng thất bại. Vui lòng mua ít nhất 1 sản phẩm!";
    });
    // trackMyOrder
    builder.addCase(TrackMyOrder.pending, (state, action) => {
      console.log("Pending TrackMyorder ...");
      state.loading = true;
    });
    builder.addCase(TrackMyOrder.fulfilled, (state, action) => {
      console.log(`Fulfilled TrackMyorder`);
      state.loading = false;
      state.entities = action.payload;
    });
    builder.addCase(TrackMyOrder.rejected, (state, action) => {
      console.log(action.error);
      console.log(`Rejected orderDetail...`);
      state.loading = false;
    });
    // order  Detail
    builder.addCase(orderDetail.pending, (state, action) => {
      console.log("Pending orderDetail ...");
      state.loading = true;
    });
    builder.addCase(orderDetail.fulfilled, (state, action) => {
      console.log(`Fulfilled orderDetail`);
      state.loading = false;
      state.entities = action.payload;
    });
    builder.addCase(orderDetail.rejected, (state, action) => {
      console.log(action.error);
      console.log(`Rejected orderDetail...`);
      state.loading = false;
    });
  },
});

export const { setNullMessageError } = orderSlice.actions;

export default orderSlice.reducer;
