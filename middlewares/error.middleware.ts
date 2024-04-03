import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

// Define a middleware function for handling errors
export const errorMiddleware = async (error: any, req: Request, res: Response, next: NextFunction) => {
    // Extract status code and error message from the error object or use default values
    const status_code = error.status_code || StatusCodes.INTERNAL_SERVER_ERROR;
    const message = error.message || "Internal server error, Please try again later";

    // Set the HTTP response status code and send a JSON response with error details
    return res.status(status_code).json({
        status_code, 
        message,      
    });
};
