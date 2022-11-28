import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
};

const modalReducer = createReducer(initialState, {
  UPDATE_MODAL_STATE: (state, action) => {
    return {
      ...state,
      isOpen: action.payload,
    };
  },
});
export default modalReducer;
