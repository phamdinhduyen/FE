import Home from "./Home";

import React, { useState } from "react";
import ProductDetail1 from "./components/ProductDetail/MainProductDetail";
import CartDetail from "./components/Cart/CartDetail";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Payment from "./components/Payment/Payment";
import InforOrder from "./components/Admin/InforOrder";
import { ROUTES } from "./constants/routers";
import { useEffect } from "react";
import TrackMyOrder from "./components/TrackMyOrder/TrackMyOrder";
import { useDispatch } from "react-redux";
import OrderDetail from "./components/TrackMyOrder/OrderDetail";

import { getProducts } from "./redux/slices/productSlice";

function App() {
  const dispatch = useDispatch();
  const url = new URL(document.URL);
  const pageSize = url.searchParams.get("page");
  console.log(pageSize);
  useEffect(() => {
    dispatch(getProducts(pageSize ? pageSize : 1));
  }, [pageSize]);

  return (
    <Routes>
      <Route path="/" element={<Navigate to={ROUTES.HOME} />} />
      <Route path={ROUTES.HOME} exact element={<Home />} />
      <Route path={ROUTES.PRODUCT_DETAIL} exact element={<ProductDetail1 />} />
      <Route path={ROUTES.USER.CART_DETAIL} exact element={<CartDetail />} />
      <Route path={ROUTES.USER.PAYMENT} exact element={<Payment />} />
      <Route path={ROUTES.INFOR_ORDER} exact element={<InforOrder />} />
      <Route path={ROUTES.TRACK_MY_ORDER} exact element={<TrackMyOrder />} />
      <Route path={ROUTES.ORDER_DETAIL} exact element={<OrderDetail />} />
    </Routes>
  );
}

export default App;
