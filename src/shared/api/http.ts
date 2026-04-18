import axios from "axios";

const BASE_URL =
    process.env.NEXT_PUBLIC_MODE === "production"
        ? "https://pl-fixtures-backend.vercel.app"
        : "http://localhost:4000";

const http = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export default http;