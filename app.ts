// Import necessary modules and libraries
import dotenv from "dotenv";
import cors from "cors";
import express, { Request, Response } from "express";
import { Express } from "express";
import { StatusCodes } from "http-status-codes";

// Import middleware and utility functions
import { rateLimiterMiddleware } from "./middlewares/rate.limiter.middleware";
import { loadRouterMiddleware } from "./routes";
import { versionNotFoundMiddleware } from "./middlewares/version.not.found.middleware";
import { controllerMiddleware } from "./middlewares/controller.middleware";
import { _404NotFoundMiddleware } from "./middlewares/404.not.found.middleware";
import { errorMiddleware } from "./middlewares/error.middleware";
import { initializeApp } from "./utilities/app/initialize.app";

// Load environment variables from a .env file
dotenv.config()

// Create an instance of the Express application
const app: Express = express();

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

// Middleware pipeline for handling different aspects of the API
app.use(
    "/:version", // Specify a version parameter in the route
    rateLimiterMiddleware(), // Apply rate limiting middleware
    loadRouterMiddleware, // Load router based on version
    versionNotFoundMiddleware, // Check if the specified version exists
    controllerMiddleware, // Handle the controller logic
    _404NotFoundMiddleware, // Handle 404 Endpoint Not Found
    errorMiddleware, // Handle errors
);

// Initialize the application
const startServer = async () => {
    await initializeApp(app);
}

// Start the server
startServer();
