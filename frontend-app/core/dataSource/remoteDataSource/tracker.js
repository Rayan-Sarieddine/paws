import { sendRequest } from "../../helpers/request";

export const petDataSource = {
  getTracker: async (trackerID) => {
    const response = await sendRequest({
      body: trackerID,
      route: "/tracker/geo",
      method: "GET",
    });

    return response;
  },
};
