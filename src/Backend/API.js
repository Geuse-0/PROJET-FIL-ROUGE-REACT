import axios from "axios"

const API = axios.create ({
baseURL: "http://localhost:3001",


})
API.interceptors.response.use(
  res => res,
  err => {
    console.error("API ERROR", err.response?.status);
    return Promise.reject(err);
  }
);
export default API 