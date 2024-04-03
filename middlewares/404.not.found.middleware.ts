import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

// Define a middleware function for handling 404 Not Found errors
export const _404NotFoundMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    // Set the HTTP response status code to 404 (Not Found)
    return res.status(StatusCodes.NOT_FOUND).json({
        // Provide a JSON response with status code and message
        status_code: StatusCodes.NOT_FOUND,
        message: "Requested resource is not found",
    });
};
