import axios from "axios";
import envConfig from "@/src/config/envConfig";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { logout } from "@/src/services/Auth";

const axiosInstance = axios.create({
  baseURL: envConfig.baseApi,
});

axiosInstance.interceptors.request.use(
  function (config) {
    const cookieStore = cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error?.response?.data?.message === "jwt expired") {
      console.log("jwt expired");
      const cookiesStore = cookies();

      cookiesStore.delete("accessToken");
      cookiesStore.delete("refreshToken");
      // window.location.href = "/login";
      redirect("/login");
      // logout();
    }

    // return Promise.reject(error);
  }
);

export default axiosInstance;
