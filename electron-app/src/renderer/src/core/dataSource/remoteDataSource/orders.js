import { sendRequest } from "../../helpers/request";

export const orderDataSource = {
  placeOrder: async (data) => {
    const response = await sendRequest({
      body: data,
      method: "POST",
      route: "/orders/"
    });
    return response;
  },
  orderStats: async (data) => {
    const response = await sendRequest({
      body: data,
      method: "GET",
      route: "/orders/"
    });
    return response;
  },
  loadOrders: async (data) => {
    const response = await sendRequest({
      body: data,
      method: "POST",
      route: "/orders/all"
    });
    return response;
  }
};
