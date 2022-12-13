import reqAxios from "./request";

const getCityLocation = () => {
  return reqAxios().get(`/cities`);
};
const getDistrictsLocation = (value) => {
  console.log(value);
  return reqAxios().get(`/districts?parentcode=${value}`);
};

const getWardsLocation = (value) => {
  return reqAxios().get(`/wards?parentcode=${value}`);
};
const getCityLocationService = {
  getCityLocation,
  getDistrictsLocation,
  getWardsLocation,
};

export default getCityLocationService;
