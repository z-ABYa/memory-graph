import axios from "axios";

const API = axios.create({

    baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000",

    headers: {

        "Content-Type": "application/json",

    },

});

export async function sendMessage(question, userId = "guest") {

    try {

        const { data } = await API.post("/chat", {

            question,

            user_id: userId,

        });

        return data;

    } catch (error) {

        throw (

            error.response?.data ||

            {

                answer: "Unable to connect to backend.",

            }

        );

    }

}

export async function uploadDocument(file) {

    const formData = new FormData();

    formData.append("file", file);

    try {

        const { data } = await API.post(

            "/upload",

            formData,

            {

                headers: {

                    "Content-Type": "multipart/form-data",

                },

            }

        );

        return data;

    } catch (error) {

        throw (

            error.response?.data ||

            {

                detail: "Document upload failed.",

            }

        );

    }

}

export async function scrapeWebsite(url) {

    try {

        const { data } = await API.post("/scrape", {

            url,

        });

        return data;

    } catch (error) {

        throw (

            error.response?.data ||

            {

                detail: "Scraping failed.",

            }

        );

    }

}

export async function checkHealth() {

    try {

        const { data } = await API.get("/health");

        return data;

    } catch {

        return {

            status: "offline",

        };

    }

}

export async function getAnalytics() {

    try {

        const { data } = await API.get("/analytics");

        return {

            documents: data.documents ?? 0,

            chunks: data.chunks ?? 0,

            memory: data.memory ?? 0,

            nodes: data.nodes ?? 0,

            relations: data.relations ?? 0,

        };

    } catch {

        return {

            documents: 0,

            chunks: 0,

            memory: 0,

            nodes: 0,

            relations: 0,

        };

    }

}

export default API;