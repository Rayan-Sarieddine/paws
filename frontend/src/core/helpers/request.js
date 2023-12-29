import axios from "axios";
import { local } from "./localstorage";

axios.defaults.baseURL = "http://localhost:8000";

export const sendRequest = async ({ route, method = "GET", body }) => {
  const type = local("type");
  const token = local("token");

  const authorizationHeader = `${type} ${token}`;

  const response = await axios.request({
    url: route,
    method,
    data: body,
    headers: {
      Authorization: authorizationHeader,
      "Content-Type": "application/json",
    },
  });

  return response.data;
};
