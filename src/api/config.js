import axios from "axios";

const BASE_URL = process.env.API_URL;

const API = axios.create({
    baseURL: BASE_URL
})

export default API;
