import React from "react";
import { Checkbox, CheckboxGroup, Radio } from "antd";
import { getCategories } from "../../redux/slices/categoriesSlice";
import { searchProduct, searchPrice } from "../../redux/slices/productSlice";
import { getOtpPrice } from "../../redux/slices/optPriceSlice";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
const Menu = () => {
  const dispatch = useDispatch();

  const [optionsCategory, setOptionsCategory] = useState([]);

  const [optionsOptPrice, setOptionsOptPrice] = useState([]);
  const categories = useSelector((state) => state.categories.entities);
  const optPrice = useSelector((state) => state.otpPrice.entities);

  const onChange = (value) => {
    dispatch(searchProduct(value));
  };
  useEffect(() => {
    dispatch(getCategories());
  }, []);

  useEffect(() => {
    dispatch(getOtpPrice());
  }, []);

  useEffect(() => {
    const optCategories = categories?.data?.map((item) => {
      return { label: item.name, value: item.id };
    });
    setOptionsCategory(optCategories);
  }, [categories]);
  useEffect(() => {
    const optPrices = optPrice?.data?.map((item) => {
      return { label: item.label, value: item.value };
    });
    setOptionsOptPrice(optPrices);
  }, [optPrice]);

  const onChangePrice = (value) => {
    dispatch(searchPrice(value.target.value));
  };
  return (
    <div className="headerSort">
      <div className="headerSortCatergory">
        <h2
          style={{
            textAlign: "center",
            border: "1px solid black",
            marginTop: 5,
          }}
        >
          Thương hiệu
        </h2>
        <Checkbox.Group
          options={optionsCategory}
          onChange={onChange}
          style={{ marginLeft: 20 }}
        />{" "}
        <br />
      </div>
      <div className="headerSortPice">
        <h2
          style={{
            textAlign: "center",
            border: "1px solid black",
            marginTop: 15,
          }}
        >
          Giá bán
        </h2>
        <Radio.Group
          style={{
            marginLeft: 20,
          }}
          options={optionsOptPrice}
          value={optionsOptPrice}
          onChange={onChangePrice}
        />{" "}
        <br />
      </div>
    </div>
  );
};

export default Menu;
