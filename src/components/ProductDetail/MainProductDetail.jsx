import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import ProductDetail from "./ProductDetail";
import { useParams } from "react-router-dom";

const MainProductDetail = () => {
  const { slug } = useParams();
  return (
    <div>
      <div>
        <Header />
      </div>

      <div className="header_productDetail">
        <ProductDetail slug={slug} />
      </div>
      <div className="footer_productDetail">
        <Footer />
      </div>
    </div>
  );
};

export default MainProductDetail;
