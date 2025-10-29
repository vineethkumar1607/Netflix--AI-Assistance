// src/utils/apiClient.js
import axios from "axios";

// Remove baseURL entirely
const apiClient = () => {
  const instance = axios.create();

  instance.interceptors.response.use(
    (response) => response.data,
    (error) => {
  
      return Promise.reject(error.response?.data || error.message);
    }
  );

  return instance;
};

export default apiClient;
