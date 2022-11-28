import React from "react";
import { Button } from "antd";
import {
  sortVivo,
  sortIphone,
  sortSamsung,
} from "../../redux/slices/productSlice";
import { useDispatch } from "react-redux";
const SortCategory = () => {
  const dispatch = useDispatch();
  const handleVivo = () => {
    dispatch(sortVivo());
  };
  const handleIphone = () => {
    dispatch(sortIphone());
  };
  const handleSamsung = () => {
    dispatch(sortSamsung());
  };
  return (
    <div className="header_sort">
      <Button className="header_sort_oppo" onClick={handleVivo}>
        VIVO
      </Button>
      <Button className="header_sort_samsung" onClick={handleSamsung}>
        SAMSUNG
      </Button>
      <Button className="header_sort_iphone" onClick={handleIphone}>
        IPHONE
      </Button>
    </div>
  );
};

export default SortCategory;
