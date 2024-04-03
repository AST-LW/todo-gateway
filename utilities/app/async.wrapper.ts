import { NextFunction, Request, Response } from "express";

// Define a middleware function for handling asynchronous route handlers
export const asyncWrapper = (handler: Function) => {
    // Return an asynchronous middleware function that wraps the provided route handler
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Execute the provided route handler function asynchronously
            await handler(req, res, next);
        } catch (error) {
            // If an error occurs during the execution of the route handler, pass it to the next middleware (error handler)
            next(error);
        }
    };
};
