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
  setTrackerPet: async (data) => {
    const response = await sendRequest({
      body: data,
      route: "/tracker/pet",
      method: "POST",
    });

    return response;
  },
};
