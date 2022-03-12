import Axios from "axios";

const config = {
  backendUrl: process.env.REACT_APP_API_URL,
};

const Api = (options) => {
  return Axios({
    ...options,
    baseURL: config.backendUrl,
  });
};
export default Api;
