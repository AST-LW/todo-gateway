import { rateLimit } from "express-rate-limit";
import { StatusCodes } from "http-status-codes";

// Define a middleware function for rate limiting requests
export const rateLimiterMiddleware = () => {
    // Configure rate limiting settings using express-rate-limit middleware
    return rateLimit({
        // Set the time frame for tracking requests (in milliseconds)
        windowMs: parseInt(process.env.REQUESTS_TIME_FRAME as string) * 60 * 1000,
        
        // Set the maximum number of requests allowed within the time frame
        max: parseInt(process.env.MAX_REQUESTS as string),
        
        // Define a JSON response message for exceeding the rate limit
        message: {
            status_code: StatusCodes.TOO_MANY_REQUESTS, // HTTP status code for too many requests
            message: "Too many requests, Please try again later",
            retry_after: `${process.env.REQUESTS_TIME_FRAME} min`,
        },
    });
};
