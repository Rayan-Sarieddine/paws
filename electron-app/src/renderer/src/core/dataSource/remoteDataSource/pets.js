import { sendRequest } from "../../helpers/request";

export const petsDataSource = {
  getPets: async () => {
    const response = await sendRequest({
      route: "/pets/",
      method: "GET"
    });

    return response;
  },
  petStats: async () => {
    const response = await sendRequest({
      route: "/pets/stats",
      method: "POST"
    });

    return response;
  },
  addPet: async (data) => {
    const response = await sendRequest({
      body: data,
      route: "/pets/",
      method: "POST"
    });

    return response;
  },
  updatePet: async (data) => {
    const response = await sendRequest({
      body: data,
      route: "/pets/",
      method: "PUT"
    });

    return response;
  }
};
