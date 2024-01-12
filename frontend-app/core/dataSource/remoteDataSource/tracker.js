import { sendRequest } from "../../helpers/request";

export const trackerDataSource = {
  getTracker: async (trackerID) => {
    const response = await sendRequest({
      body: trackerID,
      route: "/tracker/geo",
      method: "POST",
    });

    return response;
  },
};
