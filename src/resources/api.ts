import axios from "axios";
import { UserToken } from "./interfaces";
const BASE_URL =
    process.env.REACT_APP_API_URL ?? "https://balcao-api.vercel.app/";

const axiosInstance = () => {
    const userJSON = localStorage.getItem("userInfo");
    const user: UserToken = userJSON && JSON.parse(userJSON as string);
    return axios.create({
        baseURL: BASE_URL,
        headers: {
            Authorization: `Bearer ${user && user.access_token}`,
        },
    });
};

export { BASE_URL, axiosInstance };
