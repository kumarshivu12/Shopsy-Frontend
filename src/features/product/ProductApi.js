import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = "http://localhost:8000";

export const fetchBrands = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/brands`, {
      withCredentials: true,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    toast.error("failed to fetch brands");
    throw new Error(error?.response?.data?.message || "something went wrong!");
  }
};

export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/categories`, {
      withCredentials: true,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    toast.error("failed to fetch categories");
    throw new Error(error?.response?.data?.message || "something went wrong!");
  }
};

export const createProduct = async (productData) => {
  try {
    const response = await axios.post(`${BASE_URL}/products`, productData, {
      withCredentials: true,
    });
    console.log(response.data);
    toast.success("product created successfully");
    return response.data;
  } catch (error) {
    toast.error("failed to create product");
    throw new Error(error?.response?.data?.message || "something went wrong!");
  }
};

export const updateProduct = async (productData) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/products/${productData._id}`,
      productData,
      { withCredentials: true }
    );
    console.log(response.data);
    toast.success("product updated successfully");
    return response.data;
  } catch (error) {
    toast.error("failed to update product");
    throw new Error(error?.response?.data?.message || "something went wrong!");
  }
};

export const fetchProductById = async (_id) => {
  try {
    const response = await axios.get(`${BASE_URL}/products/${_id}`, {
      withCredentials: true,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    toast.error("failed to fetch product");
    throw new Error(error?.response?.data?.message || "something went wrong!");
  }
};

export const fetchProducts = async ({ filter, sort, pagination }) => {
  // filter = {"category":["smartphone","laptops"]}
  // sort = {_sort:"price",_order="desc"}
  // pagination = {_page:1,_limit=10}
  try {
    let queryString = "";
    for (let key in filter) {
      const categoryValues = filter[key];
      if (categoryValues.length) {
        queryString += `${key}=${categoryValues}&`;
      }
    }
    for (let key in sort) {
      queryString += `${key}=${sort[key]}&`;
    }
    for (let key in pagination) {
      queryString += `${key}=${pagination[key]}`;
    }

    const response = await axios.get(`${BASE_URL}/products?${queryString}`, {
      withCredentials: true,
    });

    const totalItems = +response.headers["x-total-count"];
    const products = response.data.data;
    const data = { products, totalItems };

    console.log(data);
    return { data };
  } catch (error) {
    toast.error("failed to fetch products");
    throw new Error(error?.response?.data?.message || "something went wrong!");
  }
};
