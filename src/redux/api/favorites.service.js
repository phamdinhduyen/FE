import reqAxios from "./request";

const postFavorites = (value) => {
  return reqAxios().post("/favorites", value);
};

const getFavorites = (id) => {
  return reqAxios().get(`/favorites?product_id=${id}`);
};

const unlikeFavorites = (id) => {
  return reqAxios().delete(`/favorites/${id}`);
};
const favoritesService = {
  postFavorites,
  getFavorites,
  unlikeFavorites,
};

export default favoritesService;
