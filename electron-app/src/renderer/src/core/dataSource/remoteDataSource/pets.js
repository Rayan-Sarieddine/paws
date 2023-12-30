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
  }
};
