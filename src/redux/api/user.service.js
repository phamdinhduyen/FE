import reqAxios from "./request";

const register = (user) => {
  return reqAxios().post("/users", user);
};
const login = (user) => {
  return reqAxios().post("/login", user);
};
const userService = {
  register,
  login,
};

export default userService;
