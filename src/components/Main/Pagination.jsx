import React, { useEffect } from "react";
import { getProducts } from "../../redux/slices/productSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Pagination = () => {
  const dispatch = useDispatch();
  const totalPage = useSelector((state) => state.product.totalPage);

  const url = new URL(document.URL);
  const pageSize = url.searchParams.get("page");

  useEffect(() => {
    dispatch(getProducts(pageSize ? pageSize : 1));
  }, [pageSize]);

  return (
    <>
      {totalPage?.map((item, index) => {
        return (
          <Link
            key={index}
            to={`/home?page=${item}`}
            style={{
              paddingTop: "5px",
              paddingBottom: "5px",
              paddingLeft: "10px",
              marginLeft: "10px",
              paddingRight: "10px",
              background: "#1453c3",
              alignItems: "center",
              color: "white",
            }}
          >
            {item}
          </Link>
        );
      })}
    </>
  );
};

export default Pagination;
