import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = __DEV__
  ? "http://10.0.2.2:3000"
  : "https://your-production-url.com";

const api = axios.create({
  baseURL: `${API_URL}/api`,
});

api.interceptors.request.use(async (config) => {
  const tk = await AsyncStorage.getItem("token");
  if (tk) {
    config.headers.Authorization = `Bearer ${tk}`;
  }
  return config;
});

export const auth = {
  login: (email: string, password: string) =>
    api.post("/auth/login", { email, password }),
  register: (name: string, email: string, password: string) =>
    api.post("/auth/register", { name, email, password }),
};

export const issues = {
  getAll: (email?: string) =>
    api.get(`/posts${email ? `?email=${email}` : ""}`),
  create: (data: any) => api.post("/posts", data),
  update: (id: string, data: any) => api.put(`/posts/${id}`, data),
  delete: (id: string) => api.delete(`/posts/${id}`),
};

export const user = {
  updateName: (name: string) => api.put("/user/update-name", { name }),
  updatePassword: (oldPassword: string, newPassword: string) =>
    api.put("/user/update-password", { oldPassword, newPassword }),
};
