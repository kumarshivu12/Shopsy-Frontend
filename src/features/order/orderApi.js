import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = "http://localhost:8000";

export const createOrder = async (orderData) => {
  try {
    const response = await axios.post(`${BASE_URL}/orders`, orderData, {
      withCredentials: true,
    });
    toast.success("order placed successfully!");
    console.log(response.data);
    return response.data;
  } catch (error) {
    toast.error("failed to place order");
    throw new Error(error?.response?.data?.message || "something went wrong!");
  }
};

export const updateOrder = async (orderData) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/orders/${orderData?._id}`,
      orderData,
      {
        withCredentials: true,
      }
    );
    toast.success("order updated successfully!");
    console.log(response.data);
    return response.data;
  } catch (error) {
    toast.error("failed to update order");
    throw new Error(error?.response?.data?.message || "something went wrong!");
  }
};

export const fetchAllOrders = async (sort, pagination) => {
  try {
    let queryString = "";
    for (let key in sort) {
      queryString += `${key}=${sort[key]}&`;
    }
    for (let key in pagination) {
      queryString += `${key}=${pagination[key]}`;
    }

    const response = await axios.get(`${BASE_URL}/orders?${queryString}`, {
      withCredentials: true,
    });

    const totalOrders = +response.headers["x-total-count"];
    const orders = response.data.data;
    const data = { orders, totalOrders };

    console.log(data);
    return { data };
  } catch (error) {
    toast.error("failed to fetch orders");
    throw new Error(error?.response?.data?.message || "something went wrong!");
  }
};
