import { sendRequest } from "../../helpers/request";

export const petDataSource = {
  getPet: async (userID) => {
    const response = await sendRequest({
      route: `/pets/${userID}`,
      method: "GET",
    });

    return response;
  },
};
