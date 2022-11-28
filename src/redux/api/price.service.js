import reqAxios from "./request";

const optPrice = () => {
  return reqAxios().get("/optprice");
};

const optPriceService = {
  optPrice,
};

export default optPriceService;
