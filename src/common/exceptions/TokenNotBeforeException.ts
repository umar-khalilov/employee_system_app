import { HttpException } from './HttpException';
import { HttpStatusCodes } from '../enums/HttpStatusCodes';

export class TokenNotBeforeException extends HttpException {
    constructor(date: Date) {
        super(`jwt not active: ${date}`, HttpStatusCodes.BAD_REQUEST);
    }
}
