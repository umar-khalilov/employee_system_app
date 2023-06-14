import { HttpStatusCodes } from '../enums/HttpStatusCodes';

export class HttpException extends Error {
    public readonly status: number;
    public readonly message: string;
    public readonly errors: string[];

    constructor(
        message = 'Something went wrong. Please try again',
        status = HttpStatusCodes.INTERNAL_SERVER_ERROR,
        errors: string[] = [],
    ) {
        super(message);
        this.name = this.constructor.name;
        this.status = status;
        this.message = message;
        this.errors = errors;
        Error.captureStackTrace(this, this.constructor);
    }
}
