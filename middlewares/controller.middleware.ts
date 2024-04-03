import { NextFunction, Request, Response } from "express";

// Define a middleware function for delegating control to a router
export const controllerMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    // Delegate control to a router based on the request
    (req as any).router(req, res, next);
};