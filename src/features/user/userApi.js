import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = "http://localhost:8000";

export const fetchLoggedInUser = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/users/own`, {
      withCredentials: true,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    toast.error("failed to fetch user!");
    throw new Error(error?.response?.data?.message || "something went wrong!");
  }
};

export const updateUser = async (userData) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/users/${userData?._id}`,
      userData,
      {
        withCredentials: true,
      }
    );
    toast.success("user updated successfully");
    console.log(response.data);
    return response.data;
  } catch (error) {
    toast.error("failed to update user!");
    throw new Error(error?.response?.data?.message || "something went wrong!");
  }
};

export const fetchLoggedInUserOrders = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/orders/own`, {
      withCredentials: true,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    toast.error("failed to get orders!");
    throw new Error(error?.response?.data?.message || "something went wrong!");
  }
};
