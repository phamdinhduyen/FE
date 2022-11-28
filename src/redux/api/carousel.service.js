import reqAxios from "./request";

const getCarousel = () => {
  return reqAxios().get(`/carousel`);
};

const CarouselService = {
  getCarousel,
};

export default CarouselService;
