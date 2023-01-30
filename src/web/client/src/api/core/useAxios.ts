import { environment } from "@/environment";
import axios, { type AxiosInstance } from "axios";

export function useAxios(basePath: string): AxiosInstance {
  const axiosInstance = axios.create({
    baseURL: `${environment.api.url}/${basePath}`,
  });

  axiosInstance.interceptors.request.use((req) => {
    console.log("req", req);
    return req;
  });

  axiosInstance.interceptors.response.use(
    (res) => {
      console.log("res", res);
      return res;
    },
    (err) => {
      console.log("err", err);
      return Promise.reject(err);
    }
  );

  return axiosInstance;
}
