import axios from "axios";

export const trafficInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL + "/traffics",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

trafficInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = token;
  }
  return config;
});

trafficInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export const pathInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL + "/paths",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

pathInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = token;
  }
  return config;
});

pathInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const memberInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL + "/members",
  timeout: 2000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

memberInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = token;
  }
  return config;
});

memberInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const profileInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL + "/members/profile",
  timeout: 2000,
  headers: {
    "Content-Type": "multipart/form-data",
  },
  withCredentials: true,
});

profileInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = token;
  }
  return config;
});

profileInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
