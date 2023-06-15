import { HttpStatusCodes } from '../enums/HttpStatusCodes';
import { HttpException } from './HttpException';

export class TokenNotBeforeException extends HttpException {
    constructor(date: Date) {
        super(`jwt not active: ${date}`, HttpStatusCodes.BAD_REQUEST);
    }
}
