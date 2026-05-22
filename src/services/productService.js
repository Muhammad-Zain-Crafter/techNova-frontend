import API from "../api/axios";

export const getProducts = async () => {
    return await API.get("/products");
};

export const getProduct = async (id) => {
    return await API.get(`/products/${id}`);
};