import { sendRequest } from "../../helpers/request";

export const authDataSource = {
  getCart: async (data) => {
    const response = await sendRequest({
      body: data,
      route: "/user/",
      method: "GET",
    });

    return response;
  },
};
