import { Request, Response } from "express";
import { asyncWrapper } from "../../utilities/app/async.wrapper";
import { StatusCodes } from "http-status-codes";

export const helloWorldController = asyncWrapper(async (req: Request, res: Response) => {
    return res.status(StatusCodes.OK).json({
        message: "Hello World!!!"
    })
})