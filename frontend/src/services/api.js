import axios from "axios";

const API = axios.create({
  baseURL: "https://student-result-backend-jgr7.onrender.com/api",
});

export default API;