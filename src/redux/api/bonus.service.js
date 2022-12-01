import reqAxios from "./request";

const getBonus = (value) => {
  return reqAxios().get(`bonus?code=${value}`);
};

const getAllBonus = () => {
  return reqAxios().get(`bonus`);
};

const bonusService = {
  getBonus,
  getAllBonus,
};

export default bonusService;
