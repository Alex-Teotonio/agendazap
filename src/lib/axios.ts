import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "https://dapb6jt88g.execute-api.us-east-1.amazonaws.com",
});

export default api;
