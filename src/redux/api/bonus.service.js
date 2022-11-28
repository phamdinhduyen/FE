import reqAxios from "./request";

const getBonus = (value) => {
  return reqAxios().get(`bonus?code=${value}`);
};

const bonusService = {
  getBonus,
};

export default bonusService;
