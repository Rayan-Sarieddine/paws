import { sendRequest } from "../../helpers/request";

export const userDataSource = {
  getCart: async () => {
    const response = await sendRequest({
      route: "/user/",
      method: "GET",
    });

    return response;
  },
};
