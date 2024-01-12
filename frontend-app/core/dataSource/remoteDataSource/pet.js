import { sendRequest } from "../../helpers/request";

export const petDataSource = {
  getPet: async (userID) => {
    const response = await sendRequest({
      route: `/pets/${userID}`,
      method: "GET",
    });

    return response;
  },
  addPet: async (data) => {
    const response = await sendRequest({
      body: data,
      route: "/pets/",
      method: "POST",
    });

    return response;
  },
};
