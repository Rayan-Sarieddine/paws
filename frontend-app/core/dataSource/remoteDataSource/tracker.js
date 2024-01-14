import { sendRequest } from "../../helpers/request";

export const trackerDataSource = {
  getTracker: async (secret) => {
    const response = await sendRequest({
      body: secret,
      route: "/tracker/geo",
      method: "POST",
    });

    return response;
  },
  getTrackerById: async (id) => {
    const response = await sendRequest({
      body: id,
      route: "/tracker/geoId",
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
