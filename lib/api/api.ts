import axios from "axios";

const api = axios.create({
  baseURL: "https://api.myquran.com/v2",
});

export default api;