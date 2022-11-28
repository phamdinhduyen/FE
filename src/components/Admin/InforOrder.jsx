import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import axios from "axios";
import { useState, useEffect } from "react";
const InforOrder = () => {
  const [order, setOder] = useState();
  useEffect(() => {
    axios.get(`http://localhost:4000/order`).then((response) => {
      setOder(response.data);
      console.log(response.data);
    });
  }, []);

  return (
    <>
      <Header />
    </>
  );
};

export default InforOrder;
