import axios from "axios";
import { local } from "../helpers/localstorage";

axios.defaults.baseURL = "http://192.168.210.16:8000";

export const sendRequest = async ({ route, method = "GET", body }) => {
  const token = await local("token");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  // so that if the  body is an instance of FormData, don't set the Content-Type header
  if (!(body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  const response = await axios({
    method,
    url: route,
    data: body,
    headers,
  });

  return response.data;
};
