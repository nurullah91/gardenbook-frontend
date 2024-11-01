"use server";

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

import axiosInstance from "@/src/lib/AxiosInstance";
import { revalidateTag } from "next/cache";
import envConfig from "@/src/config/envConfig";

export const signupUser = async (userData: string) => {
  try {
    const { data } = await axiosInstance.post("/auth/signup", userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (data.success) {
      cookies().set("accessToken", data?.data?.accessToken);

      return data;
    }
  } catch (error: any) {
    // Return the error message for notify user
    return {
      success: false,
      message: error?.response?.data?.message,
    };
  }
};

export const loginUser = async (userData: string) => {
  try {
    const { data } = await axiosInstance.post("/auth/login", userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (data.success) {
      cookies().set("accessToken", data?.data?.accessToken);

      return data;
    }
  } catch (error: any) {
    // Return the error message for notify user
    return {
      success: false,
      message: error?.response?.data?.message,
    };
  }
};

export const logout = () => {
  cookies().delete("accessToken");
};

export const getCurrentUser = async () => {
  const accessToken = cookies().get("accessToken")?.value;

  let decodedToken = null;

  if (accessToken) {
    decodedToken = await jwtDecode(accessToken);

    return decodedToken;
  }

  return decodedToken;
};

// export const getNewAccessToken = async () => {
//   try {
//     const refreshToken = cookies().get("refreshToken")?.value;

//     const res = await axiosInstance({
//       url: "/auth/refresh-token",
//       method: "POST",
//       withCredentials: true,
//       headers: {
//         cookie: `refreshToken=${refreshToken}`,
//       },
//     });

//     return res.data;
//   } catch (error) {
//     throw new Error("Failed to get new access token");
//   }
// };
export const changePassword = async (passwordData: string): Promise<any> => {
  try {
    const { data } = await axiosInstance.post(
      "/auth/change-password",
      passwordData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    revalidateTag("user");

    return data;
  } catch (error) {
    throw new Error("Failed to update password");
  }
};

export const forgetPassword = async (userData: string) => {
  try {
    const { data } = await axiosInstance.post(
      "/auth/forget-password",
      userData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (data.success) {
      return data;
    }
  } catch (error: any) {
    // Throw the error with the response from the backend
    if (error.response) {
      throw new Error(JSON.stringify(error.response.data)); // Stringify the response for passing it as a string
    }
    throw new Error(error.message || "Something went wrong");
  }
};

export const resetPassword = async (
  token: string,
  passwordData: string
): Promise<any> => {
  try {
    const fetchOption = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: passwordData,
    };

    const res = await fetch(
      `${envConfig.baseApi}/auth/reset-password`,
      fetchOption
    );

    if (!res.ok) {
      throw new Error("Failed to reset password");
    }

    return res.json();
  } catch (error) {
    throw new Error("Failed to reset password");
  }
};
