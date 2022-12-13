import axios from "axios";

export function xml() {
    const axiosInstance = axios.create({
        baseURL: "https://tdsoftware.jobs.personio.de/xml?language=en",
        headers: {"Content-Type": "application/xml"}
    });

    return axiosInstance;
}

export function http() {
    const axiosInstance = axios.create({
        baseURL: "https://api.personio.de/v1/recruiting/applications",
        headers: { "Accept": "application/json", "Content-Type": "application/json", "Authorization": "Bearer 029f0f7593291293cc5c", "X-Company-Id": ""}
    });

    return axiosInstance;
}

