import reqAxios from "./request";

const categories = () => {
  return reqAxios().get("/categories");
};

const categoriesService = {
  categories,
};

export default categoriesService;
