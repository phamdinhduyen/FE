import reqAxios from "./request";

const getProducts = (page = 1) => {
  console.log({ page });
  return reqAxios().get(`/products?_page=${page}&_limit=8`);
};

const getProductDetail = (id) => {
  return reqAxios().get(`/products/${id}`);
};

const search = (data) => {
  return reqAxios().get(`/products?name_like=${data}`);
};

const sortVivo = () => {
  return reqAxios().get(`/products?categoryId=4`);
};
const sortIphone = () => {
  return reqAxios().get(`/products?categoryId=1`);
};

const sortSamsung = () => {
  return reqAxios().get(`/products?categoryId=2`);
};

const searchProducts = (value) => {
  // console.log(value); // [2, 4, 3] => categoryId=2&categoryId=3&categoryId=4
  const valueId = value.map((item) => `categoryId=` + item);
  const strQuery = valueId.join("&");

  return reqAxios().get(`/products?${strQuery}`);
};

const searchPrice = (value) => {
  // http://localhost:4000/products?price_gte=27900000&price_lte=29900000
  const price = [];

  const price_gte = value.map((item) => `price_gte=` + item);
  price.push(price_gte[0]);

  const price_lte = value.map((item) => `price_lte=` + item);
  price.push(price_lte[1]);
  console.log(price);
  const strQuery = price.join("&");

  return reqAxios().get(`/products?${strQuery}`);
};
const productService = {
  getProducts,
  getProductDetail,
  search,
  sortVivo,
  sortIphone,
  sortSamsung,
  searchProducts,
  searchPrice,
};

export default productService;
