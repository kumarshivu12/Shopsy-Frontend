import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = "http://localhost:8000";

export const checkAuth = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/auth/check`, {
      withCredentials: true,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || "something went wrong!");
  }
};

export const createUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/signup`, userData, {
      withCredentials: true,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    toast.error("failed to signup");
    throw new Error(error?.response?.data?.message || "something went wrong!");
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, userData, {
      withCredentials: true,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    toast.error("failed to login");
    throw new Error(error?.response?.data?.message || "something went wrong!");
  }
};

export const signOut = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/auth/logout`, {
      withCredentials: true,
    });

    console.log(response);
    return { status: "success" };
  } catch (error) {
    toast.error("failed to logout!");
    throw new Error(error?.response?.data?.message || "something went wrong!");
  }
};

// export const resetPasswordRequest = async () => {
//   try {
//     const response = await axios.get(`${BASE_URL}/auth/logout`, {
//       withCredentials: true,
//     });
//     console.log(response.data);
//     return response.data;
//   } catch (error) {
//     toast.error("failed to logout!");
//     throw new Error(error?.response?.data?.message || "something went wrong!");
//   }
// };

// export const resetPassword = async () => {
//   try {
//     const response = await axios.get(`${BASE_URL}/auth/logout`, {
//       withCredentials: true,
//     });
//     console.log(response.data);
//     return response.data;
//   } catch (error) {
//     toast.error("failed to logout!");
//     throw new Error(error?.response?.data?.message || "something went wrong!");
//   }
// };
