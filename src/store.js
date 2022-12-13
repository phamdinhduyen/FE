import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import cartReducer from "./redux/reducers/Cart.reducer";
import modalReducer from "./redux/reducers/Modal.reduce";
import modalRegisterReducer from "./redux/reducers/ModalRegister.reducer";
import productReducer from "./redux/slices/productSlice";
import userReducer from "./redux/slices/userSlice";
import orderReducer from "./redux/slices/orderSlice";
import bonus from "./redux/slices/bonusSlice";
import carouselSlice from "./redux/slices/carouselSlice";
import categoriesSlice from "./redux/slices/categoriesSlice";
import optPriceSlice from "./redux/slices/optPriceSlice";
import favoriteSlice from "./redux/slices/favoritesSlice";
import commentSlice from "./redux/slices/commentSlice";
import locationSlice from "./redux/slices/location.slice";
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    modal: modalReducer,
    cart: cartReducer,
    modalRegister: modalRegisterReducer,

    product: productReducer,
    user: userReducer,
    order: orderReducer,
    bonus: bonus,
    carousel: carouselSlice,
    categories: categoriesSlice,
    otpPrice: optPriceSlice,
    favorite: favoriteSlice,
    comment: commentSlice,
    location: locationSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: true,
      },
      serializableCheck: false,
    }),
});

export { store };
