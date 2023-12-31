import { sendRequest } from "../../helpers/request";

export const productDataSource = {
  getProducts: async () => {
    const response = await sendRequest({
      route: "/products/",
      method: "GET"
    });

    return response;
  },
  productStats: async () => {
    const response = await sendRequest({
      route: "/products/stats",
      method: "POST"
    });

    return response;
  },
  addProduct: async (data) => {
    const response = await sendRequest({
      body: data,
      route: "/products/",
      method: "POST"
    });

    return response;
  },
  updateProduct: async (data) => {
    const response = await sendRequest({
      body: data,
      route: "/products/",
      method: "PUT"
    });

    return response;
  }
};
