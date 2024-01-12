import { sendRequest } from "../../helpers/request";

export const petDataSource = {
  getPet: async (userID) => {
    const response = await sendRequest({
      body: data,
      route: `/pets/${userID}`,
      method: "GET",
    });

    return response;
  },
};
