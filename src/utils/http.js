import axios from "axios";

export function http() {
    const axiosInstance = axios.create({
        baseURL: "https://api.prescreenapp.io/v1",
        headers: {
            "Content-Type": "application/json",
            "apikey": "ymXfs1OGyuBOLj6zoxtuG27U0O6UULd9"
        },
        data: null
    });

    return axiosInstance;
}
