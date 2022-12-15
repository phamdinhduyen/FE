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

const searchCityLocation = (cityCode) => {
  console.log(cityCode);
  return reqAxios().get(`/cities?code=${cityCode}`);
};
const searchDistrictsLocation = (DistrictCode) => {
  return reqAxios().get(`/districts?code=${DistrictCode}`);
};
const searchWardsLocation = (WardCode) => {
  return reqAxios().get(`/wards?code=${WardCode}`);
};

const getCityLocationService = {
  getCityLocation,
  getDistrictsLocation,
  getWardsLocation,
  searchCityLocation,
  searchDistrictsLocation,
  searchWardsLocation,
};

export default getCityLocationService;
