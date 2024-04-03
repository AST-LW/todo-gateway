import { StatusCodes } from "http-status-codes";

export class HttpBadRequestError extends Error {
    status_code: number;

    constructor(message: string) {
        super(message);
        this.status_code = StatusCodes.BAD_REQUEST;
    }
}