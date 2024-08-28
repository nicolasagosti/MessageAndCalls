import axios from "axios";

export const SERVER_URL = "http://localhost:3001";

export const axiosInstance = axios.create({
    baseURL: SERVER_URL,
});
