import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://openrouter.ai/api/v1",
});

apiClient.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `Bearer ${import.meta.env.WXT_OPENROUTER_API_KEY}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
