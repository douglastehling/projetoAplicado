import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.0.107:3004",
  //baseURL: "http://localhost:3004",
});

export default api;
