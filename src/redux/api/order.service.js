import reqAxios from "./request";

const order = (order) => {
  return reqAxios().post("/orders", order);
};

const trackMyOrder = (data) => {
  return reqAxios().get(`/orders?email=${data}`);
};

const orderDetail = (id) => {
  return reqAxios().get(`/orders?id=${id}`);
};
const orderService = {
  order,
  trackMyOrder,
  orderDetail,
};

export default orderService;
