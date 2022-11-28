import { createReducer } from "@reduxjs/toolkit";
const data = localStorage.getItem("quantity");

const initialState = {
  quantity: data ? JSON.parse(data) : 0,
};

const cartReducer = createReducer(initialState, {
  UPDATE_QUANTITY: (state, action) => {
    const { values } = action.payload;

    localStorage.setItem("quantity", JSON.stringify(values));
    return {
      ...state,
      quantity: values,
    };
  },
});
export default cartReducer;
