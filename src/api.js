import axios from "axios";

const API = axios.create({
  baseURL: "https://wellnest-backend-3911.onrender.com",
});

export default API;
