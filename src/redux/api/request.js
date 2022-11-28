import axios from "axios";

const instanceAxios = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:4000/",
});

const reqAxios = () => {
  const auth = JSON.parse(localStorage.getItem("AUTHORIZATION") || "{}");
  instanceAxios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
  instanceAxios.defaults.headers.common.Authorization = `Bearer ${auth.token}`;
  return instanceAxios;
};

export default reqAxios;
