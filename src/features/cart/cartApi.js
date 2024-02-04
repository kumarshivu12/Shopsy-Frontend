import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = "http://localhost:8000";

export const addToCart = async (cartItem) => {
  try {
    const response = await axios.post(`${BASE_URL}/cart`, cartItem, {
      withCredentials: true,
    });
    toast.success("item added in cart");
    console.log(response.data);
    return response.data;
  } catch (error) {
    toast.error("failed to add product in cart");
    throw new Error(error?.response?.data?.message || "something went wrong!");
  }
};

export const updateCart = async (cartItem) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/cart/${cartItem?._id}`,
      cartItem,
      {
        withCredentials: true,
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    toast.error("failed to update product in cart");
    throw new Error(error?.response?.data?.message || "something went wrong!");
  }
};

export const deleteItemFromCart = async (itemId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/cart/${itemId}`, {
      withCredentials: true,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    toast.error("failed to delete product from cart");
    throw new Error(error?.response?.data?.message || "something went wrong!");
  }
};

export const fetchItemsByUserId = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/cart`, {
      withCredentials: true,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    toast.error("failed to fetch cart");
    throw new Error(error?.response?.data?.message || "something went wrong!");
  }
};

export const resetCart = async () => {
  try {
    const response = await fetchItemsByUserId();
    const cartItems = response.data;
    for (let item of cartItems) {
      await deleteItemFromCart(item._id);
    }

    toast.success("cart reseted successfully");
    console.log("cart reseted successfuly");
    return { status: "success" };
  } catch (error) {
    toast.error("failed to reset cart");
    throw new Error(error?.response?.data?.message || "something went wrong!");
  }
};
