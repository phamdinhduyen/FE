import { Input } from "antd";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SearchOutlined } from "@ant-design/icons";
import {
  productSearch,
  setNullMessageError,
} from "../../redux/slices/productSlice";
const { Search } = Input;
const SearchProducts = () => {
  const dispatch = useDispatch();
  const messageError = useSelector((state) => state.product.messageError);

  useEffect(() => {
    if (messageError) {
      //

      dispatch(setNullMessageError());
    }
  }, []);

  const onSearch = async (value) => {
    dispatch(productSearch(value));
  };
  return (
    <>
      <div className="search">
        <Search
          placeholder="Tìm kiếm sản phẩm"
          allowClear
          size="large"
          onSearch={onSearch}
        />
      </div>
      <div className="search_mobile">
        <div style={{ width: 200, marginLeft: 13, marginRight: 30 }}>
          <Search
            placeholder="Tìm kiếm sản phẩm"
            size="large"
            onSearch={onSearch}
          />
        </div>
      </div>
    </>
  );
};

export default SearchProducts;
