import axios from "axios";
import { supabase } from "@/util/supabase";

const API_URL = process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:3000/api";

const instance = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

instance.interceptors.request.use(async (config) => {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

instance.interceptors.response.use(
  (res) => res,
  (err) => {
    const msg =
      err.response?.data?.message ??
      err.response?.data?.error ??
      err.message;
    return Promise.reject(new Error(msg));
  }
);

export const api = {
  get: <T>(path: string) => instance.get<T>(path).then((r) => r.data),
  post: <T>(path: string, body: unknown) =>
    instance.post<T>(path, body).then((r) => r.data),
  patch: <T>(path: string, body: unknown) =>
    instance.patch<T>(path, body).then((r) => r.data),
  delete: <T>(path: string) => instance.delete<T>(path).then((r) => r.data),
};
