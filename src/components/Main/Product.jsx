import React, { useState, useEffect } from "react";

import { Col, Row } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import formatMoney from "../../utils/common";
import { Rate } from "antd";
import { ROUTES } from "../../constants/routers";
import { useDispatch } from "react-redux";
import { getProducts } from "../../redux/slices/productSlice";
import Pagination from "./Pagination";

const Product = () => {
  const navigate = useNavigate();
  const [renderProducts, setRenderProduct] = useState();
  const products = useSelector((state) => state.product.entities);
  console.log(products);

  useEffect(() => {
    setRenderProduct(products);
  }, [products]);

  const handleProductDetail = (item) => {
    const slug = item.slug;
    const id = item.id;
    navigate(`/product-detail/${slug}-${id}`);
  };

  return (
    <>
      <Row gutter={24} className="row_products">
        {renderProducts?.data?.map((product, idx) => (
          <React.Fragment key={idx}>
            {
              <Col className="products" md={7} lg={5} sm={10}>
                <div
                  className="product_item"
                  onClick={() => handleProductDetail(product)}
                  style={{ cursor: "pointer" }}
                >
                  <div>
                    <img
                      className="product_img"
                      src={product.images[0]}
                      alt=""
                    />
                  </div>
                  <div>
                    <div style={{ display: "flex" }}>
                      <span className="product_price">
                        {formatMoney(product?.price)}
                      </span>
                    </div>
                    <br />
                    <h1 className="product_name">{product.name}</h1> <br />
                  </div>
                </div>
              </Col>
            }
          </React.Fragment>
        ))}
      </Row>

      <div style={{ textAlign: "center", marginBottom: 10, marginTop: 10 }}>
        <Pagination />
      </div>
    </>
  );
};

export default Product;
