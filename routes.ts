import express, { NextFunction, Request, Response } from "express";

import { helloWorldController } from "./controllers/v1/hello.world.controller";

// Create an Express router
const router = express.Router();

// Define a middleware function for loading version-specific routes
export const loadRouterMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    // Extract the API version from the request parameters
    const version = req.params.version;

    // Check the API version and define routes accordingly
    switch (version) {
        case "v1":
            // If the version is "v1", configure routes for version 1
            router.get("/hello-world", helloWorldController);

            // Store the router instance in the request object for later use
            (req as any).router = router;
            break;
        default:
            // If the version is not recognized, set a flag in the request object
            (req as any).versionNotFound = true;
    }

    // Continue to the next middleware in the Express middleware chain
    next();
};
