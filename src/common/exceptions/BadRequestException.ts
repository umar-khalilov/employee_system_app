import { HttpException } from './HttpException';
import { HttpStatusCodes } from '../utils/HttpStatusCodes';

export class BadRequestException extends HttpException {
    constructor(message = 'Bad request', errors?: string[]) {
        super(message, HttpStatusCodes.BAD_REQUEST, errors);
    }
}
