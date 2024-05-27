import axios from "axios";

const API_URI = process.env.NEXT_PUBLIC_NEXT_APP_API_URI;

export const noAuthAxios = axios.create({
  baseURL: API_URI,
  timeout: 3000
})

export const axiosClient = axios.create({
  baseURL: API_URI,
  timeout: 3000,
});


export default axiosClient;
