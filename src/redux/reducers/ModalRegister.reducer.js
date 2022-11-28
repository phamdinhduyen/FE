import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
};

const modalRegisterReducer = createReducer(initialState, {
  UPDATE_MODAL_STATE_REGISTER: (state, action) => {
    return {
      ...state,
      isOpen: action.payload,
    };
  },
});
export default modalRegisterReducer;
