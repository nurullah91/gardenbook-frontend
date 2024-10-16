"use server";

import axios from "axios";
import envConfig from "@/src/config/envConfig";
import { cookies } from "next/headers";
// import { getNewAccessToken } from "@/src/services/Auth";

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
    return Promise.reject(error);
  }
  // function (response) {
  //   return response;
  // },
  // async function (error) {
  //   const config = error.config;

  //   if (error?.response?.status === 401 && !config?.sent) {
  //     config.sent = true;
  //     const res = await getNewAccessToken();
  //     const accessToken = res.data.accessToken;

  //     config.headers["Authorization"] = accessToken;
  //     cookies().set("accessToken", accessToken);

  //     return axiosInstance(config);
  //   } else {
  //     return Promise.reject(error);
  //   }
  // }
);

export default axiosInstance;
