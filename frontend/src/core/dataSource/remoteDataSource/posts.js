import { sendRequest } from "../../helpers/request";

export const postsDataSource = {
  getPosts: async () => {
    const response = await sendRequest({
      route: "/posts/",
      method: "GET",
    });

    return response;
  },
};
