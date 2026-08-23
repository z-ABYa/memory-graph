import axios from "axios";

const API = axios.create({

    baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000",

    headers: {

        "Content-Type": "application/json",

    },

    timeout: 30000,

});

API.interceptors.request.use(

    (config) => {

        return config;

    },

    (error) => Promise.reject(error)

);

API.interceptors.response.use(

    (response) => response,

    (error) => {

        if (error.response?.status === 500) {

            console.error("Internal Server Error");

        }

        return Promise.reject(error);

    }

);

export default API;