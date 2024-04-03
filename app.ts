import "dotenv/config";
import cors from "cors";
import express, { Request, Response } from "express";
import { Express } from "express";
import axios from "axios";
import { StatusCodes } from "http-status-codes";

import { initializeApp } from "./utilities/app/initialize.app";

// Create an instance of the Express application
const app: Express = express();

const serviceConfig = {
    user: process.env.USER_SERVICE,
    tasks: process.env.TASKS_SERVICE,
};

const determineServiceURL = (originalURL: string) => {
    if (originalURL.includes("/todos/user")) {
        return {
            baseURL: serviceConfig["user"] as string,
            resourceEndpoint: originalURL.split("/todos/user")[1].split("?")[0],
        };
    } else if (originalURL.includes("/todos/tasks")) {
        return {
            baseURL: serviceConfig["tasks"] as string,
            resourceEndpoint: originalURL.split("/todos/tasks")[1].split("?")[0],
        };
    }

    return { baseURL: "", resourceEndpoint: "" };
};

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Parse JSON requests
app.use(express.json());

// Define a simple endpoint for checking the health of the server
app.get("/heartbeat", async (req: Request, res: Response) => {
    // Respond with a JSON object indicating the status
    return res.status(StatusCodes.OK).json({
        status: "ok",
    });
});

app.use("/", async (req, res) => {
    const originalURL = req.url;
    const method = req.method;

    let { baseURL, resourceEndpoint } = determineServiceURL(originalURL);
    resourceEndpoint = resourceEndpoint.split("?")[0];

    if (!baseURL || !resourceEndpoint) {
        return res.status(404).json({ message: "Resource not found." });
    }

    try {
        const axiosClient = axios.create({ baseURL: baseURL });
        axiosClient.interceptors.response.use(
            (response) => {
                return response;
            },
            (error) => {
                return error.response;
            },
        );

        const response = await axiosClient.request({
            method: method,
            url: resourceEndpoint,
            data: { ...req.body },
            headers: {
                Authorization: req.headers["authorization"],
                "x-api-key": req.headers["x-api-key"],
            },
            params: { ...req.query },
        });

        const statusCode = response.status;
        const receivedResponse = response.data;

        return res.status(statusCode).json({
            ...receivedResponse,
        });
    } catch (error: any) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
});

// Initialize the application
const startServer = async () => {
    await initializeApp(app);
};

// Start the server
startServer();
