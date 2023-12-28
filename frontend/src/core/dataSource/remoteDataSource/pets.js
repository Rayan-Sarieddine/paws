import { sendRequest } from "../../helpers/request";

export const postsDataSource = {
  getPets: async () => {
    const response = await sendRequest({
      route: "/pets/",
      method: "GET",
    });

    return response;
  },
};
