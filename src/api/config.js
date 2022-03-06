import Axios from "axios";

const config = {
  backendUrl: process.env.API_URL || "http://localhost:3000",
};

const Api = (options) => {
  return Axios({
    ...options,
    baseURL: config.backendUrl,
  });
};
export default Api;
